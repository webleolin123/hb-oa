import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {Platform} from '../platform.model';
import {PlatformService} from '../platform.service';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

@Component({
    selector: 'platform-detail',
    templateUrl: './platform-detail.component.html',
})
export class PlatformDetailComponent implements OnInit {
    parentData: any;//parentData.id //机构id 没有--创建   如果有--编辑
    platform: Platform;
    constructor(
        private platformService: PlatformService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }

    load(){
        if (this.parentData.id) {
            this.platformService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Platform>) => this.platform = res.body,
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
