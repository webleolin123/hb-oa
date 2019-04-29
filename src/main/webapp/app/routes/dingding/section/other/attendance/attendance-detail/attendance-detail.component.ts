import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "@core";
import {JhiEventManager} from "ng-jhipster";
import {Router} from "@angular/router";
import {AttendanceModel} from '../attendance.model';
import {AttendanceDetailService} from './attendance-detail.service';
import {NzCustomAlertService,ATTENDANCE_KEYCODE_RECORD} from "@shared";
import {CacheService} from "@delon/cache";

@Component({
    selector: 'ngx-salary-detail',
    templateUrl: './attendance-detail.component.html',
})
export class AttendanceDetailComponent implements OnInit, OnDestroy {
    importStatus=['全部','失败','成功'];
    noticeStatus=['全部','失败','成功'];
    searchContent: string;//搜索内容;当前保存姓名搜索值
    isSearch: boolean;//标志 是否触发搜索
    statusValue: number;//要查询的导入状态值
    sendMessageStatusValue: number;//要查询的通知状态值
    attendanceInfo: AttendanceModel[];//保存返回结果
    itemsPerPage: any;//每页显示记录数
    totalElements: any;//每页显示记录数
    page: any;//当前页
    totalItems: any;//总页数
    loading :boolean;//控制是否loading
    sortArr: string[];//排序条件数组 字段+正/倒叙
    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        private router: Router,
        private attendanceDetailService: AttendanceDetailService,
        private nzCustomAlertService: NzCustomAlertService,
        public cache: CacheService,
    ) {
        this.attendanceInfo=[];
    }

    ngOnInit() {
        this.initData(true);
    }
    initData(init: boolean = true){//重置及pageSizeChange
        if(init){
            this.sortArr=null;
            this.itemsPerPage = 10;
            this.statusValue = 0;
            this.sendMessageStatusValue = 0;
            this.searchContent = '';
            this.isSearch = false;
        }
        this.page = 1;
        this.loading=true;
        this.loadAll();
    }

    ngOnDestroy() {
    }

    loadAll() {
        if (this.isSearch == false) {
            this.sendHttp();
        } else {
            this.search();
        }
    }

    sendHttp() {
        // 获取当前请求页面所有数据
        this.attendanceDetailService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            keyCode: this.cache.getNone(ATTENDANCE_KEYCODE_RECORD),
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(AttendanceModel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        )
    }

    sort(sort: { key: string, value: string }) {
        if (sort.value) {
            this.sortArr = [sort.key + ',' + (sort.value.replace('end', ''))];
        }
        else {
            this.sortArr = null;
        }
        this.loadAll();
    }

    search() {
        this.isSearch = true;
        if (this.searchContent == '') {
            this.attendanceDetailService.search({
                keyCode: this.cache.getNone(ATTENDANCE_KEYCODE_RECORD),
                status: this.statusValue,
                sendMessageStatus: this.sendMessageStatusValue,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sortArr,
            }).subscribe
            (
                (res: HttpResponse<(AttendanceModel)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
        else {
            this.attendanceDetailService.search({
                keyCode: this.cache.getNone(ATTENDANCE_KEYCODE_RECORD),
                name: this.searchContent,
                status: this.statusValue,
                sendMessageStatus: this.sendMessageStatusValue,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sortArr,
            }).subscribe
            (
                (res: HttpResponse<(AttendanceModel)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }

    private onSuccess(data) {
        if (data) {
            this.loading = false;
            this.attendanceInfo = data.content;
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
        }
    }

    private onError(error) {
        console.log('error', error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }
}
