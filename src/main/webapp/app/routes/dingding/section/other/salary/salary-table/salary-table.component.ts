import {Component, OnInit, OnDestroy} from '@angular/core';
import {Principal} from "@core";
import {Router} from "@angular/router";
import {NzCustomAlertService, OPERATOR,SALARY_RESULT,CommonMethodsService} from '@shared';
import {JhiEventManager} from "ng-jhipster";
import {HttpResponse} from "@angular/common/http";
import {SalaryTableService} from "./salary-table.service";
import {SalaryTableInfo} from "./salary-table.model";
import {CacheService} from "@delon/cache";
import {SalaryTableSheetsModel} from "./salary-table-sheets.model";

@Component({
    selector: 'salary-table',
    templateUrl: './salary-table.component.html',
})
export class SalaryTableComponent implements OnInit, OnDestroy {
    loading = true;//控制是否loading
    fileMonth:string;
    salaryExcelDTO:SalaryTableInfo;
    salaryTableSheetsModels:SalaryTableSheetsModel[];

    constructor(
        public cache: CacheService,
        private principal: Principal,
        private router: Router,
        private nzCustomAlertService: NzCustomAlertService,
        private eventManager: JhiEventManager,
        private salaryTableService: SalaryTableService,
        private commonMethodsService: CommonMethodsService,
    ) {
        this.salaryTableSheetsModels=[];
    }

    ngOnInit() {
        this.salaryExcelDTO = new SalaryTableInfo();
        this.salaryExcelDTO.operator = this.cache.getNone(OPERATOR);
        let res = this.cache.getNone(SALARY_RESULT);
        for (let key in res) {
            let salaryTableSheetsModel = new SalaryTableSheetsModel();
            this.loading = false;
            if (res[key].length > 0) {//处理有数据的表
                salaryTableSheetsModel.key = key;
                salaryTableSheetsModel.head = [];
                salaryTableSheetsModel.bodys = [];
                this.fileMonth = String(res[key][1][1]);
                let body = res[key].slice(1);
                let sheet = [];
                salaryTableSheetsModel.nzScroll = {x: '1872px', y: '620px'};
                salaryTableSheetsModel.head=res[key][0];
                salaryTableSheetsModel.nzScroll.x = (258 * res[key][0].length) + 'px';
                let widthConfig=new Array(res[key][0].length+1);
                widthConfig=widthConfig.join('258px,').split(',');
                widthConfig.length=widthConfig.length-1;
                salaryTableSheetsModel.widthConfig=widthConfig;
                body.forEach((item,i) => {
                    let row = [];//用来初始化每个列的单元格
                    for (let x = 0; x < res[key][0].length; x++) {
                        if (item[x] !== null && item[x] !== undefined && item[x] !== '') {
                            row.push(item[x]);
                        }
                        else {
                            row.push(null);
                        }
                    }
                    sheet.push(row);
                });
                salaryTableSheetsModel.bodys=(sheet);
                this.salaryTableSheetsModels.push(salaryTableSheetsModel);
            }
        }
    }

    ngOnDestroy() {
    }

    uploadData() {
        let html = '文件列表:<br>';
        for (let i = 0; i < this.salaryTableSheetsModels.length; i++) {
            html += `&nbsp;&nbsp;&nbsp;<span>${this.salaryTableSheetsModels[i].key}</span><br>`;
        }
        this.salaryExcelDTO.result = this.salaryTableSheetsModels;
        console.log('this.salaryExcelDTO.result',this.salaryExcelDTO.result);
        this.nzCustomAlertService.confirm('确认上传以下文件?', html, () => {
                this.salaryTableService.importCSVOrExcel({month: this.commonMethodsService.myTrim('all',this.fileMonth)}, this.salaryExcelDTO).subscribe(
                    (res: HttpResponse<any>) => this.onSuccess(res.body),
                    (res: HttpResponse<(any)>) => this.onError(res)
                );
        });
    }

    private onSuccess(data) {
        console.log('data_上传成功响应', data);
        if(data.flag){
            this.nzCustomAlertService.success('上传成功');
        }
    }

    private onError(error) {
        console.log('error', error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }
}
