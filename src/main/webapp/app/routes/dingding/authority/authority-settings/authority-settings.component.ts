import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ModalHelper} from "@delon/theme";
import {
    NzCustomAlertService,
    CommonMethodsService,
} from "@shared";
import {BusinessModuleService} from '../business-module/business-module.service';
import {BusinessModule} from '../business-module/business-module.model';
import {AuthoritySettings} from './authority-settings.model';
import {AuthoritySettingsService} from './authority-settings.service';
import {AuthoritySettingsAddComponent} from "./add/authority-settings-add.component";
import {AuthoritySettingsDetailComponent} from "./detail/authority-settings-detail.component";
@Component({
    selector: 'authority-settings',
    templateUrl: './authority-settings.component.html',
    styleUrls:['./authority-settings.less'],
})
export class AuthoritySettingsComponent implements OnInit {
    widthConfig=['200px','200px','200px','200px','200px','200px','250px'];
    modules: BusinessModule[];
    rolesFomal: AuthoritySettings[];
    rolesTest:AuthoritySettings[];
    loading:boolean;//控制是否loading

    selectedIndex:number;
    //搜索相关
    businessModuleId:number=null;
    businessModuleName:string='';
    constructor(
        private businessModuleService: BusinessModuleService,
        private authoritySettingsService: AuthoritySettingsService,
        private nzCustomAlertService: NzCustomAlertService,
        private commonMethodsService: CommonMethodsService,
        private modal: ModalHelper,
    ) {}

    ngOnInit() {
        this.initData(true);
    }
    initData(init: boolean = true){//重置及pageSizeChange
        if(init){
            this.selectedIndex=0;
            this.modules=[];
            this.rolesFomal=[];
            this.rolesTest=[];
        }
        this.getModules(2);
    }
    getModules(level:number){
        this.businessModuleService.getParentOrChildModules({level: level}).subscribe(
            (res: HttpResponse<BusinessModule[]>) => this.onGetModulesSuccess(res.body),
            (res: HttpResponse<(any)>) => this.onError(res)
        );
    }
    onGetModulesSuccess(data){
        if(data){
            this.modules = data;
            this.businessModuleId=this.modules[0].id;
            this.getPermissionsByModuleId(this.businessModuleId);
        }
    }
    getPermissionsByModuleId(id){
        this.loading=true;
        this.authoritySettingsService.getPermissionsByModuleId({
            moduleId: id
        }).subscribe(
            (res: HttpResponse<(AuthoritySettings)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onError(res.json())
        );
    }
    //查询
    search() {
        // this.getPermissionsByModuleId(this.businessModuleId);
    }

    selectChange(businessModuleId){
        console.log('businessModuleId',businessModuleId);
        this.businessModuleId=businessModuleId;
        this.modules.forEach((module,i)=>{
            if(module.id===businessModuleId){
                this.selectedIndex=i;
                this.businessModuleName=module.businessName;
            }
        });
        this.getPermissionsByModuleId(this.businessModuleId);
    }

    tabClick(module: BusinessModule): void {
        this.businessModuleId=module.id;
        this.businessModuleName=module.businessName;
        this.getPermissionsByModuleId(this.businessModuleId);
    }

    //添加
    add(modules:BusinessModule[]) {
        this.modal
            .static(AuthoritySettingsAddComponent, {parentData: {authority:null,modules: modules}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.getPermissionsByModuleId(this.businessModuleId);//可以用刚创建的moduleId
        });
    }
    //编辑
    edit(authority,modules:BusinessModule[]) {
        this.modal
            .static(AuthoritySettingsAddComponent,{parentData:{authority:authority,modules:modules}},'lg')
            .subscribe(() => {//回调函数 重新请求新数据
                this.getPermissionsByModuleId(this.businessModuleId);
            });
    }
    // 查看
    check(authority,businessModuleName) {
        this.modal
            .static(AuthoritySettingsDetailComponent, {parentData:{authority:authority,businessModuleName:businessModuleName}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.getPermissionsByModuleId(this.businessModuleId);
        });
    }

    //删除
    delete(authority){
        let html = `${authority.roleId==2?'正式':'测试'}id:<span>${authority.id}</span>`;
        this.nzCustomAlertService.confirm('确定删除该条记录?', html, () => {
            this.authoritySettingsService.delete(authority.id).subscribe((response) => {
                if(response.status==200){
                    this.nzCustomAlertService.success('删除成功');
                    this.getPermissionsByModuleId(this.businessModuleId);
                }
            });
        });
    }

    //请求成功，失败处理
    private onSuccess(data:AuthoritySettings[]) {
        if(data){
            this.rolesTest=[];
            this.rolesFomal=[];
            data.forEach((authority,i)=>{
                if(authority.roleId==1){
                    this.rolesTest.push(authority);
                }
                if(authority.roleId==2){
                    this.rolesFomal.push(authority);
                }
            });
            this.loading = false;
        }
    }
    private onError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！');
    }
}
