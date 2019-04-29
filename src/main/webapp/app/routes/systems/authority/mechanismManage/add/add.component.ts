import {Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {NzFormatEmitEvent} from 'ng-zorro-antd';

import {Principal} from '@core/auth/principal.service';
import {LogService} from '@shared';

import {MechanismManageService} from '../mechanism-manage.service';

import {MechanismManageModel} from '../mechanism-manage.model';
import {RolesManageModel} from '../../rolesManage/roles-manage.model';


@Component({
    selector: 'mechanism-manage-add',
    templateUrl: './add.component.html',
})
export class MechanismManageAddComponent implements OnInit {
    parentData: any;//parentData.id //机构id 没有--创建   如果有--编辑
    data: MechanismManageModel;//返回数据
    nodeList = [];//节点列表 存放指定属性值的对象数组
    nodes = [];//节点渲染数据
    isExpand:boolean;//是否展开标志
    isSelect=false;//是否选择上级机构
    parentIdList: any=[];//保存父机构id数组
    login: any;//保存当前登录名
    valid=false;

    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private mechanismManageService: MechanismManageService,
        private logService: LogService,
        private principal: Principal,
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.logService.printLog('account', account);
            if (account) {//登录有效
                this.login = account.login;
                this.getTopCompany();//获取顶级机构
                if (this.parentData.id) {//编辑 页面
                    this.mechanismManageService.find(this.parentData.id).subscribe(
                        (res: HttpResponse<MechanismManageModel>) => this.data = res.body,
                        (res: HttpResponse<any>) => this.onSaveError(res)
                    )
                }
                else {//新建页面
                    this.data = new MechanismManageModel;
                }
            }
        });
    }
    getTopCompany() {
        this.mechanismManageService.findTop({ //如果没有父机构id 不传parentIds字段 自己就是顶级
            size: 1000
        }).subscribe(
            (res: HttpResponse<(RolesManageModel)[]>) => this.onGetTopCompanySuccess(res.body),
            (res: Response) => this.onSaveError(res)
        )
    }

    onGetTopCompanySuccess(data) {//获取顶级机构可能是多个 此处用parentIdList
        this.logService.printLog('getTopCompany_data', data);
        if (data) {//有parentId push
            this.nodes=[];
            this.parentIdList=[];
            data.forEach((item)=>{
                this.nodes.push({title: item.name, key: item.id});// 转换为需要的节点数据格式 顶级节点
                this.parentIdList.push(item.id);
            });
            if( this.parentIdList.length==1){
                this.parentIdList=this.parentIdList[0];
            }
            else{
                this.parentIdList=this.parentIdList.join(',');
            }
        }
        else{//没有 parentId
            this.parentIdList=null;
        }
    }

    loadChildrenMechanism(parentId) {//选父机构的子机构 如果有
        this.mechanismManageService.findTop({
            parentIds: parentId,
            size: 1000
        }).subscribe(
            (res: HttpResponse<(RolesManageModel)[]>) => this.loadMechanismSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        )
    }

    loadMechanismSuccess(data) {
        this.logService.printLog('res', data);
        if (data) {
            if( data.length==0){
                this.isExpand = false;
                this.msg.info('没有子机构啦');
            }
            else{
                this.isExpand = true;
                this.nodeList = [];
                data.forEach((item) => {
                    this.nodeList.push({title: item.name, key: item.id});//转换为需要的节点数据格式 添加在nodes顶级节点后
                });
            }
        }
    }
    nzEvent(event: NzFormatEmitEvent): void {//树形结构 触发事件
        if(event.node.key==this.parentData.id){//如果当前点击机构是自己
            if(event.eventName === 'expand'&&event.node.isExpanded){
                this.msg.info('请选择平级或以上机构作为上级机构');
                event.node.isExpanded=false;
            }
            if(event.eventName === 'click'){
                this.msg.info('不能选自己作为上级机构');
            }
        }
        else{//异步加载子节点
            if (event.eventName === 'expand' && event.node.isExpanded) {
                this.loadChildrenMechanism(event.node.key);
                setTimeout(_ => {
                    if (event.node.getChildren().length === 0 && event.node.isExpanded && this.isExpand) {//打开状态，有子机构 追加子机构 并且有结果
                        event.node.addChildren(this.nodeList);
                    }
                    else{
                        event.node.isExpanded=false;
                        event.node.isLoading=false;//关闭loading
                        this.msg.info('没有子机构啦');
                    }
                }, 500);
            }
            if (event.eventName === 'click') {
                this.isSelect=true;
                this.data.parentId=Number(event.node.key);
                this.data.parentName=event.node.title;
                if(this.data.name&&this.data.parentName&&this.data.address&&this.data.telephone&&this.data.administrative){//判断表单是否有效填写 满足条件 显示保存按钮
                    this.valid=true;
                }
                else{
                    this.valid=false;
                }
            }
        }
    }
    valiPhone(phone){
        const reg=/^1(3|4|5|7|8)\d{9}$/;
        if(!reg.test(phone)){//手机号格式
            this.msg.error( '手机号格式不正确，请重新输入');
            this.data.telephone='';
        }
    }
    nameChange(name){
        if(!name){
            this.valid=false;
        }
    }
    parentNameChange(parentName){
        if(!parentName){
            this.valid=false;
        }
    }
    addressChange(address){
        if(!address){
            this.valid=false;
        }
    }
    administrativeChange(administrative){
        if(!administrative){
            this.valid=false;
        }
    }
    telephoneChange(telephone){
        if(!telephone){
            this.valid=false;
        }
    }
    save() {
        if(!this.isSelect){//没选择机构
            this.msg.info(!this.parentData.id?'请选择上级机构':'请点选对应上级机构');
        }
        else{//选择过机构
            if(this.data.name&&this.data.parentName&&this.data.address&&this.data.telephone&&this.data.administrative){//判断表单是否有效填写 满足条件 显示保存按钮
                this.valid=true;
            }
            else{//标志位补充判断 表单填写是否有效
                this.valid=false;
            }
            if (this.parentData.id) {
                this.mechanismManageService.update(this.data).subscribe(
                    (res: HttpResponse<MechanismManageModel>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res));
            }
            else {
                this.mechanismManageService.create(this.data).subscribe(
                    (res: HttpResponse<MechanismManageModel>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res));
            }
        }
    }

    private onSaveSuccess(res) {
        if (res.ok === true) {
            this.msg.success(!this.parentData.id ? '创建成功' : '修改成功');
            setTimeout(()=>{ this.close();},1000);
        }
    }

    private onSaveError(res) {
        this.logService.printLog('err', res);
        this.modalService.error({
            nzTitle: '哎呀,出错了!',
            nzContent: `${res.error.status}:${res.error.message}<br>${res.error.title}`,
        });
    }

    close() {
        this.modal.destroy();
    }
}

