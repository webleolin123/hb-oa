import {Component, OnInit, OnDestroy} from '@angular/core';

import {NzModalRef} from 'ng-zorro-antd';
import {NzCustomAlertService} from '@shared';
import {HttpResponse} from '@angular/common/http';

import {Brand} from '../brand.model';
import {BrandService} from '../brand.service';
@Component({
    selector: 'brand-add',
    templateUrl: './brand-add.component.html'
})
export class BrandAddComponent implements OnInit {
    parentData: any;//parentData.id 没有--创建   如果有--编辑
    brand: Brand;
    constructor(
        private brandService: BrandService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }
    load() {
        if (this.parentData.id) {
            this.brandService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Brand>) => this.brand = res.body,
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.brand = new Brand();
        }
    }
    save() {
        if (this.parentData.id) {
            this.brandService.update(this.brand).subscribe(
                (res: HttpResponse<Brand>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.brandService.create(this.brand).subscribe(
                (res: HttpResponse<Brand>) => this.onSaveSuccess(res),
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
