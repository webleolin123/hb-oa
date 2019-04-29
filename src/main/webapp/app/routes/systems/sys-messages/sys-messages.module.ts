import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from '@shared';

import {
    SysMessagesComponent,
    AliSmsComponent,
    AliSmsService,
    AliSmsDetailComponent,
    BaiduSmsComponent,
    BaiduSmsService,
    BaiduSmsDetailComponent,
    SysMessageComponent,
    SysMessageService,
    SysMessageDetailComponent,
} from './'
const MODULE_COMPONENTS = [
    SysMessagesComponent,
    AliSmsComponent,
    AliSmsDetailComponent,
    BaiduSmsComponent,
    BaiduSmsComponent,
    BaiduSmsDetailComponent,
    SysMessageComponent,
    SysMessageDetailComponent,
];
const MODULE_SERVICES=[
    SysMessageService,
    AliSmsService,
    BaiduSmsService,
];
const COMPONENTS_NOROUNT=[
    SysMessageDetailComponent,
    AliSmsDetailComponent,
    BaiduSmsDetailComponent,
];
const routes: Routes = [
    {
        path: '',
        component: SysMessagesComponent,
        children: [
            {
                path: 'message',
                component: SysMessageComponent,
                data: {titleI18n: '消息中心'},
            },
            {
                path: 'ali-sms',
                component: AliSmsComponent,
                data: {titleI18n: '短信推送'},
            },
            {
                path: 'baidu-sms',
                component: BaiduSmsComponent,
                data: {titleI18n: '百度推送'},
            },
        ],
    },
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
export class SysMessagesModule {
}
