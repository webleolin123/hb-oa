import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "@core";
import {JhiEventManager} from "ng-jhipster";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DatePipe} from '@angular/common';

import {
    Department,
    DepartmentUser,
    DepartmentService,
    NzCustomAlertService,
    ATTENDANCE_KEYCODE_RECORD,
    ATTENDANCE_RESULT,
    ATTENDANCE_RESULT_TYPE,
} from "@shared";

import {AttendanceModel} from './attendance.model';
import {AttendanceService} from './attendance.service';
import {STColumn, XlsxService} from '@delon/abc';
import {CacheService} from "@delon/cache";
@Component({
    selector: 'ngx-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.less']
})
export class AttendanceComponent implements OnInit, OnDestroy {
    attendanceSubInfo:Subscription;
    attendanceInfo: AttendanceModel[];//保存返回结果
    @ViewChild('importInput') importInput: ElementRef;
    @ViewChild('importInputDK') importInputDK: ElementRef;
    searchType:string = '考勤月份';
    date:any;
    year_month: string;
    monthFormat:string = 'yyyy-MM';
    loading:boolean;//控制是否loading
    sortArr: string[];//排序条件数组 字段+正/倒叙
    itemsPerPage: any;//每页显示记录数
    totalElements: any;//每页显示记录数
    page: any;//当前页
    totalItems: any;//总页数
    isSearch: boolean;//标志 是否触发搜索
    exportDatas: Department[]; // 导出excell的数据变量
    array: any;  // 数组容器
    data: any; // 对象容器
    exportUserArray: Department[];  // 数组容器
    countx: any = 0;
    county: any = 0;
    countm: any = 0;
    countn: any = 0;
    constructor(
        private attendanceService: AttendanceService,
        public cache: CacheService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private router: Router,
        private departmentService: DepartmentService,
        private nzCustomAlertService: NzCustomAlertService,
        private datePipe: DatePipe,
        private xlsx: XlsxService,
    ) {
        this.array = [];
        this.attendanceInfo=[];
    }
    columns: STColumn[] = [
        {title: '部门ID', index: 'num1'},
        {title: '部门名称', index: 'num2'},
        {title: '成员ID', index: 'num3'},
        {title: '成员姓名', index: 'num4'},
    ];
    ngOnInit() {
        this.registerChangeInUsers();
        this.initData(true);
    }
    initData(init: boolean = true){//重置及pageSizeChange
        if(init){
            this.date=null;
            this.sortArr=null;
            this.itemsPerPage = 10;
            this.isSearch = false;
            this.year_month = '0-0';
        }
        this.page = 1;
        this.loadAll();
    }
    registerChangeInUsers() {
        this.attendanceSubInfo=this.eventManager.subscribe('attendanceListModification', (response) => {
            if(response.content==200){
                this.loadAll();
            }
        });
    }
    ngOnDestroy() {
        this.attendanceSubInfo.unsubscribe();
    }
    loadAll() {
        this.loading=true;
        if (this.isSearch == false) {
            this.sendHttp();
        }
        else {
            this.search(false);
        }
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        this.attendanceService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(AttendanceModel)[]>) => this.onSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );
    }
    sort(sort: { key: string, value: string }){
        if(sort.value){
            this.sortArr = [sort.key + ',' + (sort.value.replace('end',''))];
        }
        else{
            this.sortArr = null;
        }
        this.loadAll();
    }
    monthChange(result: Date): void {
        this.year_month=this.datePipe.transform(result,this.monthFormat);
    }
    search(init: boolean = true) {
        if(!this.year_month){
            this.year_month='0-0';
        }
        if(init){
            this.page=1;
        }
        this.isSearch=true;
        this.attendanceService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            year: this.year_month.split('-')[0],
            month: this.year_month.split('-')[1],
            sort: this.sortArr,
        }).subscribe
        (
            (res: HttpResponse<(AttendanceModel)[]>) => this.onSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );
    }
    private onSuccess(data) {
        this.loading = false;
        this.totalItems = data.totalPages * 10;
        this.attendanceInfo = data.content;
        this.totalElements = data.totalElements;
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }

    importClick(type) {
        if(type==1){
            this.importInput.nativeElement.click();
        }
        if(type==2){
            this.importInputDK.nativeElement.click();
        }
        this.cache.set(ATTENDANCE_RESULT_TYPE,type);
    }

    change(e: Event) {
        const node = e.target as HTMLInputElement;
        this.xlsx.import(node.files[0]).then(res => {
            this.cache.set(ATTENDANCE_RESULT,res);
            this.router.navigate(['/dingding/section/attendance/attendance-table']);
            // this.router.navigate(['/dingding/section/attendance/attendance-table-test']);
        });
        node.value = '';
    }

    showDetail(keyCode) {
        this.router.navigate(['/dingding/section/attendance/attendance-detail']);
        this.cache.set(ATTENDANCE_KEYCODE_RECORD,keyCode);
    }

    download() {//导出
        this.departmentService.query({size: 9999}).subscribe(
            (res: HttpResponse<Department[]>) => this.onQueryExportDataSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );
    }

    onQueryExportDataSuccess(department: Department[]) {
        this.nzCustomAlertService.info('正在导出....');
        this.exportDatas = department;
        this.exportUserArray = [];
        this.countx = 0;
        this.county = 1;
        this.countn = 0;
        this.countm = 0;
        department.forEach((rootDept: Department, index) => {
            if (rootDept.parentid == 1) { // 一级部门
                this.departmentService.queryDepartmentUser({
                    departmentId: rootDept.id,
                    size: 100
                }).subscribe(
                    (res: HttpResponse<DepartmentUser[]>) => {
                        if (res.body.length != 0) { // 一级部门取user不为空
                            const users = res.body;
                            rootDept.users = [];
                            rootDept.users = rootDept.users.concat(users);
                        }
                    },
                    (err: HttpResponse<any>)=>{
                        this.nzCustomAlertService.error('导出异常,请联系系统管理员');
                        console.log('err',err);
                    });
                this.exportUserArray.push(rootDept);
                this.countx = this.countx + 1;
            }
        });
        this.pushChild(this.exportUserArray);
    }

    pushChild(parents: Department[]) {
        parents.forEach((parent, index) => {
            parent.children = [];
            this.exportDatas.forEach((child: Department) => {
                if (child.parentid == parent.id) {
                    this.countm = this.countm + 1;
                    this.departmentService.queryDepartmentUser({
                        departmentId: child.id,
                        size: 100
                    }).subscribe((res: HttpResponse<DepartmentUser[]>) => {
                            if (res.body.length != 0) { // 一级部门取user不为空
                                const users = res.body;
                                child.users = [];
                                child.users = child.users.concat(users);
                            }
                            this.countn = this.countn + 1;
                            if (this.countm == this.countn) {
                                this.exportUsers(this.exportUserArray, null);
                                const data = [this.columns.map(i => i.title)];
                                if (this.array) {
                                    this.array.forEach(i =>
                                        data.push(this.columns.map(c => i[c.index as string])),
                                    );
                                }
                                this.xlsx.export({
                                    sheets: [
                                        {
                                            data: data,
                                            name: 'sheet name',
                                        },
                                    ],
                                    filename: '组织架构信息.xlsx',
                                    callback: () => {
                                        setTimeout(() => {
                                            this.nzCustomAlertService.success('导出成功');
                                        }, 1000);
                                    },
                                });
                                this.array = [];
                            }
                        },
                        (err: HttpResponse<any>)=>{
                            this.nzCustomAlertService.error('导出异常,请联系系统管理员');
                            console.log('err',err);
                        });
                    parent.children.push(child);
                    this.countx = this.countx + 1;
                }
            });
            if (this.countx < this.exportDatas.length && parent.children != null && parent.children.length > 0) {
                this.pushChild(parent.children);
                this.county = this.county + 1;
            }
        });
    }

    exportUsers(exportUserArray, parentName) {
        exportUserArray.forEach((one) => {
            this.buildUser(one, parentName, one.users);
            if (one.children != null && one.children.length > 0) {
                this.exportUsers(one.children, parentName != null ? parentName + '|' + one.name : one.name);
            }
        });

    }

    buildUser(one, parentName, users) {
        if (users != null && users.length > 0) {
            users.forEach((user) => {
                this.data = {
                    num1: one.id + '\t',
                    num2: parentName != null ? parentName + '|' + one.name : one.name,
                    num3: user.userid + '\t',
                    num4: user.name,
                };
                this.array.push(this.data);
            });
        }
    }
}
