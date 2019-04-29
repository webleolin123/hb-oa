import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {Shop} from '../shop.model';
import {ShopService} from '../shop.service';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

@Component({
    selector: 'shop-detail',
    templateUrl: './shop-detail.component.html',
})
export class ShopDetailComponent implements OnInit {
    parentData: any;//parentData.id //机构id 没有--创建   如果有--编辑
    shop: Shop;
    constructor(
        private shopService: ShopService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }

    load(){
        if (this.parentData.id) {
            this.shopService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Shop>) => this.shop = res.body,
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
