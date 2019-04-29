import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";
import {HttpResponse} from "@angular/common/http";

import {Brand} from "../../brand/brand.model";
import {Shop} from "../../shop/shop.model";
import {BrandService} from "../../brand/brand.service";
import {ShopService} from "../../shop/shop.service";
import {GoodSku} from '../good-sku.model';
import {GoodSkuService} from './../good-sku.service';
@Component({
    selector: 'good-sku-add',
    templateUrl: './good-sku-add.component.html'
})
export class GoodSkuAddComponent implements OnInit {
    parentData: any;//parentData.id 没有--创建   如果有--编辑

    goodSku: GoodSku;
    brand: Brand[];
    shop: Shop[];

    constructor(
        private brandService: BrandService,
        private shopService: ShopService,
        private goodSkuService: GoodSkuService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.getShops();
        this.getBrands();
        this.load();
    }

    load() {
        if (this.parentData.id) {
            this.goodSkuService.find(this.parentData.id).subscribe(
                (res: HttpResponse<GoodSku>) => {
                    this.goodSku = res.body;
                },
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.goodSku = new GoodSku;
        }
    }

    getShops() {
        this.shopService.query({size: 99999}).subscribe(
            (res: HttpResponse<Shop[]>) => {
                this.onGetShopsSuccess(res.body);
            },
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        )
    }

    onGetShopsSuccess(data) {
        if (data) {
            this.shop = data.content;
        }
    }

    getBrands() {
        this.brandService.query({size: 99999}).subscribe(
            (res: HttpResponse<Brand[]>) => {
                this.onGetBrandsSuccess(res.body);
            },
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        )
    }

    onGetBrandsSuccess(data) {
        if (data) {
            this.brand = data.content;
        }
    }

    save() {
        if (this.parentData.id) {
            this.goodSkuService.update(this.goodSku).subscribe(
                (res: HttpResponse<GoodSku>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.goodSkuService.create(this.goodSku).subscribe(
                (res: HttpResponse<GoodSku>) => this.onSaveSuccess(res),
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
        console.log('error', error);

    }
}
