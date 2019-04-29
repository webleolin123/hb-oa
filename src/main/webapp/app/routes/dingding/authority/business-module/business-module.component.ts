import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ModalHelper} from "@delon/theme";
import {
    CommonMethodsService,
    DepartmentService,
    NzCustomAlertService
} from "@shared";
import {BusinessModule} from './business-module.model';
import {BusinessModuleService} from './business-module.service';
import {BusinessModuleChooseModuleComponent} from "./choose/business-module-choose-module.component";
import {BusinessModuleDetailComponent} from "./detail/business-module-detail.component";
import {BusinessModuleAddComponent} from "./add/business-module-add.component";
@Component({
    selector: 'business-module',
    templateUrl: './business-module.component.html',
})
export class BusinessModuleComponent implements OnInit {
    childModuleIds: string;

    businessModules: BusinessModule[];
    firstModules: BusinessModule[];
    secondModules: BusinessModule[];
    loading:boolean;//控制是否loading

    //搜索相关
    isSearch: boolean;//标志 是否触发搜索
    moduleLevel: number;
    applyType=['父模块','一级模块','二级模块'];
    searchContent:string;
    constructor(
        private businessModuleService: BusinessModuleService,
        private departmentService: DepartmentService,
        private commonMethodsService: CommonMethodsService,
        private nzCustomAlertService: NzCustomAlertService,
        private modal: ModalHelper,
    ) {
        this.businessModules=[];
        this.firstModules=[];
        this.secondModules=[];
    }

    ngOnInit() {
        this.initData(true);
    }
    initData(init: boolean = true){
        if (init) {
            //条件查询初始化
            this.searchContent='';
            this.isSearch = false;
            //分模块
            this.moduleLevel=0;
        }
        this.loadAll();
    }
    loadAll() {
        this.loading=true;
        if (!this.isSearch) {
            this.sendHttp();
        }
        else {
            this.search();
        }
    }
    sendHttp(){
        // 获取当前请求页面所有数据
        this.businessModuleService.getParentOrChildModules({
            level: 0
        }).subscribe(
            (res: HttpResponse<(BusinessModule)[]>) => this.onSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );

        this.businessModuleService.getParentOrChildModules({
            level: 1
        }).subscribe(
            (res: HttpResponse<(BusinessModule)[]>) => this.onQueryFirstModulesSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );

        this.businessModuleService.getParentOrChildModules({
            level: 2
        }).subscribe(
            (res: HttpResponse<(BusinessModule)[]>) => this.onQuerySecondModulesSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );
    }
    private onQuerySecondModulesSuccess(data) {
        this.secondModules = data;
    }

    private onQueryFirstModulesSuccess(data) {
        this.firstModules = data;
    }

    change(moduleLevel){
        this.searchContent='';
        console.log('moduleLevel',moduleLevel);
    }
    //查询
    search() {
        this.isSearch=true;
        this.nzCustomAlertService.info('接口开发中...')
        // switch (this.searchItem_applyType){
        //     case 0:this.search_name();break;
        //     case 1:this.search_mobile();break;
        //     case 2:this.search_department();break;
        //     case 3:this.search_roles();break;
        //     default:break;
        // }
    }

    //添加
    add() {
        this.modal
            .static(BusinessModuleAddComponent, {parentData: {id: null}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    //编辑
    edit(id) {
        this.modal
            .static(BusinessModuleAddComponent,{parentData: {id: id}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.loadAll();
            });
    }
    // 查看
    check(id) {
        this.modal
            .static(BusinessModuleDetailComponent, {parentData:{id:id}})
            .subscribe((res) => {//回调函数 重新请求新数据
                console.log('res_edit传回来的',res);
                // this.loadAll();
                if(res===1){
                    this.edit(id);
                }
                else{
                    this.loadAll();
                }
            });
    }


    deleteParentModule(module) {
        let html = `id:<span>${module.id}</span>`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            this.businessModuleService.delete(module.id).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }

    delete(secondModule){
        let html = `id:<span>${secondModule.id}</span>`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            this.businessModuleService.delete(secondModule.id).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }

    addFirstModules(id) {
        this.businessModuleService.level = 1;
        this.modal
            .static(BusinessModuleChooseModuleComponent)
            .subscribe(() => {//回调函数 重新请求新数据
                this.childModuleIds = this.businessModuleService.childModuleIds;
                if (this.childModuleIds!=='') {
                    this.addParentRelationship(id);
                }
        });
    }

    // 添加二级模块
    addSecondModules(id) {
        this.businessModuleService.level = 2;
        this.modal
            .static(BusinessModuleChooseModuleComponent)
            .subscribe(() => {//回调函数 重新请求新数据
                this.childModuleIds = this.businessModuleService.childModuleIds;
                if (this.childModuleIds!=='') {
                    this.addParentRelationship(id);
                }
        });
    }

    addParentRelationship(id) {
        this.businessModuleService.addParentRelationship(id, this.childModuleIds).subscribe((res) => {
            if (res.ok === true) {
                this.nzCustomAlertService.success( '添加成功');
                this.loadAll();
            }
        }, (err) => {
            console.log('err',err);
            this.nzCustomAlertService.success( '哎呀，出错啦！');
        });
    }

    // 删除一级模块
    deleteFirstModules(parentId, childId) {
        let html = `父模块id:<span>${parentId}</span><br>
                    一级模块id:<span>${childId}</span>`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            this.businessModuleService.removeParentRelationship(parentId, childId).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }

    deleteFirstModule(id){
        let html = `模块id:<span>${id}</span>`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            this.businessModuleService.delete(id).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.loadAll();
                }
            });
        });
    }

    // 删除二级模块
    deleteSecondModules(parent: BusinessModule) {
        const childModuleIdsArray = [];
        parent.childModules.forEach((m) => {
            if (m.isSelected == true) {
                childModuleIdsArray.push(m.id)
            }
        });
        if(childModuleIdsArray.length==0){
            this.nzCustomAlertService.info('请勾选要删除的二级模块')
        }
        else{
            let html = `父模块id:<span>${parent.id}</span>`;
            this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
                this.businessModuleService.removeParentRelationship(parent.id, childModuleIdsArray.toString()).subscribe((response) => {
                    if(response.status==200){
                        this.nzCustomAlertService.success('删除成功');
                        this.loadAll();
                    }
                });
            });
        }
    }

    // 勾选子模块
    selectChild(parentId, childModule: BusinessModule) {

    }

    //请求成功，失败处理
    private onSuccess(data) {
        this.loading = false;
        if(data){
            // this.totalItems = data.totalPages * 10;
            // this.totalElements = data.totalElements;
            // this.businessModules = data.content;
            // this.numberOfElements=data.numberOfElements;
            //不含content
            this.businessModules = data;
        }
    }

    private onError(error) {
        console.log('error', error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }

}
