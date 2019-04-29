import {Component, OnInit} from '@angular/core';

import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';

import {DepartmentUser,DepartmentService,NzCustomAlertService} from '@shared';
import {UserListModel} from './userList.model';
import {BindService} from './bind.service';
@Component({
    selector: 'bind-dialog',
    templateUrl: './bind.component.html'
})
export class BindComponent implements OnInit {
    parentData:any;
    departmentData: string[];
    departmentUserData: DepartmentUser[];
    selectedValue:any[];
    userList:any;
    constructor(
        private bindService: BindService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
        private departmentService: DepartmentService,
    ) {
        this.userList=new UserListModel;
        this.selectedValue=[];
        console.log('this.parentData',this.parentData);
    }

    ngOnInit() {
        if(this.parentData){
            this.parentData.forEach((item,i)=>{
                this.selectedValue.push({index:i,departmentName:null,userid:null,isBind:false});
            });
            console.log('this.selectedValue',this.selectedValue);
            this.getAllDepartments();
        }
    }
    bindDingding(user,userid,i){
        console.log('this.selectedValue',this.selectedValue);
        this.userList.dingId=userid;
        this.userList.jobNum=user.jobNum;
        this.userList.name=user.name;
        this.bindService.bind(this.userList).subscribe(
            (res: HttpResponse<UserListModel>) => this.onSaveSuccess(res.body,i),
            (res: HttpResponse<any>) => this.onSaveError(res));
    }

    getAllDepartments(){
        this.departmentService.queryDepartment({size: 9999}).subscribe(
            (res: HttpResponse<string[]>) =>this.departmentData=res.body,
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        );
    }

    loadDepartmentUser(selectedDepartment:number){
        console.log('selectedDepartment',selectedDepartment);
        if (selectedDepartment) {
            this.departmentService.queryDepartmentUsers({department: selectedDepartment}).subscribe(
                (res: HttpResponse<DepartmentUser[]>) => {this.departmentUserData = res.body;},
                (res: HttpResponse<(any)>) => this.onSaveError(res)
            )
        }
    }
    save() {
        // this.modal.destroy();
    }
    close() {
        this.modal.destroy();
    }

    private onSaveSuccess(res,i) {
        console.log('res',res);
        if (Boolean(res)) {
            this.nzCustomAlertService.success('绑定成功');
            this.selectedValue[i].isBind=res;
        }
        else{
            this.nzCustomAlertService.error('绑定失败！绑定信息与当前员工信息不匹配，请确认！');
        }
    }

    private onSaveError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
