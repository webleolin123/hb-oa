import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

import {Notification} from '../notification.model';
import {NotificationService} from '../notification.service';
@Component({
    selector: 'notification-detail',
    templateUrl: './notification-detail.component.html',
})
export class NotificationDetailComponent implements OnInit {
    parentData: any;//parentData.id //机构id 没有--创建   如果有--编辑
    notification: Notification;

    constructor(
        private notificationService: NotificationService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}
    ngOnInit() {
        this.load();
    }
    load(){
        if (this.parentData.id) {
            this.notificationService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Notification>) => this.notification = res.body,
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.nzCustomAlertService.error('id不存在');
        }
    }
    save() {
        this.modal.destroy();
    }
    private onSaveError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀,出错了!');
    }

    close() {
        this.modal.destroy();
    }
}

