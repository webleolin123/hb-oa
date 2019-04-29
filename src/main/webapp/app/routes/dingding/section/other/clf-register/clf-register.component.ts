import {Component,OnDestroy,OnInit,ChangeDetectorRef,AfterViewChecked} from '@angular/core';
import {JhiEventManager} from "ng-jhipster";
import {Router} from "@angular/router";
import {HttpResponse} from '@angular/common/http';
import {Subscription} from "rxjs";
import {Principal} from "@core";

import {CommonMethodsService,ChartComponent} from "@shared";
import {NzCustomAlertService,} from "@shared";
import {DatePipe} from '@angular/common';

import {ClfRegisterModel} from "./clf-register.model";
import {ClfRegisterService} from "./clf-register.service";
import {ClfExportComponent} from "./clf-export/clf-export.component";
import {ModalHelper} from "@delon/theme";
import {ClfDetailComponent} from "./clf-detail/clf-detail.component";
import {ClfEditComponent} from "./clf-edit/clf-edit.component";
import {ClfBatchEditComponent} from "./clf-batchEdit/clf-batchEdit.component";
@Component({
  selector: 'clf-register',
  templateUrl: './clf-register.component.html',
  styles: [`nz-range-picker{margin: 0 8px 12px 0;}`],
})
export class ClfRegisterComponent implements OnInit,OnDestroy,AfterViewChecked{
    isIndeterminate:boolean;//checkbox indeterminate （不确定）状态
    listOfDisplayData: ClfRegisterModel[];//clfInfo备份数据
    isAllDisplayDataChecked = false;//全选checkbox状态
    mapOfCheckedId: { [key: string]: boolean };//保存当前操作的记录id及勾选状态 比如 52(id)：true(checked状态);
    
    dateFormat:string = 'yyyy-MM-dd';
    chooseItem:string[]=['淘宝ID','订单号','电话号码'];
    myChoose:number;
    problemType:string[]=['全部','差价问题','商品错漏发','商品破损','商品指导使用','其他问题'];
    problemTypeValue:number;
    helpType:string[]=['全部','商品补发','退差价','直接退货','客服协助'];
    helpTypeValue:number;
    dateRange:string[];

    loading:boolean;//控制是否loading
    sortArr:string[];//排序条件数组 字段+正/倒叙

    clfInfos: ClfRegisterModel[];//保存返回结果
    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    totalItems:any;//总页数
    totalElements:any;//总页数
    numberOfElements:number;//当前存在记录数

