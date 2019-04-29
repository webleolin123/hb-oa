import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "@core";
import {JhiEventManager} from "ng-jhipster";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {ChartComponent, HOME_MONTH, HOME_TITLE, HOME_TITLE_EN, HOME_URL} from "@shared";
import {HomeInfo} from "../home-model/home.model";
import {HomeSomeListService} from "./home-someList.service";
import {HomeSomeListDetailComponent} from "../home-someList-detail/home-someList-detail.component";
import {
  WORKFLOW_HOME_BUSINESS_YEAR_TREND_API,
  WORKFLOW_HOME_BUSINESS_MONTH_TREND_API,
  WORKFLOW_HOME_BUSINESS_DAY_TREND_API,
  WORKFLOW_HOME_GOODS_YEAR_TREND_API,
  WORKFLOW_HOME_GOODS_MONTH_TREND_API,
  WORKFLOW_HOME_GOODS_DAY_TREND_API,
  WORKFLOW_HOME_PERSON_YEAR_TREND_API,
  WORKFLOW_HOME_PERSON_MONTH_TREND_API,
  WORKFLOW_HOME_PERSON_DAY_TREND_API,
} from '../../../../app.constants';

import {ModalHelper} from '@delon/theme';
import { NzCustomAlertService } from '@shared';
import {CacheService} from "@delon/cache";
@Component({
    selector: 'ngx-home-someList',
    templateUrl: './home-someList.component.html',
})
export class HomeSomeListComponent implements OnInit, OnDestroy {
  loading :boolean;//控制是否loading
  sortArr: string[];//排序条件数组 字段+正/倒叙
    type:any;
    title:any;
    titleEN:any;
    url:any;
    requiredReq:any;
    detailList=[];
    error: any;
    success: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    totalElements: any=0;
    page: any;
    array: any;  // 数组容器
    data: any={}; // 对象容器
    //搜索相关
    isSearch :boolean;
    searchItem:string;
    searchType:string;
    //搜索相关
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
    //chart组件相关
    searchDay:Subscription;//选择年时广播信息
    searchMonth:Subscription;//选择年时广播信息
    searchYear:Subscription;//选择年时广播信息
    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        private homeListService: HomeSomeListService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private activeModal: NgbActiveModal,
        private modal: ModalHelper,
        private nzCustomAlertService: NzCustomAlertService,
        private cache: CacheService,

    ) {
            this.title= this.cache.getNone(HOME_TITLE);
            this.titleEN=this.cache.getNone(HOME_TITLE_EN);
            this.url=this.cache.getNone(HOME_URL);
            this.requiredReq=this.cache.getNone(HOME_MONTH);
            this.searchType='';
            switch (this.titleEN) {
                case 'goods': this.searchType='商品名称';break;
                case 'person': this.searchType='申请人';break;
                case 'business': this.searchType='业务名称';break;
                default:break;
            }
            this.initData(true);
    }
    ngOnInit() {
        this.loadAll();
    }
    initData(init: boolean = true){//重置及pageSizeChange

        if(init){
            this.sortArr=null;
            this.itemsPerPage = 10;
            this.isSearch = false;
            this.searchItem='';
        }
        this.page = 1;
        this.loading=true;
        this.loadAll();
    }
    ngOnDestroy() {
    }
    chartRequest(id,type){
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('日趋势响应',response);
          switch (type) {
            case 'goods': this.homeListService.getTrend_dayTrend=WORKFLOW_HOME_GOODS_DAY_TREND_API;break;//默认展示日的数据
            case 'person': this.homeListService.getTrend_dayTrend=WORKFLOW_HOME_PERSON_DAY_TREND_API;break;//默认展示日的数据
            case 'business': this.homeListService.getTrend_dayTrend=WORKFLOW_HOME_BUSINESS_DAY_TREND_API;break;//默认展示日的数据
            default:break;
          }
            if(response.name=='saveDayValue'){
              if(id){
                this.homeListService.getDayTrendData({
                    startTime:response.content.startTime,
                    endTime:response.content.endTime,
                    id:id,
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
            }
        } );
        // 请求月
        this.searchMonth=this.eventManager.subscribe('saveMonthValue', response => {
            console.log('月趋势响应',response);
          switch (type) {
            case 'goods': this.homeListService.getTrend_monthTrend=WORKFLOW_HOME_GOODS_MONTH_TREND_API;break;//默认展示月的数据
            case 'person': this.homeListService.getTrend_monthTrend=WORKFLOW_HOME_PERSON_MONTH_TREND_API;break;//默认展示月的数据
            case 'business': this.homeListService.getTrend_monthTrend=WORKFLOW_HOME_BUSINESS_MONTH_TREND_API;break;//默认展示月的数据
            default:break;
          }
            if(response.name=='saveMonthValue'){
              if(id){
                this.homeListService.getMonthTrendData({
                    month: response.content,
                    id:id,
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
            }
        } );
        // 请求年
        this.searchYear=this.eventManager.subscribe('saveYearValue', response => {
            console.log('年趋势响应',response);
          switch (type) {
            case 'goods': this.homeListService.getTrend_yearTrend=WORKFLOW_HOME_GOODS_YEAR_TREND_API;break;//默认展示年的数据
            case 'person': this.homeListService.getTrend_yearTrend=WORKFLOW_HOME_PERSON_YEAR_TREND_API;break;//默认展示年的数据
            case 'business': this.homeListService.getTrend_yearTrend=WORKFLOW_HOME_BUSINESS_YEAR_TREND_API;break;//默认展示年的数据
            default:break;
          }
            if(response.name=='saveYearValue'){
                if(id){
                    this.homeListService.getYearTrendData({
                        year: response.content,
                        id:id,
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
            }
        } );
    }
    loadAll() {
        if (this.isSearch == false) {
            this.sendHttp();
        } else {
            this.search();
        }
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        this.homeListService.resourceUrl=this.url;
        this.homeListService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
            month:this.requiredReq,
        }).subscribe(
            (res: HttpResponse<(HomeInfo)[]>) => this.onSuccess(res.body),
            (res: HttpResponse<any>) => this.onError(res)
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
    toTrend(id,type,Name){
        // 初始化数据
        this.chartRequest(id,type);//广播，请求数据准备
        switch (type){//显示处理 比如标题 是否显示副标题
            case 'business': this.chartTitle=Name+'—趋势';this.isTrend=false;break;
            case 'goods':this.chartTitle='商品—趋势';break;
            case 'person':this.chartTitle='人员'+'—趋势';break;
            default:break;
        }
      let parentData={
        title:this.chartTitle,
        onlyDay:this.onlyDay,
        onlyMonth:this.onlyMonth,
        onlyYear:this.onlyYear,
        onlyFlag:this.onlyFlag,
        isDialog:this.isDialog,
        isTrend:this.isTrend,
        chartName:Name,
      };
      this.modal
        .static(ChartComponent, {parentData:parentData},'lg')
        .subscribe(() => {//回调函数 重新请求新数据
          this.loadAll();
        });
    }
    toDetail(id,type,Name){
        let parentData={
          id:id,
          type:type,
          name:Name,
          month:this.requiredReq,
        };
        this.modal
        .static(HomeSomeListDetailComponent, {parentData:parentData},'lg')
        .subscribe(() => {//回调函数 重新请求新数据
          this.loadAll();
        });
    }
    search() {
        if(this.searchItem==''){
            this.nzCustomAlertService.info('输入内容不为空');
            return;
        }
        this.isSearch=true;
        switch (this.titleEN){
            case 'business':this.search_business();break;
            case 'goods':this.search_goods();break;
            case 'person':this.search_person();break;
            default:break;
        }
    }
    search_business(){
        this.homeListService.search_busibess({
            page: this.page - 1,
            size: this.itemsPerPage,
            month:this.requiredReq,
            moduleName:this.searchItem,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(HomeInfo)[]>) => this.onSuccess(res.body),
            (res: HttpResponse<any>) => this.onError(res)
        );
    }
    search_goods(){
        this.homeListService.search_goods({
            page: this.page - 1,
            size: this.itemsPerPage,
            month:this.requiredReq,
            goodName:this.searchItem,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(HomeInfo)[]>) => this.onSuccess(res.body),
            (res: HttpResponse<any>) => this.onError(res)
        );
    }
    search_person(){
        this.homeListService.search_person({
            page: this.page - 1,
            size: this.itemsPerPage,
            month:this.requiredReq,
            applicant_name:this.searchItem,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(HomeInfo)[]>) => this.onSuccess(res.body),
            (res: HttpResponse<any>) => this.onError(res)
        );
    }
    private onSuccess(data) {
        if(data){
            this.loading = false;
            this.totalItems = data.totalPages * 10;
            this.detailList = data.content;
            this.totalElements = data.totalElements;
        }
    }
    private onError(error) {
      console.log('error',error);
      this.nzCustomAlertService.error('哎呀，请求出错啦！')
    }
}
