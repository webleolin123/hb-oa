import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {NzModalRef} from "ng-zorro-antd";
import {NzCustomAlertService} from "@shared";

import {ActionProcess} from '../../../action-process.model';
import {TaoKe} from "../tao-ke.model";
import {TaoKeService} from '../tao-ke.service';
@Component({
    selector: 'tao-ke-detail',
    templateUrl: './tao-ke-detail.component.html',
})
export class TaoKeDetailComponent implements OnInit {
    parentData: any;

    taoKe: TaoKe;
    actionProcesses: ActionProcess[];
    selectedCopyToList: any; // 抄送人列表
    selectedApproveList: any; // 审批人列表
    companyPrice: any;
    factoryPrice:any;
    user:Array<any>;

    constructor(
        private taoKeService: TaoKeService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {
    }
    ngOnInit() {
        this.load();
    }
    load(){
        if (this.parentData.id) {
            this.taoKeService.find(this.parentData.id).subscribe(
                (res: HttpResponse<TaoKe>) => this.onSuccess(res.body),
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.nzCustomAlertService.error('id不存在');
        }
    }
    countDays(startDate, endDate) {
        const iDays = Math.floor(Math.abs(Date.parse(startDate) - Date.parse(endDate)) / (24 * 3600 * 1000) + 1);
        this.companyPrice = iDays * this.taoKe.perPrice;
        this.factoryPrice = iDays * this.taoKe.perPriceOfSupport;
        return iDays// 相差天数
    }
    countMonth(startDate, endDate) {
        const iMonth = Math.floor(Math.abs(Date.parse(startDate) - Date.parse(endDate)) / (30 * 24 * 3600 * 1000) + 1);
        this.companyPrice = iMonth * this.taoKe.perPrice;
        this.factoryPrice = iMonth * this.taoKe.perPriceOfSupport;
        return iMonth;
    }
    save() {
        this.modal.destroy();
    }
    private onSuccess(data) {
        this.taoKe = data;
        this.selectedCopyToList = [];
        this.selectedApproveList = [];
        if (this.taoKe.approveInfoDTO.firstApprovers.length != 0) {
            this.user=[];
            this.taoKe.approveInfoDTO.firstApprovers.forEach((myCopyTo) => {
                if (myCopyTo != null) {
                    this.user = this.selectedCopyToList.filter(user => user.dingId == myCopyTo.dingId);
                    if (  this.user.length == 0) {
                        this.selectedCopyToList.push(myCopyTo);
                    }
                }
            });
        }
        if (this.taoKe.approveInfoDTO.firstApprovers.length != 0) {
            this.user=[];
            this.taoKe.approveInfoDTO.firstApprovers.forEach((myApprover) => {
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
