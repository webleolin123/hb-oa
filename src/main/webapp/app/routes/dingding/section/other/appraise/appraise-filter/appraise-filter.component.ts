import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NzModalRef} from 'ng-zorro-antd';
import {NzCustomAlertService,CommonMethodsService} from "@shared";
import {DatePipe} from "@angular/common";
import { STColumn, XlsxService } from '@delon/abc';

import { Appraise } from '../appraise.model';
import {AppraiseService} from '../appraise.service';
import {ShopService} from "../../../base-data/shop/shop.service";
import {Shop} from "../../../base-data/shop/shop.model";
@Component({
    selector: 'appraise-filter-dialog',
    templateUrl: './appraise-filter.component.html'
})
export class AppraiseFilterComponent implements OnInit {
    storeName:string;
    storeNames:string[];
    shops: Shop[];
    dateFormat:string = 'yyyy-MM-dd';
    dateRange:string[]=[];
    exportDatas:Appraise[];
    startTime: string;
    endTime: string;
    array: any;
    data: any;
    columns: STColumn[] = [
        { title: '淘宝ID', index: 'num1', },
        { title: '订单号', index: 'num2', },
        { title: '商品ID', index: 'num3', },
        { title: '店铺', index: 'num4', },
        { title: '商品', index: 'num5', },
        { title: '评价', index: 'num6', },
        { title: '评价时间', index: 'num7', },
        { title: '商品sku', index: 'num8', },
        { title: '原因', index: 'num9', },
        { title: '原因分析', index: 'num10', },
        { title: '是否联系客服', index: 'num11', },
        { title: '接待客服', index: 'num12', },
        { title: '处理方案', index: 'num13', },
        { title: '标签', index: 'num14', },
    ];
    constructor(
        private appraiseService: AppraiseService,
        private shopService: ShopService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
        private datePipe: DatePipe,
        private xlsx: XlsxService,
        private commonMethodsService: CommonMethodsService,
    ) {
        this.startTime=this.commonMethodsService.getRangeDate(-30);// 初始化条件查询开始时间
        this.dateRange.push(this.startTime);
        this.endTime=this.commonMethodsService.getRangeDate(0);// 初始化条件查询结束时间
        this.dateRange.push(this.endTime);
        this.shops=[];
    }
    ngOnInit() {
        this.getShops();
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
    onChange(result: Date): void {
        this.startTime=this.datePipe.transform(result[0], this.dateFormat);
        this.endTime=this.datePipe.transform(result[1], this.dateFormat);
    }
    private onQueryExportDataSuccess(result) {
        // this.nzCustomAlertService.info('正在导出....');
        const data = [this.columns.map(i => i.title)];
        this.array=[];
        this.exportDatas=result.content;
        this.exportDatas.forEach((value:Appraise)=>{
            this.data = {
                num1: value.customerId,
                num2: value.orderCode,
                num3: value.goodsId,
                num4: value.store,
                num5: value.goodsName,
                num6: value.appraiseContents[0].appraise,
                num7: value.appraiseContents[0].when,
                num8: value.sku,
                num9: value.cause,
                num10:value.analysisOfCauses,
                num11: value.touch,
                num12: value.react,
                num13: value.proposalsForHandling,
                num14: value.appraiseContents[0].appraiseLabels[0].label,
            };
            this.array.push(this.data);
        });
        this.array.forEach(i =>
            data.push(this.columns.map(c => i[c.index as string])),
        );
        this.xlsx.export({
            sheets: [
                {
                    data: data,
                    name: 'sheet name',
                },
            ],
            filename: '负面评价采集信息.xlsx',
            callback: () => {
                setTimeout(() => {
                    this.nzCustomAlertService.success('导出成功');
                    this.modal.destroy();
                }, 300);
            },
        });
    }
    ok() {
        if(!this.endTime||!this.startTime){
            this.nzCustomAlertService.info('请选择导出时间');
        }
        else{
            this.appraiseService.findByTimeBetween({
                startTime: this.startTime,
                endTime: this.endTime,
                storeName: this.storeName,
            })
                .subscribe(
                    (res: HttpResponse<(Appraise)[]>) => {
                        this.onQueryExportDataSuccess(res.body);
                    },
                    (res: HttpResponse<(any)>) => this.onError(res)
                );
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀,出错啦！')
    }
}
