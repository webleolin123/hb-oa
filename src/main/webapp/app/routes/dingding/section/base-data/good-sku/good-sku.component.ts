import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ModalHelper} from "@delon/theme";
import {NzCustomAlertService} from "@shared";

import {GoodSkuService} from "./good-sku.service";
import {GoodSku} from "./good-sku.model";
import {BrandService} from "../brand/brand.service";
import {ShopService} from "../shop/shop.service";
import {GoodService} from '../good/good.service';
import {Shop} from "../shop/shop.model";
import {Brand} from "../brand/brand.model";
import {Good} from "../good/good.model";
import {GoodSkuAddComponent} from "./add/good-sku-add.component";
import {GoodSkuDetailComponent} from "..";
@Component({
    selector: 'good-sku',
    templateUrl: './good-sku.component.html',
})
export class GoodSkuComponent implements OnInit, OnDestroy {
    goodSkus: GoodSku[];
    brands: Brand[];
    shops: Shop[];
    goods: Good[];

    loading:boolean;//控制是否loading
    sortArr:string[];//排序条件数组 字段+正/倒叙
    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    totalItems:any;//总页数
    totalElements:any;//总页数
    numberOfElements:number;//当前存在记录数

    isSearch:boolean;//标志 是否触发搜索
    searchItem:string;//搜索内容

    constructor(
        private goodSkuService: GoodSkuService,
        private brandService: BrandService,
        private shopService: ShopService,
        private goodService: GoodService,
        private nzCustomAlertService: NzCustomAlertService,
        private modal: ModalHelper,
    ) {
        this.goodSkus=[];
    }

    ngOnInit() {
        this.initData();
    }

    ngOnDestroy() {
    }

    //数据初始化，排序
    initData(init: boolean = true){
        if(init){
            this.sortArr=null;
            this.isSearch = false;
            //条件查询初始化
            this.searchItem='';
            //分页器配置
            this.itemsPerPage = 10;
            this.numberOfElements=0;
        }
        this.page = 1;
        this.loading=true;
        this.loadAll();
    }
    loadAll() {
        if (!this.isSearch) {
            this.sendHttp();
        }
        else {
            this.search();
        }
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        this.goodSkuService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(GoodSku)[]>) => this.onSuccess(res.body),
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
    search() {//查询接口 未有接口
        // this.isSearch=true;
        // this.goodSkuService.search({
        //     searchItem: this.searchItem,
        //     page: this.page - 1,
        //     size: this.itemsPerPage,
        //     sort: this.sortArr,
        // }).subscribe(
        //     (res: HttpResponse<(Platform)[]>) => this.onSuccess(res.body),
        //     (res: Response) => this.onError(res.json())
        // );
    }

    add() {
        this.modal
            .static(GoodSkuAddComponent, {parentData: {id: null}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
        });
    }

    edit(id) {
        this.modal
            .static(GoodSkuAddComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }

    check(id) {
        this.modal
            .static(GoodSkuDetailComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
        });
    }

    delete(goodSku) {
        let html = `id:<span>${goodSku.id}</span>`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            if(this.numberOfElements==1){
                this.page = 1;
            }
            this.goodSkuService.delete(goodSku.id).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }
    //请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.goodSkus = data.content;
            this.numberOfElements=data.numberOfElements;
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
