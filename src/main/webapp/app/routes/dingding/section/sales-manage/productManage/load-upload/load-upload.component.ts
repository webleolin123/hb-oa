import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ModalHelper} from "@delon/theme";
import {JhiEventManager} from "ng-jhipster";
import {Subscription} from "rxjs";
import {CommonMethodsService, NzCustomAlertService,ChartComponent,ChartService,HomeInfo} from "@shared";
import {DatePipe} from '@angular/common';

import {LoadUploadService} from './load-upload.service';
import {LoadUploadModel} from './load-upload.model';
import {LoadUploadDetailComponent} from "./detail/load-upload-detail.component";


@Component({
  selector: 'load-upload',
  templateUrl: './load-upload.component.html',
})
export class LoadUploadComponent implements OnInit{
    shelves: LoadUploadModel[];
    loading:boolean;//控制是否loading

    sortArr:string[];//排序条件数组 字段+正/倒叙
    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    totalItems:any;//总页数
    totalElements:any;//总页数
    numberOfElements:number;//当前存在记录数

    isSearch:boolean;//标志 是否触发搜索
    //搜索相关
    applyType=['全部','上架','永久下架','临时下架'];
    searchItem_shopName:string;
    searchItem_brandName:string;
    searchItem_goodName:string;
    searchItem_applyType:number;
    searchItem_applicant:string;
    beginTime: string;//条件查询 --默认开始时间
    endTime: string;//条件查询 --默认结束时间

    dateFormat:string = 'yyyy-MM-dd';
    dateRange:string[];
    //chart组件相关
    itemArr=
        {
            '申请总数':0,
            '待办总数':0,
            '已通过总数':0,
            '已处理总数':0,
            '已撤销总数':0,
            '总申请费用':0,
            '已通过费用':0,
            '实际使用费用':0,
        };
    chartName:any='';
    chartTitle:any='';
    onlyDay:any=true;
    onlyMonth:any=true;
    onlyYear:any=true;
    onlyFlag:any=false;
    isDialog:any=true;
    isTrend:any=true;
    homeTrendArr=[];
    searchDay:Subscription;//选择年时广播信息
    searchMonth:Subscription;//选择年时广播信息
    searchYear:Subscription;//选择年时广播信息
    //chart组件相关
    constructor(
        private shelvesService: LoadUploadService,
        private nzCustomAlertService: NzCustomAlertService,
        private commonMethodsService: CommonMethodsService,
        private modal: ModalHelper,
        private datePipe: DatePipe,
        private chartService: ChartService,
        private eventManager: JhiEventManager,
    ) {
        this.shelves=[];
    }

