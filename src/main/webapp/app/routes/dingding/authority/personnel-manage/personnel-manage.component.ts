import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {
    CommonMethodsService,
    Department,
    DepartmentService,
    DepartmentUser,
    NzCustomAlertService, SEARCH_CONTENT, SEARCH_TYPE,
} from "@shared";
import {STColumn, XlsxService} from '@delon/abc';
import {Personnel} from './personnel-manage.model';
import {PersonnelManageService} from './personnel-manage.service';
import {PersonnelManageAddRemoveRoleComponent, PersonnelManageDetailComponent} from "..";
import {ModalHelper} from "@delon/theme";
import {CacheService} from "@delon/cache";
@Component({
  selector: 'personnel-manage',
  templateUrl: './personnel-manage.component.html',
})
export class PersonnelManageComponent implements OnInit {
    personnels: Personnel[];
    loading:boolean;//控制是否loading

    sortArr:string[];//排序条件数组 字段+正/倒叙
    itemsPerPage: any;//每页显示记录数
    totalElements: any;//每页显示记录数
    page: any;//当前页
    totalItems: any;//总页数
    numberOfElements:number;//当前存在记录数
    //搜索相关
    isSearch: boolean;//标志 是否触发搜索
    applyType=['姓名','手机号','部门','角色'];
    searchItem_applyType:number;
    searchContent:string;

