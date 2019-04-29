import { Component, OnInit,OnDestroy } from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from "@angular/common/http";

import {NzCustomAlertService} from "@shared";
import {Appraise} from '../appraise.model';
import {AppraiseService} from '../appraise.service';
@Component({
    selector: 'appraise-edit',
    templateUrl: './appraise-edit.component.html'
})

export class AppraiseEditComponent implements OnInit,OnDestroy {
    parentData: any;
    appraise: Appraise;

    constructor(
        private appraiseService: AppraiseService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}
    ngOnInit() {
        this.load();
    }
    ngOnDestroy(){
    }

    load() {
        if (this.parentData.id) {
            this.appraiseService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Appraise>) => {
                    this.appraise = res.body;
                },
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.nzCustomAlertService.error('id不存在');
        }
    }
    save() {
        this.appraiseService.update(this.appraise).subscribe((response) => this.onSaveSuccess(response),
            (res: HttpResponse<any>) => this.onSaveError(res)
        )
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
