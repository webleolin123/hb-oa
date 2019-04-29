import {Component, OnInit, OnDestroy} from '@angular/core';

import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';

import {Department,DepartmentUser,DepartmentService,NzCustomAlertService} from '@shared';
import {BusinessModuleService} from '../../business-module/business-module.service';
import {BusinessModule} from '../../business-module/business-module.model';
import {AuthoritySettings} from '../authority-settings.model';
import {AuthoritySettingsService} from '../authority-settings.service';
@Component({
    selector: 'authority-settings-add',
    templateUrl: './authority-settings-add.component.html'
})
export class AuthoritySettingsAddComponent implements OnInit{
    loading:boolean;//控制是否loading

    parentData: any;//parentData.id 没有--创建   如果有--编辑
    authority: AuthoritySettings;
    businessModules: BusinessModule[];
    widthConfig=['150px','700px'];

    //添加
    allChecked:boolean;
    indeterminate :boolean;
    checked: any[];
    isSelectedPeople:boolean;// 选择人员
    isShelves: boolean; // 上下架
    isPicture: boolean; // 作图
    isShops: boolean; // 店铺

    departmentId:any;
    dingId:string;
    departments: Department[];
    departmentUsers: DepartmentUser[];
    selectedDepartmentUserList:any[];
    selectedDepartmentUserIdsList:string[];
    constructor(
        private businessModuleService: BusinessModuleService,
        private authorityService: AuthoritySettingsService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
        private departmentService: DepartmentService,
    ) {
        this.businessModules=[];
        //添加
        this.allChecked=false;
        this.indeterminate =true;
        this.checked=[];
        this.isSelectedPeople=false;
        this.isShelves = false;
        this.isPicture = false;
        this.isShops = false;
        this.departmentId=null;
        this.dingId=null;
        this.departments=[];
        this.departmentUsers=[];
        this.selectedDepartmentUserList=[];
        this.selectedDepartmentUserIdsList=[];
    }
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading=true;
        if (this.parentData.authority) {
            this.authorityService.find(this.parentData.authority.id).subscribe(
                (res: HttpResponse<AuthoritySettings>) => {
                    this.authority = res.body;
                    this.loading=false;
                },
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.getModules(1);
            this.loadDepartment();
            this.authority = new AuthoritySettings();
        }
    }
    getModules(level:number){
        this.businessModuleService.getParentOrChildModules({level: level}).subscribe(
            (res: HttpResponse<BusinessModule[]>) => this.onGetModulesSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        );
    }
    onGetModulesSuccess(data:BusinessModule[]){
        if(data){
            this.businessModules = data;
            this.loading=false;
        }
    }
//添加
    addPerson(){
        this.isSelectedPeople=true;
    }
    loadDepartment() {
        this.departmentService.query({size: 9999}).subscribe(
            (res: HttpResponse<Department[]>) =>this.departments=res.body,
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        );
    }
    loadDepartmentUser(selectedDepartmentId){
        console.log('selectedDepartmentId',selectedDepartmentId);
        if (selectedDepartmentId) {
            this.departmentService.getDepartmentUser({departmentId: selectedDepartmentId}).subscribe(
                (res: HttpResponse<DepartmentUser[]>) => {this.departmentUsers = res.body;},
                (res: HttpResponse<(any)>) => this.onSaveError(res)
            );
        }
        else{//departmentId==null
            this.dingId=null;
        }
    }
    updateAllChecked(): void {
        this.indeterminate = false;
        this.checked=[];//取消 清空id数组
        this.businessModules.forEach((module)=>{
            module.childModules= module.childModules.map(item=>{
                return {
                    ...item,
                    isSelected:this.allChecked?true:false
                }
            });
            module.childModules.forEach((childM)=>{
                if(this.allChecked){
                    this.checked.push(childM.id);
                }
            })
        });
    }
    selectChildModule(module) {
        console.log('module.approvePermissionType',module.approvePermissionType);
        if(this.checked.indexOf(module.id) > -1){
            const index = this.checked.indexOf(module.id);
            this.checked.splice(index, 1)
        }else{
            this.checked.push(module.id);
            console.log('changeChecked',this.checked);
        }
        if(this.checked.length>0){
            this.businessModules.forEach((m) => {
                m.childModules.forEach((c) => {
                    if (c.approvePermissionType != module.approvePermissionType) {
                        c.isDisabled = true;
                    }else{
                        c.isDisabled = false;
                    }
                })
            });
            if (module.approvePermissionType == 4) {
                // 作图radio可选
                if(this.isPicture){//点击过不再变 以支持同类型多选
                    return;
                }
                this.isPicture = ! this.isPicture;
                this.isShelves = false;
                this.isShops = false;
            }
            else if (module.approvePermissionType == 3) {
                // 上下架radio可选
                if(this.isShelves){//点击过不再变 以支持同类型多选
                    return;
                }
                this.isShelves = !this.isShelves;
                this.isPicture = false;
                this.isShops = false;
            }
            else if (module.approvePermissionType == 2) {
                // 店铺radio可选
                if(this.isShops){//点击过不再变 以支持同类型多选
                    return;
                }
                this.isShops = !this.isShops;
                this.isPicture = false;
                this.isShelves = false;
            }
            else {
                this.isPicture = false;
                this.isShelves = false;
                this.isShops = false;
                return;
            }
        }
        else{
            this.businessModules.forEach((m) => {
                m.childModules.forEach((c) => {
                    c.isDisabled = false;
                })
            });
            this.allChecked = false;
            this.indeterminate = false;
            //还原
            this.isPicture = false;
            this.isShelves = false;
            this.isShops = false;
            this.authority.approvePermissionValue=null;
            this.authority.permissionType=null;
            this.authority.roleId=null;
            this.authority.brandRange=null;
        }
    }
    selectedDepartmentUser(dingId){
        console.log('dingId',dingId);
        this.departmentUsers.forEach((user,i)=>{
            if(user.userid===dingId){
                this.selectedDepartmentUserList.push(user);
            }
        });
    }
    handleClose(removedUser:{}): void {
        this.selectedDepartmentUserList = this.selectedDepartmentUserList.filter(user => user !== removedUser);
        console.log('selectedDepartmentUserList',this.selectedDepartmentUserList);
        if(this.selectedDepartmentUserList.length==0){
            this.isSelectedPeople=false;
            this.dingId=null;
        }
    }

