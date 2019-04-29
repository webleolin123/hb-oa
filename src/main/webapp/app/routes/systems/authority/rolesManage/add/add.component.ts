import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {RolesManageService} from '../roles-manage.service';
import {LogService} from '@shared';
import {RolesManageModel} from '../roles-manage.model';
@Component({
    selector: 'jhi-roles-manage-add-dialog',
    templateUrl: './add.component.html',
})
export class RolesManageAddComponent implements OnInit {
    parentData: any;//parentData.name 没有--创建   如果有--编辑
    data: RolesManageModel;//返回数据
    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private rolesManageService: RolesManageService,
        private logService: LogService,
    ) {}

    ngOnInit() {
        if (this.parentData.name) {
            this.rolesManageService.find(this.parentData.name).subscribe(
                (res: HttpResponse<RolesManageModel>) => this.data = res.body,
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.data = new RolesManageModel;
        }
    }
    valiName(name){
        const str='ROLE_';
        if(name){
            if(!name.startsWith(str)){//匹配角色标识输入 要求格式 以ROLE_开头
                this.msg.error( '角色标识格式有误，请以ROLE_开头');
                this.data.name='';
        }
        }
    }
    save() {
        if (this.parentData.name) {
            this.rolesManageService.update(this.data).subscribe(
                (res: HttpResponse<RolesManageModel>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
        else {
            this.rolesManageService.createRole(this.data).subscribe(
                (res: HttpResponse<RolesManageModel>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(res) {
        this.logService.printLog('res', res);
        if (res.ok === true) {
            this.msg.success(!this.parentData.name ? '创建成功' : '修改成功');
            this.msg.success(!this.parentData.name ? '创建成功' : '修改成功');
            this.close();
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

