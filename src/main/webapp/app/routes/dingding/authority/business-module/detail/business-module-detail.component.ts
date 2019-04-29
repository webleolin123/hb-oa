import {Component, OnInit} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {NzModalRef} from 'ng-zorro-antd';
import {NzCustomAlertService} from "@shared";

import {BusinessModule} from '../business-module.model';
import {BusinessModuleService} from '../business-module.service';
import {IMAGE_API_URL} from "../../../../../app.constants";
import {BusinessModuleAddComponent} from "../..";
import {ModalHelper} from "@delon/theme";
// import {BusinessModuleAddComponent} from "../business-module-add.component";
@Component({
    selector: 'business-module-detail',
    templateUrl: './business-module-detail.component.html',
})
export class BusinessModuleDetailComponent implements OnInit {
    parentData: any;
    businessModule: BusinessModule;
    baseImageUrl: any;

    constructor(
        private businessModuleService: BusinessModuleService,
        private nzModalRef: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
        private modal: ModalHelper,
    ) {
    }

    ngOnInit() {
        this.load();
    }
    load(){
        this.baseImageUrl = IMAGE_API_URL;
        if (this.parentData.id) {
            this.businessModuleService.find(this.parentData.id).subscribe(
                (res: HttpResponse<BusinessModule>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.nzCustomAlertService.error('id不存在');
        }
    }

    private onSuccess(data) {
        console.log(data);
        this.businessModule = data;
    }
    edit(){//1代表打开edit
        this.nzModalRef.destroy(1);
        // this.businessModuleService.status=1;
        // this.modal
        //     .static(BusinessModuleAddComponent, {parentData: {id:id}})
        //     .subscribe(() => {//回调函数 重新请求新数据
        //         // this.loadAll();
        // });
    }
    private onSaveError(err) {
        console.log('err',err);
        this.nzCustomAlertService.error('哎呀，出错啦!');
    }
}
