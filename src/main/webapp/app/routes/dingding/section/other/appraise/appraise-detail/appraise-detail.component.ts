import {Component, OnInit,OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NzModalRef} from 'ng-zorro-antd';
import {NzCustomAlertService} from "@shared";

import {Appraise} from '../appraise.model';
import {AppraiseService} from '../appraise.service';

@Component({
    selector: 'appraise-detail',
    templateUrl: './appraise-detail.component.html',
})
export class AppraiseDetailComponent implements OnInit,OnDestroy {
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
    load(){
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
    save(){
        this.modal.destroy();
    }
    private onSaveError(err) {
        console.log('err',err);
        this.nzCustomAlertService.error('哎呀，出错啦!');
    }
}
