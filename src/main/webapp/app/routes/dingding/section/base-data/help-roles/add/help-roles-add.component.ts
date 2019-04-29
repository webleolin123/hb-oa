import {Component, OnInit, OnDestroy} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {NzCustomAlertService} from '@shared';
import {HttpResponse} from '@angular/common/http';

import {HelpRoles} from '../help-roles.model';
import {HelpRolesService} from '../help-roles.service';
import {BusinessModuleService} from "../business-module.service";
declare var tinymce: any;
import {BusinessModule} from "../business-module.model";

import {DatePipe} from '@angular/common';
@Component({
    selector: 'help-roles-add',
    templateUrl: './help-roles-add.component.html',
    styleUrls:['../help-roles.less'],
    providers:[BusinessModuleService],
})
export class HelpRolesAddComponent implements OnInit, OnDestroy {
    parentData: any;//parentData.id 没有--创建   如果有--编辑
    date = null; // new Date();
    dateFormat:string = 'yyyy-MM-dd';
    helpRoles: HelpRoles;
    businessModules: BusinessModule[];
    bModule: BusinessModule;
    constructor(
        private helpRolesService: HelpRolesService,
        private businessModuleService: BusinessModuleService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
        private datePipe: DatePipe,
    ) {}
    ngOnInit() {
        this.getBModule();
        this.load();
    }
    ngOnDestroy(){

    }
    dateChange(result: Date): void {
        console.log('onChange: ', result);
        this.date=this.datePipe.transform(result,this.date);
    }
    load() {
        if (this.parentData.id) {
            this.helpRolesService.find(this.parentData.id).subscribe(
                (res: HttpResponse<HelpRoles>) => this.helpRoles = res.body,
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.helpRoles = new HelpRoles();
        }
    }
    getBModule(){
        this.businessModuleService.getParentOrChildModules({
            level: 2
        }).subscribe(
            (res: HttpResponse<(BusinessModule)[]>) => {
                this.businessModules = res.body;
            }
        );
    }
    save() {
        this.helpRoles.validityPeriod=this.date;
        if (this.parentData.id) {
            this.helpRolesService.update(this.helpRoles).subscribe(
                (res: HttpResponse<HelpRoles>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.helpRolesService.create(this.helpRoles).subscribe(
                (res: HttpResponse<HelpRoles>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }
    close() {
        this.modal.destroy();
    }

    private onSaveSuccess(res) {
        if (res.ok === true) {
            this.nzCustomAlertService.success(!this.parentData.id ? '创建成功' : '修改成功');
            this.close();
        }
    }

    private onSaveError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }
}
