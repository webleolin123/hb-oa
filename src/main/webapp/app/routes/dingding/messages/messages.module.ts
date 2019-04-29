import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from '@shared';

import {
    MessagesComponent,
    NotificationComponent,
    NotificationService,
    NotificationAddComponent,
    NotificationDetailComponent,
} from './index';
const MODULE_COMPONENTS = [
    MessagesComponent,
    NotificationComponent,
    NotificationAddComponent,
    NotificationDetailComponent,
];
const MODULE_SERVICES=[
    NotificationService,
];
const COMPONENTS_NOROUNT=[
    NotificationAddComponent,
    NotificationDetailComponent,
];
const routes: Routes = [
    {
        path: '',
        component: MessagesComponent,
        children:[
            {
                path: 'notification',
                component: NotificationComponent,
                data: {titleI18n: '消息中心'},
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
export class MessagesModule {
}
