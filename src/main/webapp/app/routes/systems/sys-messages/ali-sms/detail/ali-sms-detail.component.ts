import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

import {AliSms} from '../ali-sms.model';
import {AliSmsService} from '../ali-sms.service';

@Component({
    selector: 'sys-message-detail',
    templateUrl: './ali-sms-detail.component.html',
})
export class AliSmsDetailComponent implements OnInit {
    parentData: any;
    ali: AliSms;
    constructor(
        private aliSmsService: AliSmsService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }

    load(){
        if (this.parentData.id) {
            this.aliSmsService.find(this.parentData.id).subscribe(
                (res: HttpResponse<AliSms>) => this.ali = res.body,
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
