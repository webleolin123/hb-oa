import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

import {ActionProcess} from '../../../action-process.model';
import {Gift} from "../gift.model";
import {GiftService} from '../gift.service';
@Component({
    selector: 'preSale-detail',
    templateUrl: './gift-detail.component.html',
})
export class GiftDetailComponent implements OnInit {
    parentData: any;

    gift: Gift;
    actionProcesses: ActionProcess[];
    selectedCopyToList: any; // 抄送人列表
    selectedApproveList: any; // 审批人列表
    user:Array<any>;

    constructor(
        private giftService: GiftService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {
    }
    ngOnInit() {
        this.load();
    }
    load(){
        if (this.parentData.id) {
            this.giftService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Gift>) => this.onSuccess(res.body),
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
    private onSuccess(data) {
        this.gift = data;
        this.selectedCopyToList = [];
        this.selectedApproveList = [];
        if (this.gift.approveInfoDTO.firstApprovers.length != 0) {
            this.user=[];
            this.gift.approveInfoDTO.firstApprovers.forEach((myCopyTo) => {
                if (myCopyTo != null) {
                    this.user = this.selectedCopyToList.filter(user => user.dingId == myCopyTo.dingId);
                    if (  this.user.length == 0) {
                        this.selectedCopyToList.push(myCopyTo);
                    }
                }
            });
        }
        if (this.gift.approveInfoDTO.firstApprovers.length != 0) {
            this.user=[];
            this.gift.approveInfoDTO.firstApprovers.forEach((myApprover) => {
                if (myApprover != null) {
                    this.user = this.selectedApproveList.filter(user => user.dingId == myApprover.dingId);
                    if (  this.user.length == 0 && this.selectedApproveList.length < 3) {
                        this.selectedApproveList.push(myApprover.dingName).toString();
                    }
                }
            });
        }
        if (data.approveInfoDTO.actionProcess.length != 0) {
            this.actionProcesses = data.approveInfoDTO.actionProcess;
        }
    }
    private onSaveError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀,出错了!');
    }

    close() {
        this.modal.destroy();
    }
}