    searchYear:Subscription;//订阅选择年时广播的信息
    searchMonth:Subscription;//订阅选择月时广播的信息
    searchDay:Subscription;//订阅选择日时广播的信息
    // 条件查询参数
    telephone:number;//电话号码
    orderId:string;//订单号
    taoBaoId:string;//淘宝ID
    beginTime: any;//条件查询 --默认开始时间
    endTime: any;//条件查询 --默认结束时间
    id:any;//存放删除记录等操作要用的id
    isSearch:boolean;//标志 是否触发搜索
    // 批量编辑
    checked:number[];//存放已勾选的记录id
    isChosen:boolean;//是否勾选 然后控制是否显示批量编辑按钮
    hasAuthWithAdmin:boolean;//标志是否拥有管理者权限
    //chart组件相关
    title='查看数据';//调用chart组件所需标题名 比如 查看数据
    onlyFlag=false;//接收配置变量  标识 是否有特殊配置
    isDialog=true;
    onlyDay=true;
    onlyMonth=true;
    onlyYear=true;
    isTrend=false;//没有副标题
    trendArr:ClfRegisterModel;//存放返回结果
    itemArr=
        {
            '总提交数':0,
            '待处理数':0,
            '已处理数':0,
        };
    // chart组件相关
  constructor(
      private eventManager: JhiEventManager,
      private router: Router,
      private clfService: ClfRegisterService,
      private commonMethodsService: CommonMethodsService,
      private principal: Principal,
      private nzCustomAlertService: NzCustomAlertService,
      private datePipe: DatePipe,
      private modal: ModalHelper,
      private cd: ChangeDetectorRef,
  ) {
      this.clfInfos=[];
  }
  ngOnInit() {
      this.principal.identity().then((account) => {
          if(account){
              this.principal.hasAuthority('ROLE_ADMIN').then((result) => {
                  if (result) {
                      this.hasAuthWithAdmin = result;
                  }
              });
          }
      });
      this.chartRequest();
      this.initData(true);
  }
  chartRequest(){
      // 请求日
      this.searchDay=this.eventManager.subscribe('saveDayValue', response => {
          console.log('response',response);
          if(response.name=='saveDayValue'){
              this.clfService.view_day({
                  startTime:response.content.startTime,
                  endTime:response.content.endTime
              })
                  .subscribe(
                      (res: HttpResponse<ClfRegisterModel>) =>{
                          console.log('res.body',res.body);
                          this.trendArr=res.body;
                          this.itemArr['总提交数']=this.trendArr["all"];
                          this.itemArr['待处理数']=this.trendArr["not"];
                          this.itemArr['已处理数']=this.trendArr["already"];
                          this.eventManager.broadcast({
                              name: 'saveDayValue_result',
                              content:this.itemArr,
                          });
                          // 暂时先注释
                          // this.chartService.chartData=res.body;
                      },
                      (res: Response) => this.onError(res.json())
                  );
          }
      } );
      // 请求月
      this.searchMonth=this.eventManager.subscribe('saveMonthValue', response => {
          console.log('response',response);
          if(response.name=='saveMonthValue'){
              this.clfService.view_month({
                  dateTime: response.content,
              }).subscribe(
                  (res: HttpResponse<ClfRegisterModel>) => {
                      this.trendArr=res.body;
                      this.itemArr['总提交数']=this.trendArr["all"];
                      this.itemArr['待处理数']=this.trendArr["not"];
                      this.itemArr['已处理数']=this.trendArr["already"];
                      this.eventManager.broadcast({
                          name: 'saveMonthValue_result',
                          content:this.itemArr,
                      });
                      // 暂时先注释
                      // this.chartService.chartData=res.body;
                  },
                  (res: Response) => this.onError(res.json())
              );
          }
      } );
      // 请求年
      this.searchYear=this.eventManager.subscribe('saveYearValue', response => {
          console.log('response',response);
          if(response.name=='saveYearValue'){
              this.clfService.view_year({
                  dateTime: response.content,
              }).subscribe(
                  (res: HttpResponse<ClfRegisterModel>) => {
                      this.trendArr=res.body;
                      this.itemArr['总提交数']=this.trendArr["all"];
                      this.itemArr['待处理数']=this.trendArr["not"];
                      this.itemArr['已处理数']=this.trendArr["already"];
                      this.eventManager.broadcast({
                          name: 'saveYearValue_result',
                          content:this.itemArr,
                      });
                  },
                  (res: Response) => this.onError(res.json())
              );
          }
      } );
    }
  ngOnDestroy(){
      this.searchDay.unsubscribe();
      this.searchMonth.unsubscribe();
      this.searchYear.unsubscribe();
  }
  ngAfterViewChecked() {
    this.cd.detectChanges();
 }
//数据初始化，排序
    initData(init: boolean = true){
        if(init){
            this.myChoose=0;
            this.problemTypeValue=0;
            this.helpTypeValue=0;
            this.sortArr=null;
            this.isSearch = false;
        //条件查询初始化
            this.dateRange=[];
            this.beginTime='';// 初始化条件查询开始时间
            this.endTime='';// 初始化条件查询结束时间
            this.telephone=null;//默认电话号码 为空
            this.orderId='';//默认订单号 为空
            this.taoBaoId='';//默认淘宝号 为空
            this.checked=[];//初始化存放id数组
        //分页器配置
            this.itemsPerPage = 10;
            this.numberOfElements=0;
        //勾选
            this.isIndeterminate = false;
            this.listOfDisplayData= [];
            this.isAllDisplayDataChecked = false;
            this.mapOfCheckedId= {};
            this.isChosen=false;
            this.checked=[];
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
        this.clfService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(ClfRegisterModel)[]>) => this.onSuccess(res.body),
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
// 查看数据
    viewData(){
        let parentData={
            title:this.title,
            onlyDay:this.onlyDay,
            onlyMonth:this.onlyMonth,
            onlyYear:this.onlyYear,
            onlyFlag:this.onlyFlag,
            isDialog:this.isDialog,
            isTrend:this.isTrend,
        };
        this.modal
            .static(ChartComponent,{parentData:parentData},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
//导出数据
    export(){
        this.modal
            .static(ClfExportComponent)
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    onChange(result: Date): void {
        this.beginTime=this.datePipe.transform(result[0], this.dateFormat);
        this.endTime=this.datePipe.transform(result[1], this.dateFormat);
    }
//编辑
    edit(id) {
        this.modal
            .static(ClfEditComponent,{parentData:{id:id}},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
//删除
    delete(clf){
        let html = `淘宝ID:<span>${clf.taoBaoId}</span><br>订单号:<span>${clf.orderId}`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            if(this.numberOfElements==1){
                this.page = 1;
            }
            this.clfService.delete(clf.id).subscribe((response) => {
                    if(response.status==200){
                        this.nzCustomAlertService.success('删除成功');
                        this.loadAll();
                    }
                });
        });
    }
//查看详情
    showDetail(id){
        this.modal
            .static(ClfDetailComponent,{parentData:{id:id}},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
//单选，全选
    currentPageDataChange($event: ClfRegisterModel[]): void {
        this.listOfDisplayData = $event;
        this.refreshStatus();
    }
    checkAll(value: boolean): void {//全选
        this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
        this.refreshStatus();
    }
    refreshStatus(){//单选
        this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
        this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
        if(this.isAllDisplayDataChecked || this.isIndeterminate){//有选择
            this.checked=[];
            for(let key in this.mapOfCheckedId){
                if(this.mapOfCheckedId[key]){
                    this.checked.push(Number(key));
                }
            }
            this.isChosen=true;
        }
        else{//不选择
            this.checked=[];
            this.isChosen=false;
        }
    }
//批量删除
    batch_delete(){
        let html = '';
        this.checked.forEach((item)=>{
            for (let i = 0; i < this.clfInfos.length; i++) {
                if(this.clfInfos[i].id==item){
                    html += `淘宝ID:<span>${this.clfInfos[i].taoBaoId}</span>&nbsp;&nbsp;&nbsp;订单号:<span>${this.clfInfos[i].orderId}<br>`;
                }
            }
        });
        this.nzCustomAlertService.confirm('确定批量删除以下记录?', html, () => {
            this.clfService.batch_delete(this.checked).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }
//批量编辑
    batch_edit() {
        this.modal
            .static(ClfBatchEditComponent,{parentData:{list:this.checked}},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
//查询
    search(init: boolean = true) {
        if(init){
            this.page=1;
        }
        this.isSearch=true;
        switch (this.myChoose) {
            case  0:this.search_taoBaoId();break;
            case  1:this.search_orderId();break;
            case  2:this.search_telephone();break;
            default:break;
        }
    }
    search_taoBaoId(){
        this.clfService.search({
            taoBaoId: this.taoBaoId,
            problemType: this.problemTypeValue,
            helpType: this.helpTypeValue,
            beginTime: this.beginTime ,
            endTime: this.endTime,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(ClfRegisterModel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_orderId(){
        this.clfService.search({
            orderId: this.orderId,
            problemType: this.problemTypeValue,
            helpType: this.helpTypeValue,
            beginTime: this.beginTime ,
            endTime: this.endTime,
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(ClfRegisterModel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_telephone(){
        const reg=/^1(3|4|5|7|8)\d{9}$/;
        if(!reg.test(String(this.telephone))){//手机号格式
            this.nzCustomAlertService.info( '手机号格式不正确，请重新输入');
        }
        else{
            this.clfService.search({
                telephone:this.telephone,
                problemType: this.problemTypeValue,
                helpType: this.helpTypeValue,
                beginTime: this.beginTime ,
                endTime: this.endTime,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sortArr,
            }).subscribe(
                (res: HttpResponse<(ClfRegisterModel)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }
//请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        this.clfInfos = data.content;
        this.numberOfElements=data.numberOfElements;
        this.clfInfos.forEach((item,i)=>{
            if(this.clfInfos[i].image){
                this.clfInfos[i].imageArr= this.clfInfos[i].image.split(',');
                if(this.clfInfos[i].imageArr.length>5){
                    this.clfInfos[i].imageArr.length=5;
                }
            }
        }
            );
        this.totalItems =data.totalPages * 10;
        this.totalElements = data.totalElements;
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
