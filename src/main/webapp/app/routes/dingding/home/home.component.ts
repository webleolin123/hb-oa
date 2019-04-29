import { Component, OnDestroy,OnInit,ElementRef,Renderer2,ViewChild, } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "@core";
import {JhiEventManager} from "ng-jhipster";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {HomeService} from "./home.service";
import {CommonMethodsService} from "@shared";
import {HomeInfo} from "./home-model/home.model";
import { DatePipe } from '@angular/common';
import {
  WORKFLOW_HOME_DETAIL_PERSON_API,//人员分析明细
  WORKFLOW_HOME_DETAIL_BUSINESS_API,//业务分析明细
  WORKFLOW_HOME_DETAIL_GOODS_API,//商品分析明细
} from '../../../app.constants';
import {
    NzCustomAlertService,
    HOME_TITLE,
    HOME_TITLE_EN,
    HOME_URL,
    HOME_MONTH,
} from '@shared';
import {CacheService} from "@delon/cache";
import { STColumn, XlsxService } from '@delon/abc';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.less'],
})
export class HomeComponent implements  OnDestroy,OnInit {
    columns: STColumn[] = [
        { title: '统计日期', index: 'num1', },
        { title: '申请总数', index: 'num2', },
        { title: '待办总数', index: 'num3', },
        { title: '已通过总数', index: 'num4', },
        { title: '已处理总数', index: 'num5', },
        { title: '已撤销总数', index: 'num6', },
        { title: '总申请费用(单位：元)', index: 'num7', },
        { title: '已通过费用(单位：元)', index: 'num8', },
        { title: '实际使用费用(单位：元)', index: 'num9', },
        { title: '商品申请总数', index: 'num10', },
        { title: '人员申请总数"', index: 'num11', },
    ];
    widthConfig=['200px','1008px'];
    date=null;
    monthFormat = 'yyyy-MM';
    detailTitle:any='';//跳转明细的标题
    detailUrl:any;//跳转明细请求接口的地址
    titleEN:any;//跳转明细的标题英文名
    @ViewChild('svg1') svgCircle1:ElementRef;
    @ViewChild('svg2') svgCircle2:ElementRef;
    passCount:any=0;//通过数
    passFee:any=0;//通过费用
    total_passCount:any=0;//通过总数
    total_passFee:any=0;//通过总费用
    passCountPercent:any;//通过申请数百分比
    passFeePercent:any;//通过申请费用百分比
    objectKeys:any;
    itemName:any;
    iconArr:any;
    icon_bgArr:any;
    totalApprovalList:any;//总数据概况
    testArr:any;//
    monthlyReportList=[];//月报概况
    yearlyReportList:any;//年报概况
    myResult:any;
    array: any;  // 数组容器
    data: any; // 对象容器
    summaryOfTotalDataInfo: any; // 对象容器
    monthlyReportInfo: any; // 对象容器
    variousAnalysesInfo: any; // 对象容器
    subs: Subscription;
    //操作权限
    monthValue:any;
    nowDay:any;//显示今天日期
    nowMonth:any;//显示当月
    preYear:any;//显示上个月的年
    preMonth:any;//显示上个月
    preDate:any;//上个月 日期
    saveSelectMonth:any;//保存当前选择的月份值2018-08
    saveMonth:any;//保存当前选择的月份比如08
    nowSelectedMonth:any;//显示当前选择的月份
    monthArr=['01','02','03','04','05','06','07','08','09','10','11','12'];// 月份基础值
    tmp:any;
    businessApplicationNumberRanking=[];//本月业务申请数排行
    businessApplicationFeeRanking=[];//本月业务申请费用排行
    numberOfPersonnelApplications=[];//本月人员申请数排行
    numberOfProductApplications=[];//本月商品申请数排行
    //chart
    searchDay:Subscription;//选择年时广播信息
    searchMonth:Subscription;//选择年时广播信息
    searchYear:Subscription;//选择年时广播信息
    starTimeVal='';
    endTimeVal='';
    yearVal='';
    monthVal='';
    reqData:any={};
    exportDatas:any=[];
    exportType:any='day';//用于标识当前下载数据项 比如默认下载日趋势的数据
    title:any='日报趋势图';//chart组件title名
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
            '商品申请总数':0,
            '人员申请总数':0,
        };
    parentData:any;
    homeTrendArr=[];
    constructor(
        private elementRef: ElementRef,
        private renderer2: Renderer2,
        private router: Router,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private homeService: HomeService,
        private commonMethodsService: CommonMethodsService,
        private datePipe: DatePipe,
        private nzCustomAlert: NzCustomAlertService,
        private cache: CacheService,
        private xlsx: XlsxService,
        private nzCustomAlertService: NzCustomAlertService,
        ) {
        this.parentData={
            onlyDay:true,
            onlyMonth:true,
            onlyYear:true,
            onlyFlag:false,
            isDialog:false,
        };
        this.nowDay=this.commonMethodsService.getRangeDate(0);//今天
        this.nowMonth=this.nowDay.split('-')[0]+'-'+this.nowDay.split('-')[1];//当前月
        this.preDate=this.commonMethodsService.getPreDate(this.nowDay,0);//上个月当天 格式2018-10-01
        this.preYear= this.preDate.split('-')[0];//上个月对应的年分
        this.preMonth= this.preDate.split('-')[1];//上个月 月份
        this.nowSelectedMonth=this.preMonth;//默认显示上个月
        this.monthValue= this.preYear+'-'+this.preMonth;//拼接年和月组合的月份
        this.date=this.preYear+'-'+this.preMonth;
        this.saveSelectMonth=this.monthValue;//默认保存上一个月 格式2018-10
        this.saveMonth=this.preMonth;//默认保存上一个月 格式10
        // 动态拼接格式化月份基础值
        this.monthArr.forEach((monthValue,i)=>{
            this.monthArr[i]=this.preYear+'-'+this.monthArr[i];
        });
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('请求日接收广播saveDayValue响应',response);
            this.title='日报趋势图';
            this.exportType='day';
            if(response.name=='saveDayValue'){
                this.starTimeVal=response.content.startTime;
                this.endTimeVal=response.content.endTime;
                this.homeService.getDayTrendData({
                    startTime:this.starTimeVal,
                    endTime: this.endTimeVal,
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
                            this.itemArr['商品申请总数']=this.homeTrendArr["totalGoodNumber"];
                            this.itemArr['人员申请总数']=this.homeTrendArr["totalApplicantNumber"];
                            this.eventManager.broadcast({
                                name: 'saveDayValue_result',
                                content:this.itemArr,
                            });
                        },
                        (res: HttpResponse<any>) => this.onError(res)
                    );
            }
        } );
    }
    ngOnInit(){
        this.loadAll();
        this.array = [];
        this.data = [];
        this.summaryOfTotalDataInfo=[];
        this.monthlyReportInfo=[];
        this.variousAnalysesInfo=[];
        this.businessApplicationNumberRanking=[];
        this.businessApplicationFeeRanking=[];
        this.numberOfPersonnelApplications=[];
        this.numberOfProductApplications=[];
        this.itemName=['总审批概况','总费用概况','总商品概况','总人员概况',];
        this.iconArr=[
            '../../../../assets/images/home/icon_gou.png',
            '../../../../assets/images/home/icon_gou.png',
            '../../../../assets/images/home/icon_money.png',
            '../../../../assets/images/home/icon_bag.png',
            '../../../../assets/images/home/icon_person.png',];
        this.icon_bgArr=[
            '../../../../assets/images/home/bgBlue.png',
            '../../../../assets/images/home/bgYellow.png',
            '../../../../assets/images/home/bgGreen.png',
            '../../../../assets/images/home/bgRed.png',];
        this.objectKeys= Object.keys;//遍历出对象的key
        //总数据概况
        this.totalApprovalList= [
            {
                '总申请总数':0,
                '待办总数':0,
                '已通过总数':0,
            },
            {
                '总申请费用':0,
                '已通过费用':0,
                '实际使用费用':0,
            },
            {
                '商品申请总数':0,
                '已通过商品总数':0,
            },
            {
                '人员申请总数':0,
            },
        ];
        //年趋势
        this.yearlyReportList=[];
        //传给chart的初始化结果
        this.myResult={
            'all':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,},
            'already':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,},
            'not':{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,'9':0,'10':0,'11':0,'12':0,}
        };
        //月报概况
        this.monthlyReportList= [
            {
                '申请总数':0,
                '待办总数':0,
                '已通过总数':0,
                '已处理总数':0,
                '已撤销总数':0,
            },
            {
                '总申请费用':0,
                '已通过费用':0,
                '实际使用费用':0,
            },
            {
                '商品申请总数':0,
                '已通过商品数':0,
            },
            {
                '人员申请总数':0,
            },
        ];
        this.testArr=this.totalApprovalList;
        this.totalApprovalList.forEach((item,i)=>{
            this.testArr[i].itemName=this.itemName[i];
            this.testArr[i].icon=this.iconArr[i];
            this.testArr[i].icon_bg=this.icon_bgArr[i];
        });
        this.monthlyReportList.forEach((item,i)=>{
            this.monthlyReportList[i].itemName=this.itemName[i];
        });
        this.chartRequest();
        this.registerChangeInUsers();
    }
    ngOnDestroy(){
        this.subs.unsubscribe();
        //chart
        //取消广播订阅
        this.searchDay.unsubscribe();
        this.searchMonth.unsubscribe();
        this.searchYear.unsubscribe();
        //chart
    }
    registerChangeInUsers() {
        this.subs=this.eventManager.subscribe('homeInfo', (response) => {
            if(response.content=='badSelect'){
                this.monthValue=this.saveSelectMonth;
                this.nowSelectedMonth=this.saveMonth;
            }
        });
    }
    export(){
        if(this.exportType=='day'){
            this.reqData={
                startTime: this.starTimeVal,
                endTime: this.endTimeVal,
            };
          this.homeService.export_dayTrend(this.reqData)
            .subscribe(
              (res: HttpResponse<(HomeInfo)[]>) => {this.onExportSuccess(res.body);},
              (res: HttpResponse<any>) => this.onError(res)
            );
        }
        if(this.exportType=='month'){
            this.reqData={
                month: this.monthVal,
            };
          this.homeService.export_monthTrend(this.reqData)
            .subscribe(
              (res: HttpResponse<(HomeInfo)[]>) => {this.onExportSuccess(res.body);},
              (res: HttpResponse<any>) => this.onError(res)
            );
        }
        if(this.exportType=='year'){
            this.reqData={
                year: this.yearVal,
            };
          this.homeService.export_yearTrend(this.reqData)
            .subscribe(
              (res: HttpResponse<(HomeInfo)[]>) => {this.onExportSuccess(res.body);},
              (res: HttpResponse<any>) => this.onError(res)
            );
        }
    }
    private onExportSuccess(homeInfo:HomeInfo[]) {
        const data = [this.columns.map(i => i.title)];
        this.exportDatas = homeInfo;
        this.array=[];
        this.exportDatas.forEach((value)=>{
            this.data = {
                num1: this.commonMethodsService.myFilter('statisticsDate',value.statisticsDate),//统计日期
                num2: value.totalNumber ,//申请总数
                num3: value.toDoNumber ,//待办总数
                num4: value.adoptedNumber ,//已通过总数
                num5: value.processedNumber ,//已处理总数
                num6: value.cancelledNumber ,//已撤销总数
                num7: value.totalApproveFee  ,//总申请费用
                num8: value.adoptedApproveFee ,//已通过费用
                num9: value.usedApproveFee  ,//实际使用费用
                num10: value.totalNumberOfGood  ,//商品申请总数
                num11: value.totalNumberOfApplicant ,//人员申请总数
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
            filename: this.title+'.xlsx',
            callback: () => {
                setTimeout(() => {
                    this.nzCustomAlertService.success('导出成功');
                }, 300);
            },
        });
    }
    chartRequest(){
        //chart
        // 请求日
        this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
            console.log('请求日接收广播saveDayValue响应',response);
            this.title='日报趋势图';
            this.exportType='day';
            if(response.name=='saveDayValue'){
                this.starTimeVal=response.content.startTime;
                this.endTimeVal=response.content.endTime;
                this.homeService.getDayTrendData({
                    startTime:this.starTimeVal,
                    endTime: this.endTimeVal,
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
                            this.itemArr['商品申请总数']=this.homeTrendArr["totalGoodNumber"];
                            this.itemArr['人员申请总数']=this.homeTrendArr["totalApplicantNumber"];
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
            this.title='月报趋势图';
            this.exportType='month';
            console.log('response',response);
            if(response.name=='saveMonthValue'){
                this.monthVal=response.content;
                this.homeService.getMonthTrendData({
                    month:this.monthVal,
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
                        this.itemArr['商品申请总数']=this.homeTrendArr["totalGoodNumber"];
                        this.itemArr['人员申请总数']=this.homeTrendArr["totalApplicantNumber"];
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
            this.title='年报趋势图';
            this.exportType='year';
            console.log('response',response);
            if(response.name=='saveYearValue'){
              this.yearVal=response.content;
                this.homeService.getYearTrendData({
                    year:this.yearVal,
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
                        this.itemArr['商品申请总数']=this.homeTrendArr["totalGoodNumber"];
                        this.itemArr['人员申请总数']=this.homeTrendArr["totalApplicantNumber"];
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
    loadAll() {
        // 获取当前请求页面所有数据
        this.homeService.query({
            month:this.monthValue?this.monthValue:this.saveSelectMonth,
        }).subscribe(
            (res: HttpResponse<(HomeInfo)[]>) => this.onSuccess(res.body),
          (res: HttpResponse<any>) => this.onError(res)
        )
    }
    monthChange(result: Date): void {
      let nowSelectedMonth=this.datePipe.transform(result,this.monthFormat);
      if(nowSelectedMonth){
        this.nowSelectedMonth=nowSelectedMonth;
        if(nowSelectedMonth>=this.nowMonth){//当前选择月份如果大于等于当前月 弹窗提示
          this.eventManager.broadcast({
            name: 'homeInfo',
            content:'badSelect',
          });
          this.nzCustomAlert.info('所选月份数据统计未完成，请选择其他月份继续查看');
        }
        else{
          this.saveSelectMonth=nowSelectedMonth;
          this.saveMonth=this.nowSelectedMonth;
          this.monthValue=nowSelectedMonth;
          this.loadAll();
        }
      }
    }
    showDetail(item){
        if(item=='person'){
            this.detailTitle='人员明细';
            this.titleEN='person';
            this.detailUrl=WORKFLOW_HOME_DETAIL_PERSON_API;
        }
        if(item=='business'){
            this.detailTitle='业务明细';
            this.titleEN='business';
            this.detailUrl=WORKFLOW_HOME_DETAIL_BUSINESS_API;
        }
        if(item=='goods'){
            this.detailTitle='商品明细';
            this.titleEN='goods';
            this.detailUrl=WORKFLOW_HOME_DETAIL_GOODS_API;
        }
        this.cache.set(HOME_TITLE,this.detailTitle);
        this.cache.set(HOME_TITLE_EN,this.titleEN);
        this.cache.set(HOME_URL,this.detailUrl);
        this.cache.set(HOME_MONTH,this.monthValue);
        this.router.navigate(['/dingding/home-someList']);
    }
    private onSuccess(data) {
        console.log('首页响应',data);
        if(data){
            this.data = data;
            this.summaryOfTotalDataInfo=this.data[0];
            this.monthlyReportInfo=this.data[1];
            this.variousAnalysesInfo=this.data[2];
            if(!this.summaryOfTotalDataInfo||!this.monthlyReportInfo||!this.variousAnalysesInfo){
                this.eventManager.broadcast({
                    name: 'homeInfo',
                    content:'badSelect',
                });
                // this.nzCustomAlert.info('当前月份数据不完整，请选择其他月份继续查看');
            }
            else{
            this.businessApplicationNumberRanking= this.variousAnalysesInfo.businessApplicationNumberRanking;
            this.businessApplicationFeeRanking= this.variousAnalysesInfo.businessApplicationFeeRanking;
            this.numberOfPersonnelApplications= this.variousAnalysesInfo.numberOfPersonnelApplications;
            this.numberOfProductApplications= this.variousAnalysesInfo.numberOfProductApplications;
            //总数据概况
            this.totalApprovalList= [
                {
                    '总申请总数': this.summaryOfTotalDataInfo['totalNumberOfApplications'],
                    '待办总数': this.summaryOfTotalDataInfo['totalNumberOfPendingApplications'],
                    '已通过总数':this.summaryOfTotalDataInfo['totalNumberOfApplicationsApproved'],
                },
                {
                    '总申请费用':this.summaryOfTotalDataInfo['totalApplicationFee'],
                    '已通过费用':this.summaryOfTotalDataInfo['passedFee'],
                    '实际使用费用':this.summaryOfTotalDataInfo['actualUsageFee'],
                },
                {
                    '商品申请总数':this.summaryOfTotalDataInfo['totalNumberOfProductApplications'],
                    '已通过商品总数':this.summaryOfTotalDataInfo['totalNumberOfGoodsPassed'],
                },
                {
                    '人员申请总数': this.summaryOfTotalDataInfo['totalNumberOfApplicants'],
                },
            ];
            //月报概况
            if(this.monthlyReportInfo['overViewThisMonth'][0]){
                this.monthlyReportList= [
                    {
                        '申请总数':this.monthlyReportInfo['overViewThisMonth'][0].totalNumber+','+this.monthlyReportInfo['statisticsPersent'].totalNumberPersent,
                        '待办总数':this.monthlyReportInfo['overViewThisMonth'][0].toDoNumber+','+this.monthlyReportInfo['statisticsPersent'].toDoNumberPersent,
                        '已通过总数':this.monthlyReportInfo['overViewThisMonth'][0].adoptedNumber+','+this.monthlyReportInfo['statisticsPersent'].adoptedNumberPersent,
                        '已处理总数':this.monthlyReportInfo['overViewThisMonth'][0].processedNumber+','+this.monthlyReportInfo['statisticsPersent'].processedNumberPersent,
                        '已撤销总数':this.monthlyReportInfo['overViewThisMonth'][0].cancelledNumber+','+this.monthlyReportInfo['statisticsPersent'].cancelledNumberPersent,
                    },
                    {
                        '总申请费用':this.monthlyReportInfo['overViewThisMonth'][0].totalApproveFee +','+this.monthlyReportInfo['statisticsPersent'].totalApproveFeePersent,
                        '已通过费用':this.monthlyReportInfo['overViewThisMonth'][0].adoptedApproveFee+','+this.monthlyReportInfo['statisticsPersent'].adoptedApproveFeePersent ,
                        '实际使用费用':this.monthlyReportInfo['overViewThisMonth'][0].usedApproveFee+','+this.monthlyReportInfo['statisticsPersent'].usedApproveFeePersent,
                    },
                    {
                        '商品申请总数':this.monthlyReportInfo['overViewThisMonth'][0].totalNumberOfGood+','+this.monthlyReportInfo['statisticsPersent'].totalNumberOfGoodPersent,
                        '已通过商品数':this.monthlyReportInfo['overViewThisMonth'][0].adoptedNumberOfGood+','+this.monthlyReportInfo['statisticsPersent'].adoptedNumberOfGoodPersent,
                    },
                    {
                        '人员申请总数':this.monthlyReportInfo['overViewThisMonth'][0].totalNumberOfApplicant+',' +
                            this.monthlyReportInfo['statisticsPersent'].totalNumberOfApplicantPersent,
                    },
                ];
            }
    //通过概率 区域内容
            //申请数
            if(this.monthlyReportInfo['overViewThisMonth'][0]){
                this.passCount=this.monthlyReportInfo['overViewThisMonth'][0].adoptedNumber;
                this.total_passCount=this.monthlyReportInfo['overViewThisMonth'][0].totalNumber;
                this.passCountPercent=this.commonMethodsService.accDiv(this.passCount,this.total_passCount);
                //申请费用
                this.passFee=this.monthlyReportInfo['overViewThisMonth'][0].adoptedApproveFee;
                this.total_passFee=this.monthlyReportInfo['overViewThisMonth'][0].totalApproveFee;
                this.passFeePercent=this.commonMethodsService.accDiv(this.passFee,this.total_passFee);
            }
            const circleRadius=50;
            const circleLength=Math.floor(2 * Math.PI * circleRadius);
            this.renderer2.setAttribute(this.svgCircle1.nativeElement, 'stroke-dasharray', ''+this.commonMethodsService.accMul(circleLength,this.passCountPercent)+',10000');
            this.renderer2.setAttribute(this.svgCircle2.nativeElement, 'stroke-dasharray', ''+this.commonMethodsService.accMul(circleLength,this.passFeePercent)+',10000');
            this.testArr=this.totalApprovalList;
            this.totalApprovalList.forEach((item,i)=>{
                this.testArr[i].itemName=this.itemName[i];
                this.testArr[i].icon=this.iconArr[i];
                this.testArr[i].icon_bg=this.icon_bgArr[i];
            });
            this.monthlyReportList.forEach((item,i)=>{
                this.monthlyReportList[i].itemName=this.itemName[i];
            });
            }
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlert.error('哎呀，请求出错啦!');
    }
}
