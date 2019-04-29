import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

import {BaiduSms} from '../baidu-sms.model';
import {BaiduSmsService} from '../baidu-sms.service';

@Component({
    selector: 'sys-message-detail',
    templateUrl: './baidu-sms-detail.component.html',
})
export class BaiduSmsDetailComponent implements OnInit {
    parentData: any;
    baidu: BaiduSms;
    constructor(
        private baiduSmsService: BaiduSmsService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }

    load(){
        if (this.parentData.id) {
            this.baiduSmsService.find(this.parentData.id).subscribe(
                (res: HttpResponse<BaiduSms>) => this.baidu = res.body,
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
