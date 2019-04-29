import { Component, OnInit,OnDestroy } from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {ClfRegisterModel} from '../clf-register.model';
import {ClfRegisterService} from '../clf-register.service';
import {NzModalRef} from 'ng-zorro-antd';
import {NzCustomAlertService,CommonMethodsService} from "@shared";
import {DatePipe} from "@angular/common";
import { STColumn, XlsxService } from '@delon/abc';
@Component({
  selector: 'clf-export',
  templateUrl: './clf-export.component.html',
})
export class ClfExportComponent implements OnInit,OnDestroy {
    columns: STColumn[] = [
        { title: 'id', index: 'num1', },
        { title: '淘宝ID', index: 'num2', },
        { title: '订单号', index: 'num3', },
        { title: '电话号码', index: 'num4', },
        { title: '问题类型', index: 'num5', },
        { title: '帮助类型', index: 'num6', },
        { title: '问题说明', index: 'num7', },
        { title: '提交时间', index: 'num8', },
        { title: '状态', index: 'num9', },
        { title: '处理方式', index: 'num10', },
        { title: '备注说明', index: 'num11', },
        { title: '客服操作备注', index: 'num12', },
        { title: '图片请求地址', index: 'num13', },
    ];
    dateFormat:string = 'yyyy-MM-dd';
    dateRange:string[]=[];
    exportDatas:ClfRegisterModel[];
    startTime: string;
    endTime: string;
    array: any;
    data: any;
    constructor(
        private clfService: ClfRegisterService,
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
    }
    ngOnInit() {
    }
    ngOnDestroy() {
    }
    onChange(result: Date): void {
        this.startTime=this.datePipe.transform(result[0], this.dateFormat);
        this.endTime=this.datePipe.transform(result[1], this.dateFormat);
    }
    ok() {
        if(!this.endTime||!this.startTime){
            this.nzCustomAlertService.info('请选择导出时间');
        }
        else{
            this.clfService.export({
                startTime: this.startTime,
                endTime: this.endTime,
            })
                .subscribe(
                    (res: HttpResponse<(ClfRegisterModel)[]>) => {
                        this.onQueryExportDataSuccess(res.body);
                    },
                    (res: HttpResponse<(any)>) => this.onError(res)
                );
        }
    }
    cancel() {
        // this.modal.destroy();
    }
    private onQueryExportDataSuccess(clfInfo:ClfRegisterModel[]) {
        // this.nzCustomAlertService.info('正在导出....');
        const data = [this.columns.map(i => i.title)];
        this.array=[];
        this.exportDatas=clfInfo;
        this.exportDatas.forEach((value)=>{
            this.data = {
                num1: value.id,
                num2: value.taoBaoId,
                num3: value.orderId,
                num4: value.telephone,
                num5: this.commonMethodsService.myFilter('problemType', value.problemType),
                num6: this.commonMethodsService.myFilter('helpType', value.helpType),
                num7: value.problemInstruction,
                num8: this.commonMethodsService.myFilter('createdDate', value.createdDate),
                num9: this.commonMethodsService.myFilter('status', value.status),
                num10: this.commonMethodsService.myFilter('actionType', value.actionType),
                num11: value.remarks,
                num12: value.treatment,
                num13: this.commonMethodsService.myFilter('image', value.image),
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
            filename: '售后登记管理信息.xlsx',
            callback: () => {
                setTimeout(() => {
                    this.nzCustomAlertService.success('导出成功');
                    this.modal.destroy();
                }, 300);
            },
        });
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀,出错啦！')
    }
}
