import { Component, OnInit,OnDestroy} from '@angular/core';
import {JhiEventManager} from "ng-jhipster";
import {Subscription} from "rxjs";
import {ModalHelper} from "@delon/theme";
import {HttpResponse} from '@angular/common/http';
import {NzCustomAlertService,CommonMethodsService,ChartComponent,ChartService,HomeInfo} from "@shared";

@Component({
  selector: 'sales-plan',
  templateUrl: './sales-plan.component.html',
})
export class SalesPlanComponent implements OnInit,OnDestroy {
    searchItem:string;//搜索内容
    loading:boolean;//控制是否loading

    sortArr:string[];//排序条件数组 字段+正/倒叙

    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    totalItems:any;//总页数
    totalElements:any;//总页数
    numberOfElements:number;//当前存在记录数

    isSearch:boolean;//标志 是否触发搜索

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
        private chartService: ChartService,
        private eventManager: JhiEventManager,
        private modal: ModalHelper,
        private nzCustomAlertService: NzCustomAlertService,
    ) { }

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
                    id:175,
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
                    id:175,
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
                    id:175,
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
        // this.zuanZhanService.query({
        //     page: this.page - 1,
        //     size: this.itemsPerPage,
        //     sort: this.sortArr,
        // }).subscribe(
        //     (res: HttpResponse<(ZuanZhan)[]>) => this.onSuccess(res.body),
        //     (res: HttpResponse<(any)>) => this.onError(res)
        // );
    }
    sort(sort: { key: string, value: string }) {
        if (sort.value) {
            this.sortArr = [sort.key + ',' + (sort.value.replace('end', ''))];
        } else {
            this.sortArr = null;
        }
        this.loadAll();
    }
    search(init: boolean = true) {
        if(init){
            this.page=1;
        }
        this.isSearch=true;
        // this.zuanZhanService.search({
        //     shopName: this.commonMethodsService.myTrim('besides',this.searchItem_shopName),
        //     brandName: this.commonMethodsService.myTrim('besides',this.searchItem_brandName),
        //     goodName: this.commonMethodsService.myTrim('besides',this.searchItem_goodName),
        //     applicant:this.commonMethodsService.myTrim('besides',this.searchItem_applicant),
        //     priceType:this.searchItem_applyType,
        //     zzType:this.searchItem_zzType,
        //     startTime: this.beginTime ,
        //     endTime: this.endTime,
        //     page: this.page - 1,
        //     size: this.itemsPerPage,
        //     sort: this.sortArr,
        // }).subscribe(
        //     (res: HttpResponse<(ZuanZhan)[]>) => this.onSuccess(res.body),
        //     (res: Response) => this.onError(res.json())
        // );
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

    //请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        if(data){
            // this.totalItems = data.totalPages * 10;
            // this.totalElements = data.totalElements;
            // this.zuanZhans = data.content;
            // this.numberOfElements=data.numberOfElements;
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }

}
