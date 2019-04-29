import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ModalHelper} from "@delon/theme";
import {NzCustomAlertService} from "@shared";
import {PlatformService} from "./platform.service";
import {Platform} from "./platform.model";
import {PlatformAddComponent} from "./add/platform-add.component";
import {PlatformDetailComponent} from "./detail/platform-detail.component";
@Component({
    selector: 'platform',
    templateUrl: './platform.component.html',
})
export class PlatformComponent implements OnInit, OnDestroy {
    loading:boolean;//控制是否loading

    sortArr:string[];//排序条件数组 字段+正/倒叙

    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    totalItems:any;//总页数
    totalElements:any;//总页数
    numberOfElements:number;//当前存在记录数

    platforms: Platform[];

    isSearch:boolean;//标志 是否触发搜索
    searchItem:string;//搜索内容

    constructor(
        private platformService: PlatformService,
        private nzCustomAlertService: NzCustomAlertService,
        private modal: ModalHelper,

    ) {
        this.platforms=[];
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
        this.platformService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(Platform)[]>) => this.onSuccess(res.body),
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
        // this.platformService.search({
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
            .static(PlatformAddComponent, {parentData: {id: null}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    // 编辑
    edit(id) {
        this.modal
            .static(PlatformAddComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    // 查看详情
    check(id) {
        this.modal
            .static(PlatformDetailComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    delete(platform) {
        let html = `平台名称:<span>${platform.platformName}</span><br>商品Url前缀:<br><span>${platform.preLink}`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            if(this.numberOfElements==1){
                this.page = 1;
            }
            this.platformService.delete(platform.id).subscribe((response) => {
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
            this.platforms = data.content;
            this.numberOfElements=data.numberOfElements;
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }

}