    //标志
    isAdd:boolean;
//导出相关
    exportDatas: Department[]; // 导出excell的数据变量
    array: any;  // 数组容器
    data: any; // 对象容器
    exportUserArray: Department[];  // 数组容器
    countx: any = 0;
    county: any = 0;
    countm: any = 0;
    countn: any = 0;
    constructor(
        private personnelManageService: PersonnelManageService,
        private departmentService: DepartmentService,
        private commonMethodsService: CommonMethodsService,
        private nzCustomAlertService: NzCustomAlertService,
        private xlsx: XlsxService,
        private modal: ModalHelper,
        private cache: CacheService,
    ) {
        this.array = [];
    }
    columns: STColumn[] = [
        {title: '部门ID', index: 'num1'},
        {title: '部门名称', index: 'num2'},
        {title: '成员ID', index: 'num3'},
        {title: '成员姓名', index: 'num4'},
    ];
    ngOnInit() {
        this.searchItem_applyType=this.cache.getNone(SEARCH_TYPE);
        if(this.searchItem_applyType>0){
           this.routerData();
            this.cache.set(SEARCH_TYPE,0);
            this.cache.set(SEARCH_CONTENT,'');
        }
        else{
            this.initData(true);
        }
    }
    routerData(){
        this.sortArr = null;
        //条件查询初始化
        this.searchContent =this.cache.getNone(SEARCH_CONTENT);
        this.isSearch=true;//查询状态
        //分页器配置
        this.itemsPerPage = 10;
        this.numberOfElements = 0;
        //是否添加
        this.isAdd=true;
        this.page = 1;
        this.loadAll();
    }
    initData(init: boolean = true){
        if (init) {
            this.sortArr = null;
            //条件查询初始化
            this.searchItem_applyType=0;
            this.searchContent='';
            this.isSearch = false;
            //分页器配置
            this.itemsPerPage = 10;
            this.numberOfElements = 0;
            //是否添加
            this.isAdd=true;
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
        this.personnelManageService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(Personnel)[]>) => this.onSuccess(res.body),
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

    change(){
        this.searchContent='';
    }

    //查询
    search(init: boolean = true) {
        if(init){
            this.page=1;
        }
        this.isSearch=true;
        switch (this.searchItem_applyType){
            case 0:this.search_name();break;
            case 1:this.search_mobile();break;
            case 2:this.search_department();break;
            case 3:this.search_roles();break;
            default:break;
        }
    }

    search_name(){
        this.personnelManageService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            name:this.commonMethodsService.myTrim('besides',this.searchContent),
        }).subscribe
        (
            (res: HttpResponse<(Personnel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_mobile(){
        this.personnelManageService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            mobile:this.commonMethodsService.myTrim('besides',this.searchContent),
        }).subscribe
        (
            (res: HttpResponse<(Personnel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_department(){
        this.personnelManageService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            department:this.commonMethodsService.myTrim('besides',this.searchContent),
        }).subscribe
        (
            (res: HttpResponse<(Personnel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    search_roles(){
        this.personnelManageService.search({
            page: this.page - 1,
            size: this.itemsPerPage,
            roles:this.commonMethodsService.myTrim('besides',this.searchContent),
        }).subscribe
        (
            (res: HttpResponse<(Personnel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }

    addRole(userId,isAdd){
        this.modal
            .static(PersonnelManageAddRemoveRoleComponent, {parentData: {dingId: userId,isAdd:isAdd}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
        });
    }
    showDetail(id){
        this.modal
            .static(PersonnelManageDetailComponent, {parentData: {id:id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    download() {//导出
        this.departmentService.query({size: 9999}).subscribe(
            (res: HttpResponse<Department[]>) => this.onQueryExportDataSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );
    }
    onQueryExportDataSuccess(department: Department[]) {
        this.nzCustomAlertService.info('正在导出....');
        this.exportDatas = department;
        this.exportUserArray = [];
        this.countx = 0;
        this.county = 1;
        this.countn = 0;
        this.countm = 0;
        department.forEach((rootDept: Department, index) => {
            if (rootDept.parentid == 1) { // 一级部门
                this.departmentService.queryDepartmentUser({
                    departmentId: rootDept.id,
                    size: 100
                }).subscribe(
                    (res: HttpResponse<DepartmentUser[]>) => {
                        if (res.body.length != 0) { // 一级部门取user不为空
                            const users = res.body;
                            rootDept.users = [];
                            rootDept.users = rootDept.users.concat(users);
                        }
                    },
                    (err: HttpResponse<any>)=>{
                        this.nzCustomAlertService.error('导出异常,请联系系统管理员');
                        console.log('err',err);
                    });
                this.exportUserArray.push(rootDept);
                this.countx = this.countx + 1;
            }
        });
        this.pushChild(this.exportUserArray);
    }

    pushChild(parents: Department[]) {
        parents.forEach((parent, index) => {
            parent.children = [];
            this.exportDatas.forEach((child: Department) => {
                if (child.parentid == parent.id) {
                    this.countm = this.countm + 1;
                    this.departmentService.queryDepartmentUser({
                        departmentId: child.id,
                        size: 100
                    }).subscribe((res: HttpResponse<DepartmentUser[]>) => {
                            if (res.body.length != 0) { // 一级部门取user不为空
                                const users = res.body;
                                child.users = [];
                                child.users = child.users.concat(users);
                            }
                            this.countn = this.countn + 1;
                            if (this.countm == this.countn) {
                                this.exportUsers(this.exportUserArray, null);
                                const data = [this.columns.map(i => i.title)];
                                if (this.array) {
                                    this.array.forEach(i =>
                                        data.push(this.columns.map(c => i[c.index as string])),
                                    );
                                }
                                this.xlsx.export({
                                    sheets: [
                                        {
                                            data: data,
                                            name: 'sheet name',
                                        },
                                    ],
                                    filename: '组织架构信息.xlsx',
                                    callback: () => {
                                        setTimeout(() => {
                                            this.nzCustomAlertService.success('导出成功');
                                        }, 1000);
                                    },
                                });
                                this.array = [];
                            }
                        },
                        (err: HttpResponse<any>)=>{
                            this.nzCustomAlertService.error('导出异常,请联系系统管理员');
                            console.log('err',err);
                        });
                    parent.children.push(child);
                    this.countx = this.countx + 1;
                }
            });
            if (this.countx < this.exportDatas.length && parent.children != null && parent.children.length > 0) {
                this.pushChild(parent.children);
                this.county = this.county + 1;
            }
        });
    }

    exportUsers(exportUserArray, parentName) {
        console.log(this.county);
        console.log(this.exportUserArray);
        exportUserArray.forEach((one) => {
            this.buildUser(one, parentName, one.users);
            if (one.children != null && one.children.length > 0) {
                this.exportUsers(one.children, parentName != null ? parentName + '|' + one.name : one.name);
            }
        });

    }

    buildUser(one, parentName, users) {
        if (users != null && users.length > 0) {
            users.forEach((user) => {
                this.data = {
                    num1: one.id + '\t',
                    num2: parentName != null ? parentName + '|' + one.name : one.name,
                    num3: user.userid + '\t',
                    num4: user.name,
                };
                this.array.push(this.data);
            });
        }
    }

    //请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        if(data){
            this.totalItems = data.totalPages * 10;
            this.totalElements = data.totalElements;
            this.personnels = data.content;
            this.numberOfElements=data.numberOfElements;
        }
    }

    private onError(error) {
        console.log('error', error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
