import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {GoodDetail} from './good-detail.model';
import {GoodService} from '../good.service';
import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";
@Component({
    selector: 'good-detail',
    templateUrl: './good-detail.component.html',
})
export class GoodDetailComponent implements OnInit {
    parentData: any;//parentData.id //机构id 没有--创建   如果有--编辑
    good: GoodDetail;
    constructor(
        private goodService: GoodService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }
    load(){
        if (this.parentData.id) {
            this.goodService.find(this.parentData.id).subscribe(
                (res: HttpResponse<GoodDetail>) => this.good = res.body,
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
