import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";
import {HttpResponse} from "@angular/common/http";

import {Department,DepartmentUser,DepartmentService} from '@shared';
import {Shop} from "../../../../base-data/shop/shop.model";
import {Brand} from "../../../../base-data/brand/brand.model";
import {BrandService} from "../../../../base-data/brand/brand.service";
import {ShopService} from "../../../../base-data/shop/shop.service";
import {Good} from "../../../../base-data/good/good.model";
import {GoodService} from "../../../../base-data/good/good.service";
import {Price} from "../price.model";
import {PriceService} from "../price.service";
@Component({
    selector: 'price-add',
    templateUrl: './price-add.component.html'
})
export class PriceAddComponent implements OnInit {
    parentData: any;//parentData.id 没有--创建   如果有--编辑

    good: Good[];
    brand: Brand[];
    shop: Shop[];
    department: Department[];

    price: Price;

    departmentUsers: DepartmentUser[];
    constructor(
        private priceService: PriceService,
        private departmentService: DepartmentService,
        private shopService: ShopService,
        private brandService: BrandService,
        private goodService: GoodService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {
    }
    ngOnInit() {
        this.getShops();
        this.getBrands();
        this.getAllDepartments();
        this.load();
    }

    load() {
        if (this.parentData.id) {
            this.priceService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Price>) => {
                    this.price = res.body;
                    this.loadGoodByShopIdAndBrandId();
                },
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.price = new Price;
            this.price.approveInfoDTO={};
            this.price.approveInfoDTO.brandId=0;
            this.price.approveInfoDTO.shopId=0;
            this.price.approveInfoDTO.goodId=0;
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
    // 根据店铺和品牌加载商品
    loadGoodByShopIdAndBrandId() {
        if(this.price.approveInfoDTO.brandId&&this.price.approveInfoDTO.shopId){
            this.goodService.queryByShopIdAndBrandId({
                brandId: this.price.approveInfoDTO.brandId,
                shopId: this.price.approveInfoDTO.shopId,
                size: 99999
            }).subscribe(
                (res: HttpResponse<Good[]>) =>this.onLoadGoodsSuccess(res.body),
                (res: HttpResponse<(any)>) => this.onSaveError(res)
            );
        }
    }

    onLoadGoodsSuccess(data){
        if (data) {
            this.good = data.content;
        }
    }

    getAllDepartments(){
        this.departmentService.query({size: 9999}).subscribe(
            (res: HttpResponse<Department[]>) =>this.department=res.body,
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        );
    }

    loadDepartmentUser(){
        if (this.price.approveInfoDTO.firstApprovers[0].departmentId) {
            this.departmentService.queryDepartmentUser({departmentId: this.price.approveInfoDTO.firstApprovers[0].departmentId}).subscribe(
                (res: HttpResponse<DepartmentUser[]>) => {this.departmentUsers = res.body;},
                (res: HttpResponse<(any)>) => this.onSaveError(res)
            )
        }
    }

    save() {
        if (this.parentData.id) {
            this.priceService.update(this.price).subscribe(
                (res: HttpResponse<Price>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.priceService.create(this.price).subscribe(
                (res: HttpResponse<Price>) => this.onSaveSuccess(res),
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
