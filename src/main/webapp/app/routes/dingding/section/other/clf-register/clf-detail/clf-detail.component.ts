import { Component, OnInit,OnDestroy } from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from "@angular/common/http";

import {NzCustomAlertService} from "@shared";
import { ClfRegisterModel } from '../clf-register.model';
import { ClfRegisterService } from '../clf-register.service';
@Component({
  selector: 'clf-view',
  templateUrl: './clf-detail.component.html',
})
export class ClfDetailComponent implements OnInit,OnDestroy  {
    parentData: any;
    clfInfos: ClfRegisterModel;
    constructor(
        private modal: NzModalRef,
        private clfService: ClfRegisterService,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}
  ngOnInit(){
      this.load();
  }
  ngOnDestroy(){
  }
  load(){
      if (this.parentData.id) {
          this.clfService.find(this.parentData.id).subscribe(
              (res: HttpResponse<ClfRegisterModel>) => {
                  this.clfInfos = res.body;
                  if(this.clfInfos.image){
                      this.clfInfos.imageArr= this.clfInfos.image.split(',');
                      if(this.clfInfos.imageArr>5){
                          this.clfInfos.imageArr.length=5;
                      }
                  }
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
