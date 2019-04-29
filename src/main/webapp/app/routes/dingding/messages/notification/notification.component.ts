import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ModalHelper} from "@delon/theme";
import {Principal} from "@core";

import {CommonMethodsService} from "@shared";
import {NzCustomAlertService,} from "@shared";

import {Notification} from "./notification.model";
import {NotificationService} from "./notification.service";
import {NotificationAddComponent} from "./add/notification-add.component";
import {NotificationDetailComponent} from "./detail/notification-detail.component";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',

})
export class NotificationComponent implements OnInit {
    // 批量操作
    checked:number[];//存放已勾选的记录id
    isChosen:boolean;//是否勾选 然后控制是否显示批量编辑按钮
    hasAuthWithAdmin:boolean;//标志是否拥有管理者权限

    isIndeterminate:boolean;//checkbox indeterminate （不确定）状态
    listOfDisplayData: Notification[];//clfInfo备份数据
    isAllDisplayDataChecked = false;//全选checkbox状态
    mapOfCheckedId: { [key: string]: boolean };//保存当前操作的记录id及勾选状态 比如 52(id)：true(checked状态);

    loading:boolean;//控制是否loading
    isSearch:boolean;
    sortArr:string[];//排序条件数组 字段+正/倒叙

    notifications: Notification[];//保存返回结果
    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    totalItems:any;//总页数
    totalElements:any;//总页数
    numberOfElements:number;//当前存在记录数

    constructor(
        private notificationService: NotificationService,
        private commonMethodsService: CommonMethodsService,
        private nzCustomAlertService: NzCustomAlertService,
        private modal: ModalHelper,
        private principal: Principal,
    ) {
        this.notifications=[];
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            if(account){
                this.principal.hasAuthority('ROLE_ADMIN').then((result) => {
                    if (result) {
                        this.hasAuthWithAdmin = result;
                    }
                });
            }
        });
        this.initData(true);
    }
    initData(init: boolean = true){
        if(init){
            this.sortArr=null;
            this.isSearch = false;

            this.checked=[];//初始化存放id数组
            //分页器配置
            this.itemsPerPage = 10;
            this.numberOfElements=0;
            //勾选
            this.isIndeterminate = false;
            this.listOfDisplayData= [];
            this.isAllDisplayDataChecked = false;
            this.mapOfCheckedId= {};
            this.isChosen=false;
            this.checked=[];
        }
        this.page = 1;
        this.loadAll();
    }
    loadAll() {
        this.loading=true;
        if (!this.isSearch) {
            this.sendHttp();
        }
        else {
            this.search(false);
        }
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        this.notificationService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(Notification)[]>) => this.onSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );
    }
    sort(sort: { key: string, value: string }) {
        if (sort.value) {
            this.sortArr = [sort.key + ',' + (sort.value.replace('end', ''))];
        } else {
            this.sortArr = null;
        }
        this.loadAll();
    }
    //查询
    search(init: boolean = true) {
        if(init){
            this.page=1;
        }
        this.isSearch=true;
    }
    //添加
    add() {
        this.modal
            .static(NotificationAddComponent, {parentData: {id: null}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    //编辑
    edit(id) {
        this.modal
            .static(NotificationAddComponent,{parentData:{id:id}},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
        });
    }

    //删除
    delete(notification){
        let html = `id:<span>${notification.id}</span>`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            if(this.numberOfElements==1){
                this.page = 1;
            }
            this.notificationService.delete(notification.id).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }
    //批量删除
    batch_delete(){
        let html = '';
        this.checked.forEach((item)=>{
            for (let i = 0; i < this.notifications.length; i++) {
                if(this.notifications[i].id==item){
                    html += `id:<span>${this.notifications[i].id}</span><br>`;
                }
            }
        });
        this.nzCustomAlertService.confirm('确定批量删除以下记录?', html, () => {
            // this.notificationService.batch_delete(this.checked).subscribe((response) => {
            //     if(response.status==200){
            //         this.nzCustomAlertService.success('删除成功');
            //         this.loadAll();
            //     }
            // });
        });
    }

    //查看详情
    showDetail(id){
        this.modal
            .static(NotificationDetailComponent,{parentData:{id:id}},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
        });
    }

    //单选，全选
    currentPageDataChange($event: Notification[]): void {
        this.listOfDisplayData = $event;
        this.refreshStatus();
    }
    checkAll(value: boolean): void {//全选
        this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
        this.refreshStatus();
    }
    refreshStatus(){//单选
        this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
        if(this.isAllDisplayDataChecked || this.isIndeterminate){//有选择
            this.checked=[];
            for(let key in this.mapOfCheckedId){
                if(this.mapOfCheckedId[key]){
                    this.checked.push(Number(key));
                }
            }
            this.isChosen=true;
        }
        else{//不选择
            this.checked=[];
            this.isChosen=false;
        }
    }

    //请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        this.notifications = data.content;
        this.numberOfElements=data.numberOfElements;
        this.totalItems =data.totalPages * 10;
        this.totalElements = data.totalElements;
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }

}
