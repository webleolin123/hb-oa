import {Component, OnInit, OnDestroy,ViewChild,ElementRef} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NzModalRef} from 'ng-zorro-antd';
import {NzCustomAlertService} from "@shared";
import {DatePipe} from "@angular/common";
import {XlsxService} from '@delon/abc';

import {AppraiseService} from '../appraise.service';
import {ShopService} from "../../../base-data/shop/shop.service";
import {Shop} from "../../../base-data/shop/shop.model";
@Component({
  selector: 'appraise-upload-dialog',
  templateUrl: './appraise-upload.component.html',
  styleUrls: ['../appraise.less'],
})
export class AppraiseUploadComponent implements OnInit,OnDestroy {
    @ViewChild('importInput') importInput: ElementRef;
    storeName:string;
    storeNames:string[];
    shops: Shop[];
    constructor(
        private appraiseService: AppraiseService,
        private shopService: ShopService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
        private datePipe: DatePipe,
        private xlsx: XlsxService,
    ) {
        this.shops=[];
    }
    ngOnInit() {
        this.getShops();
    }
    ngOnDestroy(){

    }
    getShops(){
        this.shopService.query({size: 99999}).subscribe(
            (res: HttpResponse<Shop[]>) => {
                this.onGetShopsSuccess(res.body);
            },
            (res: HttpResponse<(any)>) => this.onError(res)
        )
    }
    onGetShopsSuccess(data){
        this.shops = data.content;
        if(this.shops){
            this.storeNames=[];
            this.shops.forEach((item)=>{
                this.storeNames.push(item.shopName);
            })
        }
    }
    importClick() {
        this.importInput.nativeElement.click();
    }
    change(e: Event) {
        const node = e.target as HTMLInputElement;
        console.log('node.files', node.files);
        this.xlsx.import(node.files[0]).then(res => {
            console.log('res',res);
            // this.cache.set(SALARY_RESULT,res);
            // this.router.navigate(['/dingding/section/salary/salary-table']);
        });
        node.value = '';
    }
    ok() {
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀,出错啦！')
    }
}
