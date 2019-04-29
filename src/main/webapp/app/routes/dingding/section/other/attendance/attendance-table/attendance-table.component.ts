import {Component, OnInit, OnDestroy} from '@angular/core';
import {Principal} from "@core";
import {Router} from "@angular/router";
import {NzCustomAlertService, OPERATOR, ATTENDANCE_RESULT, ATTENDANCE_RESULT_TYPE,CommonMethodsService} from '@shared';
import {JhiEventManager} from "ng-jhipster";
import {ModalHelper} from "@delon/theme";
import {HttpResponse} from "@angular/common/http";
import {AttendanceTableService} from "./attendance-table.service";
import {AttendanceTableInfo} from "./attendance-table.model";
import {CacheService} from "@delon/cache";
import {AttendanceTableSheetsModel} from "./attendance-table-sheets.model";
import {BindComponent} from "../attendance-bind/bind.component";

@Component({
    selector: 'ngx-attendance-table',
    templateUrl: './attendance-table.component.html',
})
export class AttendanceTableComponent implements OnInit, OnDestroy {
    type:number;//考勤表类型 1 考勤表，2 打卡机考勤记录
    loading = true;//控制是否loading
    fileMonth;
    attendanceExcelDTO:AttendanceTableInfo;
    attendanceTableSheetsModels:AttendanceTableSheetsModel[];

    constructor(
        public cache: CacheService,
        private principal: Principal,
        private router: Router,
        private nzCustomAlertService: NzCustomAlertService,
        private eventManager: JhiEventManager,
        private attendanceTableService: AttendanceTableService,
        private modal: ModalHelper,
        private commonMethodsService: CommonMethodsService,
    ) {
        this.attendanceTableSheetsModels=[];
    }

    ngOnInit() {
        this.attendanceExcelDTO = new AttendanceTableInfo();
        this.attendanceExcelDTO.operator = this.cache.getNone(OPERATOR);
        let res = this.cache.getNone(ATTENDANCE_RESULT);
        this.type = this.cache.getNone(ATTENDANCE_RESULT_TYPE);
        for (let key in res) {
            let attendanceTableSheetsModel = new AttendanceTableSheetsModel();
            this.loading = false;
            if (res[key].length > 0) {//处理有数据的表
                attendanceTableSheetsModel.key = key;
                attendanceTableSheetsModel.head = [];
                attendanceTableSheetsModel.bodys = [];
                attendanceTableSheetsModel.nzScroll = {x: '1872px', y: '620px'};
                let sheet = [];
                if(this.type ==1){
                    this.fileMonth = String(res[key][1][1]);
                    let body = res[key].slice(1);
                    attendanceTableSheetsModel.head=res[key][0];
                    attendanceTableSheetsModel.nzScroll.x = (258 * res[key][0].length) + 'px';
                    let widthConfig=new Array(res[key][0].length+1);
                    widthConfig=widthConfig.join('258px,').split(',');
                    widthConfig.length=widthConfig.length-1;
                    attendanceTableSheetsModel.widthConfig=widthConfig;
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
                }
                if(this.type ==2){
                    this.fileMonth =  String(res[key][2][2]);
                    let body = res[key].slice(4);
                    attendanceTableSheetsModel.head=res[key][3];
                    attendanceTableSheetsModel.head.unshift('姓名');
                    attendanceTableSheetsModel.head.unshift('工号');
                    attendanceTableSheetsModel.nzScroll.x = (258 * attendanceTableSheetsModel.head.length) + 'px';
                    let widthConfig=new Array(attendanceTableSheetsModel.head.length+1);
                    widthConfig=widthConfig.join('258px,').split(',');
                    widthConfig.length=widthConfig.length-1;
                    attendanceTableSheetsModel.widthConfig=widthConfig;
                    let row_info=[];//存放工号 姓名
                    let row_record=[];//存放打卡记录
                    body.forEach((item,i) => {
                        let row_dkjl = [];//存放每条 工号 姓名
                        let row_ghxm = [];//存放每条 打卡记录
                        if(i%2==1){
                            for (let x = 0; x < res[key][3].length-2; x++) {
                                if (item[x] !== null && item[x] !== undefined && item[x] !== '') {
                                    row_dkjl.push(item[x]);
                                }
                                else {
                                    row_dkjl.push(null);
                                }
                            }
                            row_record.push(row_dkjl);
                        }
                        else{
                            for (let x = 0; x < item.length; x++) {
                                if (x==2||x==10) {
                                    row_ghxm.push(item[x]);
                                }
                            }
                            row_info.push(row_ghxm);
                        }
                    });
                    row_record.forEach((item,i)=>{
                        let row=row_info[i].concat(row_record[i]);
                        sheet.push(row);
                    });
                }
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
        this.nzCustomAlertService.confirm('确认上传以下文件?', html, () => {
            if(this.type==1){//myTrim 使用正则裁剪字符串前后包括中间 含空部分
                this.attendanceTableService.importCSVOrExcel({month: this.commonMethodsService.myTrim('all',this.fileMonth)}, this.attendanceExcelDTO).subscribe(
                    (res: HttpResponse<any>) => this.onSuccess(res.body),
                    (res: HttpResponse<(any)>) => this.onError(res)
                );
            }
            if(this.type==2){
                this.attendanceTableService.importCSVOrExcel_DK({month: this.commonMethodsService.myTrim('all',this.fileMonth).substr(0,7)}, this.attendanceExcelDTO).subscribe(
                    (res: HttpResponse<any>) => this.onSuccess(res.body),
                    (res: HttpResponse<(any)>) => this.onError(res)
                );
            }
        });
    }

    private onSuccess(data) {
        console.log('data_上传成功响应', data);
        if(data.flag){
            this.nzCustomAlertService.success('上传成功');
        }
        else{
            if(this.type==2){
                this.modal
                    .static(BindComponent, {parentData: data['userList']})
                    .subscribe(() => {//回调函数 重新请求新数据
                        // this.loadAll();
                    });
            }
        }
    }

    private onError(error) {
        console.log('error', error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }
}
