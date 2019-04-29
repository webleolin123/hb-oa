import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {LogService} from '@shared';

import {PersonnelManageService} from '../../personnelManage/personnel-manage.service';
import {PersonnelManageModel} from '../../personnelManage/personnel-manage.model';
import {MechanismManageService} from '../mechanism-manage.service';
import {UserCompanyModel} from '../../user-company.model';

@Component({
    selector: 'jhi-mechanism-manage-own-dialog',
    templateUrl: './own.component.html',
})
export class MechanismManageOwnComponent implements OnInit {
    parentData: any;//parentData.id //机构id
    data: UserCompanyModel;//返回数据
    loginList: any = [];//保存已关联人员的loginList
    hasUserList: any = [];//保存已关联人员的login和nickname
    users:any=[];
    user:any={};//选中的已关联人员
    listOfOption = [];
    chooseUser:any;//ngModelValue
    listOfTagOptions: any;//ngModelValue
    isChecked=false;//是否选择 默认false
    isDelete=false;//是否删除 默认false

    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private personnelManageService: PersonnelManageService,
        private mechanismManageService: MechanismManageService,
        private logService: LogService,
    ) {}

    ngOnInit() {
        this.isOwnUsers();//是否拥有归属人员
        this.loadAllUsers();//加载所有人员
    }
    isOwnUsers() {
        this.mechanismManageService.queryUserByCompany({//获取关联人员信息
            companyId:this.parentData.id,
            size:1000
        }).subscribe(
            (res: HttpResponse<UserCompanyModel[]>) => {
                this.onFindUsersSuccess(res.body)
            },
            (res: Response) => this.onSaveError(res)
        )
    }

    onFindUsersSuccess(data) {
        this.logService.printLog('findUsers_data', data);
        if (data) {
            this.hasUserList=[];
            this.loginList=[];
            data.content.forEach((item,i)=>{
                this.loginList.push(item.byLogin);//用于去重判断
                this.hasUserList.push({byLogin:item.byLogin,nickName: item.nickName,index:i});//用于渲染关联人员列表
            });
            this.data = new UserCompanyModel;
            this.data.companyId=this.parentData.id;
        }
    }
    loadAllUsers() {
        this.personnelManageService.query({
            size: 10000,
        }).subscribe(
            (res: HttpResponse<(PersonnelManageModel)[]>) => this.onLoadAllUsersSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        )
    }
    onLoadAllUsersSuccess(data) {
        this.logService.printLog('所有用户', data);
        if (data) {
            data.forEach((item) => {
                this.listOfOption.push({login: item.login, nickname: item.nickname});//转换为需要的数据格式
            });
        }
    }
    change($event){
        this.logService.printLog('$event',$event);
        this.users=$event;//变化后的人员数组
    }
    choose(user){
        this.isChecked=true;
        this.user=user;//选中人员
    }
    removeUser() {
        const modal = this.modalService.confirm({
            nzTitle: '你确定要删除?',
            nzContent: `用户昵称:<b style="color:red;">${this.user.nickName}</b>`,
            nzOkText: '确定',
            nzOkType: 'danger',
            nzOnOk: () => {
                this.isDelete=true;//确认删除 标志更新为true
                this.mechanismManageService.deleteUser({
                    companyId:Number(this.parentData.id),
                    login: this.user.byLogin,
                }).subscribe(
                    (res: HttpResponse<UserCompanyModel>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res)
                );
            },
            nzCancelText: '取消',
            nzOnCancel: () => {
                this.isDelete=false;//取消确认，删除标志变为false
                modal.destroy()
            },
        });
    }
    save() {//备注 用户填写_manage 大小写 都不允许 后端会报406
        const repeatList=[];
        this.users.forEach((item)=>{//添加栏 新添加的人员数组
            const index=this.loginList.indexOf(item);
            if(index!=-1){//与已关联的人员数组比较 如果找到相同的
                this.hasUserList.forEach((item)=>{//已添加栏
                    if(this.loginList[index]==item.byLogin){
                        repeatList.push(item.nickName);//login转nickName用于显示
                    }
                })
            }
        });
        if(repeatList.length>0){//如果存在重复添加的情况
            console.log('repeatList',repeatList);
            this.msg.info( repeatList.join(',')+'已关联，请去除后再关联');
        }
        else{//正常添加
            this.logService.printLog('过滤前的users', this.users);
            if(this.users.length==0){
                this.msg.info( '您未选中关联人员');
            }
            else{
                if(this.users.length>1){
                    this.users=this.users.join(',');
                }
                else{
                    this.users=this.users[0];
                }
                this.logService.printLog('请求所用users', this.users);
                this.mechanismManageService.batch_join({
                    companyId:Number(this.parentData.id),
                    users: this.users,
                }).subscribe(
                    (res: HttpResponse<UserCompanyModel>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res));
            }
        }
    }

    private onSaveSuccess(res) {
        this.logService.printLog('res', res);
        if (res.ok === true) {
            if(this.isDelete){//移除操作 不清空选框
                this.hasUserList.splice(this.user.index,1);//删除成功 移除已关联人员列表中的对应的元素
                this.msg.success( '移除成功');
    // 成功都要执行
                this.isDelete=false;
                this.isChecked=false;//隐藏移除按钮
                this.isOwnUsers();//重新调用已关联人员接口
            }
            else{//关联操作 清空选框
                this.listOfTagOptions=[];//清空选择关联人员
                this.users=[];//清空选择关联人员
                this.msg.success( '关联成功');
                this.close();
            }
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

