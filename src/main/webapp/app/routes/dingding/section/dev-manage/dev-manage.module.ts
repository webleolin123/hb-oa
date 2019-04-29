import { NgModule } from '@angular/core';
import {SharedModule} from '@shared';
import {Routes, RouterModule} from '@angular/router';

import {
    DevManageComponent,
// 开发管理
    DevProjectComponent,
    ProjectManageComponent,
// 设计管理
    IDDesignComponent,
    PackageDesignComponent,
    PageDesignComponent,
    VideoShootComponent,
// 业务管理
    ContractReviewComponent,
    MeetingComponent,
    ProcurementReviewComponent,
    SamplingComponent,
    SubmitReportComponent,
} from "./";

const MODULE_COMPONENTS = [
    DevManageComponent,
    DevProjectComponent,
    ProjectManageComponent,
    IDDesignComponent,
    PackageDesignComponent,
    PageDesignComponent,
    VideoShootComponent,
    ContractReviewComponent,
    MeetingComponent,
    ProcurementReviewComponent,
    SamplingComponent,
    SubmitReportComponent,
];
const routes: Routes = [
    {
        path: '',
        component: DevManageComponent,
        children: [
            {
                path: 'dev',
                component: DevProjectComponent,
                data: {titleI18n: '开发管理'},
            },
            {
                path: 'project',
                component: ProjectManageComponent,
                data: {titleI18n: '项目管理'},
            },
            {
                path: 'pack',
                component: PackageDesignComponent,
                data: {titleI18n: '包装设计申请'},
            },
            {
                path: 'video',
                component: VideoShootComponent,
                data: {titleI18n: '视频拍摄申请'},
            },
            {
                path: 'page',
                component: PageDesignComponent,
                data: {titleI18n: '页面设计申请'},
            },
            {
                path: 'ID',
                component: IDDesignComponent,
                data: {titleI18n: 'ID设计申请'},
            },
            {
                path: 'sampling',
                component: SamplingComponent,
                data: {titleI18n: '取样申请'},
            },
            {
                path: 'submit-report',
                component: SubmitReportComponent,
                data: {titleI18n: '提交报告'},
            },
            {
                path: 'contract',
                component: ContractReviewComponent,
                data: {titleI18n: '合同审核'},
            },
            {
                path: 'purchase',
                component: ProcurementReviewComponent,
                data: {titleI18n: '采购审核'},
            },
            {
                path: 'conference',
                component: MeetingComponent,
                data: {titleI18n: '会议申请'},
            },
        ],
    },
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...MODULE_COMPONENTS],
  providers:[],
})
export class DevManageModule { }
