import { Component, OnInit,OnDestroy } from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from "@angular/common/http";

import {NzCustomAlertService} from "@shared";
import {ClfRegisterService} from '../clf-register.service';
@Component({
  selector: 'clf-batch-edit',
  templateUrl: './clf-batchEdit.component.html',
})
export class ClfBatchEditComponent implements OnInit,OnDestroy  {
   parentData: any;
   actionType: string[] = ['不处理','商品补发', '退差价', '直接退货','客服协助'];
   batchEditActionType:number;//批量编辑 要修改字段--帮助类型
   batchEditRemarks:string;//批量编辑 要修改字段--备注说明
   batchEditTreatment:string;//批量编辑 要修改字段--客服操作
  constructor(
      private clfService: ClfRegisterService,
      private modal: NzModalRef,
      private nzCustomAlertService: NzCustomAlertService,
  ) {
  }
  ngOnInit() {
  }
  ngOnDestroy(){
  }
  save() {
    this.clfService.batch_update({
        list:this.parentData.list,
        actionType:this.batchEditActionType,
        remarks:this.batchEditRemarks,
        treatment:this.batchEditTreatment,
    }).subscribe(
        (response) => this.onSaveSuccess(response),
        (res: HttpResponse<any>) => this.onSaveError(res)
    );
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
