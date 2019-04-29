import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

import {AuthoritySettings} from '../authority-settings.model';
import {AuthoritySettingsService} from '../authority-settings.service';

@Component({
    selector: 'authority-settings-detail',
    templateUrl: './authority-settings-detail.component.html',
})
export class AuthoritySettingsDetailComponent implements OnInit {
    parentData: any;
    authority: AuthoritySettings;
    constructor(
        private authorityService: AuthoritySettingsService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {
    }
    ngOnInit() {
        this.load();
    }
    load(){
        if (this.parentData.authority) {
            this.authorityService.find(this.parentData.authority.id).subscribe(
                (res: HttpResponse<AuthoritySettings>) => this.authority = res.body,
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
