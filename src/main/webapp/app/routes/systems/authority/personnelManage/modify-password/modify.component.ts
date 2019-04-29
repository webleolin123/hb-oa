import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {PersonnelManageService} from '../personnel-manage.service';
import {LogService,NzCustomAlertService} from '@shared';
@Component({
    selector: 'jhi-personnel-manage-modify-password-dialog',
    templateUrl: './modify.component.html',
})
export class PersonnelManageModifyComponent implements OnInit {
    parentData: any;//parentData.login是否拥有用户名 没有--创建   如果有--编辑
    newPassword:any;
    constructor(
        private modal: NzModalRef,
        public nzCustomAlertService: NzCustomAlertService,
        public modalService: NzModalService,
        private personnelManageService: PersonnelManageService,
        private logService: LogService,
    ) {}
    ngOnInit() {
    }
    save() {
        this.personnelManageService.modifyPassword({
            login:this.parentData.login,
            newPassword:this.newPassword,
        }).subscribe(
            (res: HttpResponse<any>) => this.onSaveSuccess(res),
            (res: HttpResponse<any>) => this.onSaveError(res));
    }

    private onSaveSuccess(res) {
        this.logService.printLog('res', res);
        if (res.ok === true) {
            this.nzCustomAlertService.success( '修改成功');
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

