import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

import {Message} from '../message.model';
import {SysMessageService} from '../message.service';

@Component({
    selector: 'sys-message-detail',
    templateUrl: './message-detail.component.html',
})
export class SysMessageDetailComponent implements OnInit {
    parentData: any;
    message: Message;
    constructor(
        private messageService: SysMessageService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }

    load(){
        if (this.parentData.id) {
            this.messageService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Message>) => this.message = res.body,
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
