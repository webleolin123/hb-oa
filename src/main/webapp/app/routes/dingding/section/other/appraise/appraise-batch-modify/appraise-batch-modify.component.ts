import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from "@angular/common/http";

import {NzCustomAlertService} from "@shared";
import {AppraiseService} from '../appraise.service';
import {ShopService} from "../../../base-data/shop/shop.service";
@Component({
    selector: 'jhi-appraise-batch-modify-dialog',
    templateUrl: './appraise-batch-modify.component.html'
})
export class AppraiseBatchModifyComponent implements OnInit {
    parentData: any;
    kind: any;
    info: string;
    ids: string;
    constructor(
        private appraiseService: AppraiseService,
        private shopService: ShopService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}
    ngOnInit() {
    }
    save() {
        if (this.kind && this.info) {
            this.appraiseService.batchModify(this.parentData.list, this.info, this.kind).subscribe(
                (response) => this.onSaveSuccess(response),
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
    }
    close(){
        this.modal.destroy();
    }
    private onSaveSuccess(response) {
        if(response.status==200){
            this.nzCustomAlertService.success('编辑成功');
            this.modal.destroy();
        }
    }
    private onSaveError(err) {
        console.log('err',err);
        this.nzCustomAlertService.error('哎呀，出错啦!');
    }
}
