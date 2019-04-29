import { Component, OnInit,OnDestroy } from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from "@angular/common/http";

import {NzCustomAlertService} from "@shared";
import {ClfRegisterModel} from '../clf-register.model';
import {ClfRegisterService} from '../clf-register.service';
@Component({
  selector: 'clf-edit',
  templateUrl: './clf-edit.component.html',
})
export class ClfEditComponent implements OnInit,OnDestroy  {
   parentData: any;
   problemType: string[] = ['差价问题', '商品错漏发', '商品破损','商品指导使用','其他问题'];
   helpType: string[] = ['商品补发', '退差价', '直接退货','客服协助'];
   actionType: string[] = ['不处理','商品补发', '退差价', '直接退货','客服协助'];
   clfInfos: ClfRegisterModel;
  constructor(
      private clfService: ClfRegisterService,
      private modal: NzModalRef,
      private nzCustomAlertService: NzCustomAlertService,
  ) {
  }
  ngOnInit() {
      this.load();
  }
  ngOnDestroy(){
  }
  load() {
      if (this.parentData.id) {
          this.clfService.find(this.parentData.id).subscribe(
              (res: HttpResponse<ClfRegisterModel>) => {
                  this.clfInfos = res.body;
              },
              (res: HttpResponse<any>) => this.onSaveError(res)
          )
      }
      else {
          this.nzCustomAlertService.error('id不存在');
      }
    }
  save() {
      this.clfService.update(this.clfInfos).subscribe((response) => this.onSaveSuccess(response),
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
