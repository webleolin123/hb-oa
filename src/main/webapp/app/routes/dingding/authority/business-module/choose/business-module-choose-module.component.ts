import {Component, OnInit, OnDestroy} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';

import {BusinessModule} from '../business-module.model';
import {BusinessModuleService} from '../business-module.service';
@Component({
    selector: 'business-module-choose-module',
    templateUrl: './business-module-choose-module.component.html'
})
export class BusinessModuleChooseModuleComponent implements OnInit {
    businessModules: BusinessModule[];
    childModuleIds: any;
    level: any;
    constructor(
        private businessModuleService: BusinessModuleService,
        private modal: NzModalRef,
    ) {
        this.businessModules=[];
    }

    ngOnInit() {
        this.load();
    }
    load(){
        this.level = this.businessModuleService.level;
        this.businessModuleService.getParentOrChildModules({level:this.level}).subscribe(
            (res:HttpResponse<BusinessModule[]>) => {this.businessModules = res.body},
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        )
    }
    save() {
        this.businessModuleService.childModuleIds = this.childModuleIds.toString();
        this.close();
    }
    close() {
        this.modal.destroy();
    }

    private onSaveError(error) {
        console.log('error', error);

    }
}
