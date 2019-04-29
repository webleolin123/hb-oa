import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';

import {NzCustomAlertService} from '@shared';
import {Roles} from '../../roles-manage/roles-manage.model';
import {RolesManageService} from '../../roles-manage/roles-manage.service';
@Component({
  selector: 'personnel-add-remove-role',
  templateUrl: './personnel-manage-add-remove-role.component.html',
})
export class PersonnelManageAddRemoveRoleComponent implements OnInit {
    parentData:any;
    roles: Roles[];
    departmentId:any;
    roleId:any;
    constructor(
        private roleService: RolesManageService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {
        this.roles=[];
        this.departmentId=null;
        this.roleId=null;
    }
    ngOnInit() {
       this.load();
    }
    load(){
        if(this.parentData.isAdd){//添加角色--获取角色列表
            this.roleService.addRolesQuery({size:9999}).subscribe(
            (res:HttpResponse<Roles[]>) => {this.roles = res.body},
            (res: HttpResponse<(any)>) => this.onSaveError(res)
            )
        }
        else{//移除角色--获取角色列表
            this.roleService.removeRolesQuery({
                userid:this.parentData.dingId,
            }).subscribe((res:HttpResponse<Roles[]>) => {this.roles = res.body},
            (res: HttpResponse<(any)>) => this.onSaveError(res)
            )
        }
    }
    save() {
        if (this.parentData.isAdd) {
            this.roleService.addPersonsAndRoles({
                roleId:this.roleId,
                dingId:this.parentData.dingId,
            }).subscribe(
                (res: HttpResponse<any>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.roleService.removePersonsAndRoles({
                roleId:this.roleId,
                dingId:this.parentData.dingId,
            }).subscribe(
                (res: HttpResponse<Roles>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }
    close() {
        this.modal.destroy();
    }

    private onSaveSuccess(res) {
        if (res.ok === true) {
            this.nzCustomAlertService.success( this.parentData.isAdd?'添加成功':'移除成功');
            this.close();
        }
    }

    private onSaveError(error) {
        console.log('error', error);

    }
}
