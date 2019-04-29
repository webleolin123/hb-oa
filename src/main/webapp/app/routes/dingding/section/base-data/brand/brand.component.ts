import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ModalHelper} from "@delon/theme";
import {NzCustomAlertService} from "@shared";
import {BrandService} from "./brand.service";
import {Brand} from "./brand.model";
import {BrandAddComponent} from "./add/brand-add.component";
import {BrandDetailComponent} from "./detail/brand-detail.component";
@Component({
    selector: 'brand',
    templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit, OnDestroy {
    brands: Brand[];
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
        private brandService: BrandService,
        private nzCustomAlertService: NzCustomAlertService,
        private modal: ModalHelper,
    ) {
        this.brands=[];
    }
    ngOnInit() {
        this.initData(true);
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
        this.brandService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(Brand)[]>) => this.onSuccess(res.body),
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
        // this.brandService.search({
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
            .static(BrandAddComponent, {parentData: {id: null}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    edit(id) {
        this.modal
            .static(BrandAddComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    // 查看商品
    check(id) {
        this.modal
            .static(BrandDetailComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    delete(brand) {
        let html = `品牌名称:<span>${brand.brandName}</span>`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            if(this.numberOfElements==1){
                this.page = 1;
            }
            this.brandService.delete(brand.id).subscribe((response) => {
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
            this.brands = data.content;
            this.numberOfElements=data.numberOfElements;
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
