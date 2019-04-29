import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NzModalRef} from 'ng-zorro-antd';
import {CacheService} from "@delon/cache";
import {NzCustomAlertService, OPERATOR} from '@shared';
import {Notification} from '../notification.model';
import {NotificationService} from '../notification.service';
@Component({
    selector: 'notification-add',
    templateUrl: './notification-add.component.html',
})
export class NotificationAddComponent implements OnInit {
    parentData: any;//parentData.id 没有--创建   如果有--编辑
    notification: Notification;
    constructor(
        private notificationService: NotificationService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
        private cache: CacheService,
    ) {
    }
    ngOnInit() {
        this.load();
    }
    load() {
        if (this.parentData.id) {
            this.notificationService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Notification>) => this.notification = res.body,
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.notification = new Notification;
        }
    }
    save() {
        if (this.parentData.id) {
            this.notificationService.update(this.notification).subscribe(
                (res: HttpResponse<Notification>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.notification.operator=this.cache.getNone(OPERATOR);
            this.nzCustomAlertService.info('发布中请勿重复点击...');
            this.notificationService.create(this.notification).subscribe(
                (res: HttpResponse<Notification>) => {this.onSaveSuccess(res)},
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }
    close() {
        this.modal.destroy();
    }
    private onSaveSuccess(res) {//添加，编辑成功 并发布
        if (res.ok === true) {
            this.nzCustomAlertService.success(!this.parentData.id ? '添加发布成功' : '编辑发布成功');
            this.close();
        }
        else{
            this.nzCustomAlertService.error('发布失败,请联系系统管理员');
        }
    }
    private onSaveError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }
}
