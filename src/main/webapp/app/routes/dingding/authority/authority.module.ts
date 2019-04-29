import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from '@shared';
import {
    AuthorityComponent,
    AuthoritySettingsComponent,
    AuthoritySettingsAddComponent,
    AuthoritySettingsDetailComponent,
    AuthoritySettingsService,
    BusinessModuleComponent,
    BusinessModuleService,
    BusinessModuleChooseModuleComponent,
    BusinessModuleDetailComponent,
    BusinessModuleAddComponent,
    DepartmentManageComponent,
    DepartmentManageService,
    PersonnelManageComponent,
    PersonnelManageService,
    PersonnelManageAddRemoveRoleComponent,
    PersonnelManageDetailComponent,
    RolesManageComponent,
    RolesManageService,
    RolesManageAddRoleComponent,
} from './';
const MODULE_COMPONENTS = [
    AuthorityComponent,
    AuthoritySettingsComponent,
    AuthoritySettingsAddComponent,
    AuthoritySettingsDetailComponent,
    BusinessModuleComponent,
    BusinessModuleChooseModuleComponent,
    BusinessModuleDetailComponent,
    BusinessModuleAddComponent,
    DepartmentManageComponent,
    PersonnelManageComponent,
    PersonnelManageAddRemoveRoleComponent,
    PersonnelManageDetailComponent,
    RolesManageComponent,
    RolesManageAddRoleComponent,
];
const MODULE_SERVICES=[
    RolesManageService,
    PersonnelManageService,
    DepartmentManageService,
    BusinessModuleService,
    AuthoritySettingsService,
];
const COMPONENTS_NOROUNT=[
    BusinessModuleChooseModuleComponent,
    BusinessModuleDetailComponent,
    BusinessModuleAddComponent,
    RolesManageAddRoleComponent,
    PersonnelManageAddRemoveRoleComponent,
    PersonnelManageDetailComponent,
    AuthoritySettingsAddComponent,
    AuthoritySettingsDetailComponent,
];
const routes: Routes = [
    {
        path: '',
        component: AuthorityComponent,
        children:[
            {
                path: 'authority-settings',
                component: AuthoritySettingsComponent,
                data: {titleI18n: '权限设置'},
            },
            {
                path: 'business-module',
                component: BusinessModuleComponent,
                data: {titleI18n: '模块管理'},
            },
            {
                path: 'department-manage',
                component: DepartmentManageComponent,
                data: {titleI18n: '部门管理'},
            },
            {
                path: 'personnel-manage',
                component: PersonnelManageComponent,
                data: {titleI18n: '人员管理'},
            },
            {
                path: 'roles-manage',
                component: RolesManageComponent,
                data: {titleI18n: '角色管理'},
            },
        ],
    }
];
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [...MODULE_COMPONENTS,],
    entryComponents: [...COMPONENTS_NOROUNT],
    providers: [...MODULE_SERVICES],
})
export class AuthorityModule {
}
