import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

import {ActionProcess} from '../../../action-process.model';
import {Coupon} from "../coupons.model";
import {CouponsService} from '../coupons.service';
@Component({
    selector: 'coupons-detail',
    templateUrl: './coupons-detail.component.html',
})
export class CouponsDetailComponent implements OnInit {
    parentData: any;

    coupon: Coupon;
    actionProcesses: ActionProcess[];
    selectedCopyToList: any; // 抄送人列表
    selectedApproveList: any; // 审批人列表
    user:Array<any>;

    constructor(
        private couponsService: CouponsService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {
    }
    ngOnInit() {
        this.load();
    }
    load(){
        if (this.parentData.id) {
            this.couponsService.findDetail(this.parentData.id).subscribe(
                (res: HttpResponse<Coupon>) => this.onSuccess(res.body),
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
        this.coupon = data;
        this.selectedCopyToList = [];
        this.selectedApproveList = [];
        if (this.coupon.approveInfoDTO.firstApprovers.length != 0) {
            this.user=[];
            this.coupon.approveInfoDTO.firstApprovers.forEach((myCopyTo) => {
                if (myCopyTo != null) {
                    this.user = this.selectedCopyToList.filter(user => user.dingId == myCopyTo.dingId);
                    if (  this.user.length == 0) {
                        this.selectedCopyToList.push(myCopyTo);
                    }
                }
            });
        }
        if (this.coupon.approveInfoDTO.firstApprovers.length != 0) {
            this.user=[];
            this.coupon.approveInfoDTO.firstApprovers.forEach((myApprover) => {
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
