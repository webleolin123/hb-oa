import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ModalHelper} from "@delon/theme";
import {
    CommonMethodsService,
    NzCustomAlertService,
} from "@shared";
import {AliSms} from './ali-sms.model';
import {AliSmsService} from './ali-sms.service';
import {AliSmsDetailComponent} from "./detail/ali-sms-detail.component";
@Component({
    selector: 'ali-sms',
    templateUrl: './ali-sms.component.html',
})
export class AliSmsComponent implements OnInit {
    alis: AliSms[];
    loading:boolean;//控制是否loading

    sortArr:string[];//排序条件数组 字段+正/倒叙

    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    totalItems:any;//总页数
    totalElements:any;//总页数
    numberOfElements:number;//当前存在记录数

    isSearch:boolean;//标志 是否触发搜索
    //搜索相关
    searchItem:string;//搜索内容


    constructor(
        private aliSmsService: AliSmsService,
        private commonMethodsService: CommonMethodsService,
        private nzCustomAlertService: NzCustomAlertService,
        private modal: ModalHelper,
    ) {
        this.alis=[];
    }
    ngOnInit() {
        this.initData(true);
    }
    initData(init: boolean = true) {
        if (init) {
            this.sortArr = null;
            this.isSearch = false;
            //条件查询初始化
            this.searchItem = '';
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
        this.aliSmsService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(AliSms)[]>) => this.onSuccess(res.body),
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
        // this.messageService.search({
        //     roleName: this.commonMethodsService.myTrim('besides',this.searchItem),
        //     page: this.page - 1,
        //     size: this.itemsPerPage,
        //     sort: this.sortArr,
        // }).subscribe(
        //     (res: HttpResponse<(Message)[]>) => this.onSuccess(res.body),
        //     (res: Response) => this.onError(res.json())
        // );
    }

    delete(ali){
        let html = `id:<span>${ali.id}</span>`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            if(this.numberOfElements==1){
                this.page = 1;
            }
            this.aliSmsService.delete(ali.id).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }

    check(id){
        this.modal
            .static(AliSmsDetailComponent, {parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
        });
    }


    //请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        if(data){
            //含content
            // this.totalItems = data.totalPages * 10;
            // this.totalElements = data.totalElements;
            // this.alis = data.content;
            // this.numberOfElements=data.numberOfElements;
            //不含content
            this.alis = data;
            this.totalElements = data.length;
            this.numberOfElements=this.totalElements>this.itemsPerPage?this.itemsPerPage:this.totalElements ;
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
