import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';

import {Department,DepartmentUser,DepartmentService,NzCustomAlertService} from '@shared';
import {Roles} from '../roles-manage.model';
import {RolesManageService} from '../roles-manage.service';
@Component({
  selector: 'role-add',
  templateUrl: './roles-manage-add-role.component.html',
})
export class RolesManageAddRoleComponent implements OnInit {
    parentData:any;
    role: Roles;
    departmentId:any;
    dingId:any;
    // departments: string[];
    departments: Department[];
    departmentUsers: DepartmentUser[];
    constructor(
        private roleAddService: RolesManageService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
        private departmentService: DepartmentService,
    ) {
        this.departmentId=null;
        this.dingId=null;
        this.departments=[];
        this.departmentUsers=[];
    }
    ngOnInit() {
       this.load();
    }
    load(){
        if(!this.parentData.id){//添加角色
            this.role = new Roles;
        }
        else{//添加人员
            this.loadDepartment();
        }
    }
    loadDepartment() {
        // this.departmentService.queryDepartment({size: 9999}).subscribe(
        //     (res: HttpResponse<string[]>) =>this.departments=res.body,
        //     (res: HttpResponse<(any)>) => this.onSaveError(res)
        // );
        this.departmentService.query({size: 9999}).subscribe(
            (res: HttpResponse<Department[]>) =>this.departments=res.body,
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        );
    }
    loadDepartmentUser(selectedDepartmentId){
        console.log('selectedDepartmentId',selectedDepartmentId);
        if (selectedDepartmentId) {
            // this.departmentService.queryDepartmentUsers({department: selectedDepartment}).subscribe(
            //     (res: HttpResponse<DepartmentUser[]>) => {this.departmentUsers = res.body;},
            //     (res: HttpResponse<(any)>) => this.onSaveError(res)
            // );
            this.departmentService.getDepartmentUser({departmentId: selectedDepartmentId}).subscribe(
                (res: HttpResponse<DepartmentUser[]>) => {this.departmentUsers = res.body;},
                (res: HttpResponse<(any)>) => this.onSaveError(res)
            );
        }
        else{//departmentId==null
            this.dingId=null;
        }
    }
    save() {
        if (this.parentData.id) {
            this.roleAddService.addPersonsAndRoles({
                roleId:Number(this.parentData.id),
                dingId:this.dingId,
            }).subscribe(
                (res: HttpResponse<any>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.roleAddService.addRoles(this.role).subscribe(
                (res: HttpResponse<Roles>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }
    close() {
        this.modal.destroy();
    }

    private onSaveSuccess(res) {
        if (res.ok === true) {
            this.nzCustomAlertService.success( '添加成功');
            this.close();
        }
    }

    private onSaveError(error) {
        console.log('error', error);

    }
}
