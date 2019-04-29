import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ModalHelper} from "@delon/theme";
import {CacheService} from "@delon/cache";
import {
    Department,
    NzCustomAlertService,
    CommonMethodsService,
    SEARCH_TYPE,
    SEARCH_CONTENT,
} from "@shared";

import {Router} from "@angular/router";

import {DepartmentManageService} from './department-manage.service';
@Component({
    selector: 'department-manage',
    templateUrl: './department-manage.component.html',
})
export class DepartmentManageComponent implements OnInit{
    departments: Department[];
    loading:boolean;//控制是否loading

    sortArr:string[];//排序条件数组 字段+正/倒叙

    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    totalItems:any;//总页数
    totalElements:any;//总页数
    numberOfElements:number;//当前存在记录数

    isSearch:boolean;//标志 是否触发搜索
    //搜索相关
    applyType=['部门名称'];
    searchItem_applyType:number;
    searchContent:string;

    constructor(
        private departmentManageService: DepartmentManageService,
        private nzCustomAlertService: NzCustomAlertService,
        private commonMethodsService: CommonMethodsService,
        private modal: ModalHelper,
        private router: Router,
        private cache: CacheService,
    ) {
        this.departments=[];
    }
    ngOnInit() {
        this.initData(true);
    }
    initData(init: boolean = true) {
        if (init) {
            this.sortArr = null;
            this.isSearch = false;
            //条件查询初始化
            this.searchItem_applyType = 0;
            this.searchContent = '';
            //分页器配置
            this.itemsPerPage = 10;
            this.numberOfElements = 0;
        }
        this.page = 1;
        this.loadAll();
    }
    loadAll() {
        this.loading=true;
        if (!this.isSearch) {
            this.sendHttp();
        }
        else {
            this.search(false);
        }
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        this.departmentManageService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(Department)[]>) => this.onSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );
    }
    sort(sort: { key: string, value: string }) {
        if (sort.value) {
            this.sortArr = [sort.key + ',' + (sort.value.replace('end', ''))];
        } else {
            this.sortArr = null;
        }
        this.loadAll();
    }
    //查询
    search(init: boolean = true) {
        if(init){
            this.page=1;
        }
        this.isSearch=true;
        this.departmentManageService.search({
            name: this.commonMethodsService.myTrim('besides',this.searchContent),
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(Department)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }

    showDetail(departmentName){
        this.router.navigate(['/dingding/authority/personnel-manage']);
        this.cache.set(SEARCH_TYPE,2);//部门在人员管理查询中值为2
        this.cache.set(SEARCH_CONTENT,departmentName);
    }


    //请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.departments = data.content;
            this.numberOfElements=data.numberOfElements;
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
