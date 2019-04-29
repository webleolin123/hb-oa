import {Component, OnDestroy, OnInit,ChangeDetectorRef,AfterViewChecked,ViewChild,ElementRef} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Principal} from "@core";
import {JhiEventManager} from "ng-jhipster";
import {AppraiseService} from "./appraise.service";
import {Appraise} from "./appraise.model";
import {Router} from "@angular/router";
import {NzCustomAlertService,} from "@shared";
import {XlsxService} from '@delon/abc';
import {ModalHelper} from "@delon/theme";
import {AppraiseEditComponent} from "./appraise-edit/appraise-edit.component";
import {AppraiseDetailComponent} from "./appraise-detail/appraise-detail.component";
import {AppraiseBatchModifyComponent} from "./appraise-batch-modify/appraise-batch-modify.component";
import {AppraiseFilterComponent} from "./appraise-filter/appraise-filter.component";
import {AppraiseUploadComponent} from "./appraise-upload/appraise-upload.component";
@Component({
    selector: 'ngx-appraise',
    templateUrl: './appraise.component.html',
    styleUrls: ['./appraise.less'],
})
export class AppraiseComponent implements OnInit, OnDestroy,AfterViewChecked {
    @ViewChild('importInput') importInput: ElementRef;
    chooseItem:string[]=['淘宝ID','商品ID','订单号','标签','评论内容','商品名称'];
    // 条件查询参数
    myChoose:number;
    customerId:string;//淘宝ID
    goodsId:string;//商品ID
    goodsName:string;//商品名称
    orderCode: any;//订单号
    isSearch:boolean;
    label:any;//标签
    appraiseContents:string;//评论内容
    // 批量编辑
    checked:number[];//存放已勾选的记录id
    isChosen:boolean;//是否勾选 然后控制是否显示批量编辑按钮
    hasAuthWithAdmin:boolean;//标志是否拥有管理者权限

    isIndeterminate:boolean;//checkbox indeterminate （不确定）状态
    listOfDisplayData: Appraise[];//clfInfo备份数据
    isAllDisplayDataChecked = false;//全选checkbox状态
    mapOfCheckedId: { [key: string]: boolean };//保存当前操作的记录id及勾选状态 比如 52(id)：true(checked状态);

    loading:boolean;//控制是否loading
    sortArr:string[];//排序条件数组 字段+正/倒叙
    itemsPerPage: any;//每页显示记录数
    page: any;//当前页
    totalItems:any;//总页数
    totalElements:any;//总页数
    numberOfElements:number;//当前存在记录数

    appraises: Appraise[];
    constructor(private principal: Principal,
                private eventManager: JhiEventManager,
                private appraiseService: AppraiseService,
                private router: Router,
                private nzCustomAlertService: NzCustomAlertService,
                private modal: ModalHelper,
                private cd: ChangeDetectorRef,
                private xlsx: XlsxService,
    ) {
        this.appraises=[];
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
        this.initData(true);
    }
    ngAfterViewChecked() {
        this.cd.detectChanges();
    }
    ngOnDestroy() {
    }
//数据初始化，排序
    initData(init: boolean = true){
        if(init){
            this.myChoose=0;
            this.sortArr=null;
            this.isSearch = false;
            //条件查询初始化
            this.customerId='';//淘宝ID
            this.goodsId='';//商品ID
            this.goodsName='';//商品名称
            this.orderCode='';//订单号
            this.label='';//标签
            this.appraiseContents='';//评论内容
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
        this.appraiseService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
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
    change(e: Event) {
        // const node = e.target as HTMLInputElement;
        // this.xlsx.import(node.files[0]).then(res => {
        //     // this.cache.set(ATTENDANCE_RESULT,res);
        //     this.router.navigate(['/dingding/section/attendance/attendance-table']);
        // });
        // node.value = '';
    }
//查询
    search_customerId(){
        if(!this.customerId){
            this.nzCustomAlertService.info('请输入淘宝ID');
        }
        else{
            this.appraiseService.findAllByCustomId({
                customerId: this.customerId,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sortArr,
            }).subscribe(
                (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }
    search_goodsId(){
        if(!this.goodsId){
            this.nzCustomAlertService.info('请输入商品ID');
        }
        else{
            this.appraiseService.findAllByGoodsId({
                goodsId: this.goodsId,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sortArr,
            }).subscribe(
                (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }
    search_orderCode(){
        if(!this.orderCode){
            this.nzCustomAlertService.info('请输入订单号');
        }
        else{
            this.appraiseService.findAllByOrderCode({
                orderCode: this.orderCode,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sortArr,
            }).subscribe(
                (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }
    search_label(){
        if(!this.label){
            this.nzCustomAlertService.info('请输入标签');
        }
        else{
            this.appraiseService.findAllByLabels({
                labels: this.label,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sortArr,
            }).subscribe(
                (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }
    search_appraiseContents(){
        if(!this.appraiseContents){
            this.nzCustomAlertService.info('请输入评价内容');
        }
        else{
            this.appraiseService.findAllByContent({
                content: this.appraiseContents,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sortArr,
            }).subscribe(
                (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }
    search_goodsName(){
        if(!this.goodsName){
            this.nzCustomAlertService.info('请输入商品名称');
        }
        else{
            this.appraiseService.findAllByStoreName({
                storeName: this.goodsName,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sortArr,
            }).subscribe(
                (res: HttpResponse<(Appraise)[]>) => this.onSuccess(res.body),
                (res: Response) => this.onError(res.json())
            );
        }
    }
    search(init: boolean = true) {
        if(init){
            this.page=1;
        }
        this.isSearch=true;
        switch (this.myChoose) {
            case  0:this.search_customerId();break;
            case  1:this.search_goodsId();break;
            case  2:this.search_orderCode();break;
            case  3:this.search_label();break;
            case  4:this.search_appraiseContents();break;
            case  5:this.search_goodsName();break;
            default:break;
        }
    }
// 批量操作
    batch_edit(){
        this.modal
            .static(AppraiseBatchModifyComponent,{parentData:{list:this.checked.join(',')}},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    batch_delete(){
        let html = '';
        this.checked.forEach((item)=>{
            for (let i = 0; i < this.appraises.length; i++) {
                if(this.appraises[i].id==item){
                    html += `淘宝ID:<span>${this.appraises[i].customerId}</span>&nbsp;&nbsp;&nbsp;订单号:<span>${this.appraises[i].orderCode}<br>`;
                }
            }
        });
        this.nzCustomAlertService.confirm('确定批量删除以下记录?', html, () => {
            this.appraiseService.batchDelete(this.checked.join(',')).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }
//编辑
    edit(id) {
        this.modal
            .static(AppraiseEditComponent,{parentData:{id:id}},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
// 查看
    check(id) {
        this.modal
            .static(AppraiseDetailComponent,{parentData:{id:id}},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
//导出数据
    export(){
        this.modal
            .static(AppraiseFilterComponent)
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
//上传文件
    upload(){
        this.modal
            .static(AppraiseUploadComponent)
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
//删除
    delete(appraise) {
        let html = `
                 淘宝ID:<span>${appraise.customerId}</span><br>
                  商品ID:<span>${appraise.goodsId}</span><br>
                  订单号:<span>${appraise.orderCode}</span>
        `;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            if(this.numberOfElements==1){
                this.page = 1;
            }
            this.appraiseService.delete(appraise.id).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }
//单选，全选
    currentPageDataChange($event: Appraise[]): void {
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
//请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        this.totalItems = data.totalPages * 10;
        this.totalElements = data.totalElements;
        this.appraises = data.content;
        this.numberOfElements=data.numberOfElements;
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
