import {Component, OnInit, OnDestroy} from '@angular/core';
import {Principal} from "@core";
import {Router} from "@angular/router";
import {NzCustomAlertService, OPERATOR,ATTENDANCE_RESULT} from '@shared';
import {JhiEventManager} from "ng-jhipster";
import {HttpResponse} from "@angular/common/http";
import {AttendanceTableService} from "../attendance-table/attendance-table.service";
import {AttendanceTableInfo} from "../attendance-table/attendance-table.model";
import {CacheService} from "@delon/cache";
import {AttendanceTableSheetsModel} from "../attendance-table/attendance-table-sheets.model";

@Component({
    selector: 'attendance-table',
    templateUrl: './attendance-table-test.component.html',
})
export class AttendanceTableTestComponent implements OnInit, OnDestroy {
    loading = true;//控制是否loading
    fileMonth:string;
    attendanceExcelDTO:AttendanceTableInfo;
    attendanceTableSheetsModels:AttendanceTableSheetsModel[];

    constructor(
        public cache: CacheService,
        private principal: Principal,
        private router: Router,
        private nzCustomAlertService: NzCustomAlertService,
        private eventManager: JhiEventManager,
        private attendanceTableService: AttendanceTableService,
    ) {
        this.attendanceTableSheetsModels=[];
    }

    ngOnInit() {
        this.attendanceExcelDTO = new AttendanceTableInfo();
        this.attendanceExcelDTO.operator = this.cache.getNone(OPERATOR);
        let res = this.cache.getNone(ATTENDANCE_RESULT);
        console.log('cache_res-attendanceTest',res);
        for (let key in res) {
            let attendanceTableSheetsModel = new AttendanceTableSheetsModel();
            this.loading = false;
            if (res[key].length > 0) {//处理有数据的表
                attendanceTableSheetsModel.key = key;
                attendanceTableSheetsModel.head = [];
                attendanceTableSheetsModel.bodys = [];
                attendanceTableSheetsModel.nzScroll = {x: '1872px', y: '620px'};
                let sheet = [];
                this.fileMonth =  res[key][2][2];
                let body = res[key].slice(4);
                attendanceTableSheetsModel.head=res[key][3];
                attendanceTableSheetsModel.head.unshift('姓名');
                attendanceTableSheetsModel.head.unshift('工号');
                attendanceTableSheetsModel.nzScroll.x = (258 * attendanceTableSheetsModel.head.length) + 'px';
                let widthConfig=new Array(attendanceTableSheetsModel.head.length+1);
                widthConfig=widthConfig.join('258px,').split(',');
                widthConfig.length=widthConfig.length-1;
                attendanceTableSheetsModel.widthConfig=widthConfig;
                let row3=[];
                let row4=[];
                // let row = [];//用来初始化每个列的单元格
                body.forEach((item,i) => {
                    let row1 = [];
                    let row2 = [];
                    if(i%2==1){
                        for (let x = 0; x < res[key][3].length-2; x++) {
                            if (item[x] !== null && item[x] !== undefined && item[x] !== '') {
                                row2.push(item[x]);
                            }
                            else {
                                row2.push(null);
                            }
                        }
                        row4.push(row2);
                    }
                    else{
                        for (let x = 0; x < item.length; x++) {
                            if (x==2||x==10) {
                                row1.push(item[x]);
                            }
                        }
                        row3.push(row1);
                    }
                });
                row4.forEach((item,i)=>{
                    let row=row3[i].concat(row4[i]);
                    // row.length=row.length-2;
                    sheet.push(row);
                });
                attendanceTableSheetsModel.bodys=(sheet);
                this.attendanceTableSheetsModels.push(attendanceTableSheetsModel);
            }
        }
    }

    ngOnDestroy() {
    }

    uploadData() {
        let html = '文件列表:<br>';
        for (let i = 0; i < this.attendanceTableSheetsModels.length; i++) {
            html += `&nbsp;&nbsp;&nbsp;<span>${this.attendanceTableSheetsModels[i].key}</span><br>`;
        }
        this.attendanceExcelDTO.result = this.attendanceTableSheetsModels;
        console.log('this.attendanceExcelDTO.result',this.attendanceExcelDTO.result);
        console.log('string_this.attendanceExcelDTO',this.attendanceExcelDTO);
        this.nzCustomAlertService.confirm('确认上传以下文件?', html, () => {
                this.attendanceTableService.importCSVOrExcel({month: this.fileMonth.substr(0,7)}, this.attendanceExcelDTO).subscribe(
                    (res: HttpResponse<any>) => this.onSuccess(res),
                    (res: HttpResponse<(any)>) => this.onError(res)
                );
        });
    }

    private onSuccess(data) {
        this.nzCustomAlertService.success('上传成功');
        console.log('data_上传成功响应', data);
    }

    private onError(error) {
        console.log('error', error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }
}
