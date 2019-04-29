import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";
import {HttpResponse} from '@angular/common/http';

import {HelpRolesService} from "../help-roles.service";
import {HelpRoles} from "../help-roles.model";
@Component({
    selector: 'help-roles-detail',
    templateUrl: './help-roles-detail.component.html',
})
export class HelpRolesDetailComponent implements OnInit {
    parentData: any;
    helpRole: HelpRoles;

    constructor(
        private helpRolesService: HelpRolesService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }

    load(){
        if (this.parentData.id) {
            this.helpRolesService.find(this.parentData.id).subscribe(
                (res: HttpResponse<HelpRoles>) => this.helpRole = res.body,
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