    sliceTagName(userName: string): string {
        const isLongName = userName.length > 4;
        return isLongName ? `${userName.slice(0,4)}...` : userName;
    }
    save() {
        if (this.parentData.authority) {
            if(this.authority.approvePermissionValue==21||this.authority.permissionType==7){
                this.authority.brandRange=null;
            }
            this.authorityService.update(this.authority).subscribe(
                (res: HttpResponse<AuthoritySettings>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            console.log('saveChecked',this.checked);
            if(this.selectedDepartmentUserList.length>0){
                this.authority.businessModuleIds = this.checked;
                let dingPersonIds=[];
                this.selectedDepartmentUserList.forEach((user)=>{
                    dingPersonIds.push(user.userid);
                });
                this.authority.dingPersonIds=dingPersonIds;
                console.log(this.authority);
                if(this.authority.approvePermissionValue==21||this.authority.permissionType==7){
                    this.authority.brandRange=null;
                }
                this.authorityService.createPermissons(this.authority).subscribe(
                    (res: HttpResponse<AuthoritySettings>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res));
            }
            else{
                this.nzCustomAlertService.info('请添加人员!')
            }
        }
    }
    close() {
        this.modal.destroy();
    }

    private onSaveSuccess(res) {
        if (res.ok === true) {
            this.nzCustomAlertService.success(!this.parentData.id ? '添加成功' : '修改成功');
            this.close();
        }
    }

    private onSaveError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }
}