    ngOnInit() {
        this.chartRequest();
        this.initData(true);
    }
    ngOnDestroy(){
        this.searchDay.unsubscribe();
        this.searchMonth.unsubscribe();
        this.searchYear.unsubscribe();
    }
    chartRequest(){
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('日趋势响应',response);
            if(response.name=='saveDayValue'){
                this.chartService.getBusinessDayTrendData({
                    startTime:response.content.startTime,
                    endTime:response.content.endTime,
                    id:139,
                })
                    .subscribe(
                        (res: HttpResponse<HomeInfo[]>) =>{
                            console.log('res.body',res.body);
                            this.homeTrendArr=res.body;
                            this.itemArr['申请总数']=this.homeTrendArr["totalNumber"];
                            this.itemArr['待办总数']=this.homeTrendArr["toDoNumber"];
                            this.itemArr['已通过总数']=this.homeTrendArr["adoptedNumber"];
                            this.itemArr['已处理总数']=this.homeTrendArr["processedNumber"];
                            this.itemArr['已撤销总数']=this.homeTrendArr["cancelledNumber"];
                            this.itemArr['总申请费用']=this.homeTrendArr["totalApproveFee"];
                            this.itemArr['已通过费用']=this.homeTrendArr["adoptedApproveFee"];
                            this.itemArr['实际使用费用']=this.homeTrendArr["usedApproveFee"];
                            this.eventManager.broadcast({
                                name: 'saveDayValue_result',
                                content:this.itemArr,
                            });
                        },
                        (res: HttpResponse<any>) => this.onError(res)
                    );
            }
        } );
        // 请求月
        this.searchMonth=this.eventManager.subscribe('saveMonthValue', response => {
            console.log('月趋势响应',response);
            if(response.name=='saveMonthValue'){
                this.chartService.getBusinessMonthTrendData({
                    month: response.content,
                    id:139,
                }).subscribe(
                    (res: HttpResponse<HomeInfo[]>) => {
                        this.homeTrendArr=res.body;
                        this.itemArr['申请总数']=this.homeTrendArr["totalNumber"];
                        this.itemArr['待办总数']=this.homeTrendArr["toDoNumber"];
                        this.itemArr['已通过总数']=this.homeTrendArr["adoptedNumber"];
                        this.itemArr['已处理总数']=this.homeTrendArr["processedNumber"];
                        this.itemArr['已撤销总数']=this.homeTrendArr["cancelledNumber"];
                        this.itemArr['总申请费用']=this.homeTrendArr["totalApproveFee"];
                        this.itemArr['已通过费用']=this.homeTrendArr["adoptedApproveFee"];
                        this.itemArr['实际使用费用']=this.homeTrendArr["usedApproveFee"];
                        this.eventManager.broadcast({
                            name: 'saveMonthValue_result',
                            content:this.itemArr,
                        });
                    },
                    (res: HttpResponse<any>) => this.onError(res)
                );
            }
        } );
        // 请求年
        this.searchYear=this.eventManager.subscribe('saveYearValue', response => {
            console.log('年趋势响应',response);
            if(response.name=='saveYearValue'){
                this.chartService.getBusinessYearTrendData({
                    year: response.content,
                    id:139,
                }).subscribe(
                    (res: HttpResponse<HomeInfo[]>) => {
                        this.homeTrendArr=res.body;
                        this.itemArr['申请总数']=this.homeTrendArr["totalNumber"];
                        this.itemArr['待办总数']=this.homeTrendArr["toDoNumber"];
                        this.itemArr['已通过总数']=this.homeTrendArr["adoptedNumber"];
                        this.itemArr['已处理总数']=this.homeTrendArr["processedNumber"];
                        this.itemArr['已撤销总数']=this.homeTrendArr["cancelledNumber"];
                        this.itemArr['总申请费用']=this.homeTrendArr["totalApproveFee"];
                        this.itemArr['已通过费用']=this.homeTrendArr["adoptedApproveFee"];
                        this.itemArr['实际使用费用']=this.homeTrendArr["usedApproveFee"];
                        this.eventManager.broadcast({
                            name: 'saveYearValue_result',
                            content:this.itemArr,
                        });
                    },
                    (res: HttpResponse<any>) => this.onError(res)
                );
            }
        } );
    }
    initData(init: boolean = true){
        if(init){
            this.sortArr=null;
            this.isSearch = false;
            //条件查询初始化
            this.dateRange=[];
            this.beginTime='';// 初始化条件查询开始时间
            this.endTime='';// 初始化条件查询结束时间
            this.searchItem_shopName='';
            this.searchItem_brandName='';
            this.searchItem_goodName='';
            this.searchItem_applicant='';
            this.searchItem_applyType=0;
            //分页器配置
            this.itemsPerPage = 10;
            this.numberOfElements=0;
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
        this.shelvesService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(LoadUploadModel)[]>) => this.onSuccess(res.body),
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
        this.shelvesService.search({
            shopName: this.commonMethodsService.myTrim('besides',this.searchItem_shopName),
            brandName: this.commonMethodsService.myTrim('besides',this.searchItem_brandName),
            goodName: this.commonMethodsService.myTrim('besides',this.searchItem_goodName),
            applicant:this.commonMethodsService.myTrim('besides',this.searchItem_applicant),
            applyType: this.searchItem_applyType,
            startDate: this.beginTime ,
            endDate: this.endTime,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(LoadUploadModel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    onChange(result: Date): void {
        this.beginTime=this.datePipe.transform(result[0], this.dateFormat);
        this.endTime=this.datePipe.transform(result[1], this.dateFormat);
    }
    //查看数据
    viewData(){
        let parentData={
            title:this.chartTitle,
            onlyDay:this.onlyDay,
            onlyMonth:this.onlyMonth,
            onlyYear:this.onlyYear,
            onlyFlag:this.onlyFlag,
            isDialog:this.isDialog,
            isTrend:this.isTrend,
        };
        this.modal
            .static(ChartComponent, {parentData:parentData},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    // 查看商品
    check(id) {
        this.modal
            .static(LoadUploadDetailComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
        });
    }

    //请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.shelves = data.content;
            this.numberOfElements=data.numberOfElements;
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
