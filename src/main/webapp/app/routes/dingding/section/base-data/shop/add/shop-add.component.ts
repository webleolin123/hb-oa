import {Component, OnInit, OnDestroy} from '@angular/core';

import {NzModalRef} from 'ng-zorro-antd';
import {NzCustomAlertService} from '@shared';
import {HttpResponse} from '@angular/common/http';

import {Shop} from '../shop.model';
import {ShopService} from '../shop.service';
import {PlatformService} from '../../platform/platform.service';
import {Platform} from '../../platform/platform.model';
@Component({
    selector: 'shop-add',
    templateUrl: './shop-add.component.html'
})
export class ShopAddComponent implements OnInit {
    parentData: any;//parentData.id 没有--创建   如果有--编辑
    platform:Platform[];
    shop: Shop;

    constructor(
        private shopService: ShopService,
        private platformService: PlatformService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.getPlatform();
        this.load();
    }
    load() {
        if (this.parentData.id) {
            this.shopService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Shop>) => {
                    this.shop = res.body;
                },
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.shop = new Shop;
        }
    }
    getPlatform(){
        this.platformService.query({size: 99999}).subscribe(
            (res: HttpResponse<Platform[]>) => {
                this.onGetPlatformSuccess(res.body);
            },
            (res: HttpResponse<(any)>) => this.onSaveError(res)
        )
    }
    onGetPlatformSuccess(data){
        if(data){
            this.platform = data.content;
        }
    }

    save() {
        if (this.parentData.id) {
            this.shopService.update(this.shop).subscribe(
                (res: HttpResponse<Shop>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.shopService.create(this.shop).subscribe(
                (res: HttpResponse<Shop>) => this.onSaveSuccess(res),
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
