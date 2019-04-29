import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

import {GoodSku} from '../good-sku.model';
import {GoodSkuService} from '../good-sku.service';

@Component({
    selector: 'good-sku-detail',
    templateUrl: './good-sku-detail.component.html',
})
export class GoodSkuDetailComponent implements OnInit {
    parentData: any;

    goodSku: GoodSku;
    constructor(
        private goodSkuService: GoodSkuService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }
    load(){
        if (this.parentData.id) {
            this.goodSkuService.find(this.parentData.id).subscribe(
                (res: HttpResponse<GoodSku>) => this.goodSku = res.body,
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
