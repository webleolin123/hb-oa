import {Component, OnInit} from '@angular/core';
import {Good} from '../../good/good.model';
import {Brand} from "../../brand/brand.model";
import {Shop} from "../../shop/shop.model";
import {BrandService} from "../../brand/brand.service";
import {ShopService} from "../../shop/shop.service";
import {GoodService} from '../good.service';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";
import {HttpResponse} from "@angular/common/http";
@Component({
    selector: 'good-add',
    templateUrl: './good-add.component.html'
})
export class GoodAddComponent implements OnInit {
    parentData: any;//parentData.id 没有--创建   如果有--编辑

    good: Good;
    brand: Brand[];
    shop: Shop[];

    constructor(
        private goodService: GoodService,
        private brandService: BrandService,
        private shopService: ShopService,
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
            this.goodService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Shop>) => {
                    this.good = res.body;
                },
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.good = new Good;
        }
    }
    getShops(){
        this.shopService.query({size: 99999}).subscribe(
            (res: HttpResponse<Shop[]>) => {
                this.onGetShopsSuccess(res.body);
            },
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        )
    }
    onGetShopsSuccess(data){
        if(data){
            this.shop = data.content;
        }
    }
    getBrands(){
        this.brandService.query({size: 99999}).subscribe(
            (res: HttpResponse<Brand[]>) => {
                this.onGetBrandsSuccess(res.body);
            },
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        )
    }
    onGetBrandsSuccess(data){
        if(data){
            this.brand = data.content;
        }
    }

    save() {//备注：good.priceInterval不生效 问后端 说相关后端代码注释了,以此备注20190409
        if (this.parentData.id) {
            this.goodService.update(this.good).subscribe(
                (res: HttpResponse<Good>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.goodService.create(this.good).subscribe(
                (res: HttpResponse<Good>) => this.onSaveSuccess(res),
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
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
