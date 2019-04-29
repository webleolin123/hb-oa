import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {Brand} from '../brand.model';
import {BrandService} from '../brand.service';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

@Component({
    selector: 'brand-detail',
    templateUrl: './brand-detail.component.html',
})
export class BrandDetailComponent implements OnInit {
    parentData: any;//parentData.id //机构id 没有--创建   如果有--编辑
    brand: Brand;
    constructor(
        private brandService: BrandService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }

    load(){
        if (this.parentData.id) {
            this.brandService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Brand>) => this.brand = res.body,
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
