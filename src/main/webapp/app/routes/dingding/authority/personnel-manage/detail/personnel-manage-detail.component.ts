import { Component, OnInit } from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from "@angular/common/http";

import {NzCustomAlertService} from "@shared";
import {Personnel} from "../personnel-manage.model";
import {PersonnelManageService} from "../personnel-manage.service";
@Component({
    selector: 'personnel-detail',
    templateUrl: './personnel-manage-detail.component.html',
})
export class PersonnelManageDetailComponent implements OnInit  {
    parentData: any;
    personnel: Personnel;
    constructor(
        private modal: NzModalRef,
        private personnelService: PersonnelManageService,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}
    ngOnInit(){
        this.load();
    }
    ngOnDestroy(){
    }
    load(){
        if (this.parentData.id) {
            this.personnelService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Personnel>) => {
                    this.personnel = res.body;
                },
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.nzCustomAlertService.error('id不存在');
        }
    }
    save(){
        this.modal.destroy();
    }
    private onSaveError(err) {
        console.log('err',err);
        this.nzCustomAlertService.error('哎呀，出错啦!');
    }
}
