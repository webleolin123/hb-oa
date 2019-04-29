import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "@core";
import {Router} from "@angular/router";
import {
    WORKFLOW_HOME_BUSINESS_DETAIL_API,
    WORKFLOW_HOME_GOODS_TREND_DETAIL_API,
    WORKFLOW_HOME_DETAIL_PERSON_DETAIL_API,
} from '../../../../app.constants';

import {HomeInfo} from "../home-model/home.model";
import {HomeSomeListDetailService} from "./home-someList-detail.service";
import { NzCustomAlertService } from '@shared';
@Component({
    selector: 'ngx-home-someList-detail',
    templateUrl: './home-someList-detail.component.html',
    styleUrls: ['./home-someList-detail.less'],
})
export class HomeSomeListDetailComponent implements OnInit, OnDestroy {
  itemsPerPageArr=[5,10,15,20];//弹窗页数选择器可选值
  loading = true;//控制是否loading
  sortArr: any=null;//排序条件数组 字段+正/倒叙
    parentData: any;//父组件传来的数据
    detailList=[];
    totalItems: any;
    itemsPerPage: any;
    totalElements: any;
    page: any;
    //详情变量
    detailTitle:any='';
    isBusiness=false;
    detailType:any;
    detailName:any;
    isShow=false;
    constructor(
        private principal: Principal,
        private homeListDetailService: HomeSomeListDetailService,
        private router: Router,
        private nzCustomAlertService: NzCustomAlertService,
        ) {
        this.itemsPerPage = 5;
        this.page = 1;
    }

    ngOnInit() {
        this.detailType=this.parentData.type;
        this.detailName=this.parentData.name;
        if(this.detailType=='goods'){
            this.isBusiness=false;
            this.detailTitle='商品';
            this.homeListDetailService.resourceUrl=WORKFLOW_HOME_GOODS_TREND_DETAIL_API;
        }
        if(this.detailType=='person'){
            this.isBusiness=false;
            this.detailTitle='人员';
            this.homeListDetailService.resourceUrl=WORKFLOW_HOME_DETAIL_PERSON_DETAIL_API;
        }
        if(this.detailType=='business'){
            this.detailTitle=this.detailName;
            this.isBusiness=true;//不显示具体名称
            this.homeListDetailService.resourceUrl=WORKFLOW_HOME_BUSINESS_DETAIL_API;
        }
        this.loadAll();
    }
    ngOnDestroy() {
    }
    loadAll(reset: boolean = false) {
      if (reset) {
        this.page = 1;
      }
      this.loading = true;
        // 获取当前请求页面所有数据
        this.homeListDetailService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
            month:this.parentData.month,
            id:this.parentData.id,
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
    showDetail(childList){
        if(childList.list.length==0){
          this.nzCustomAlertService.info('暂无数据');
            return;
        }
        childList.isShow=!childList.isShow;
    }
    private onSuccess(data) {
        if(data){
            this.loading = false;
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.detailList = data.content;
            this.detailList.forEach((item,i)=>{
                this.detailList[i].isShow=false;
            });
        }
    }
    private onError(error) {
      console.log('error',error);
      this.nzCustomAlertService.error('哎呀，请求出错啦！')
    }
}
