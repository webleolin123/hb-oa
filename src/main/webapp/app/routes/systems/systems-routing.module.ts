import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
    RolesManageComponent,
    PersonnelManageComponent,
    MechanismManageComponent,
    DictManageComponent,
    BrowserSupportComponent,
    UserSettingsComponent,
    UserSettingsBaseComponent,
    UserSettingsSecurityComponent,
    UserSettingsBindingComponent,
    UserSettingsNotificationComponent,
    MenuSettingsComponent,
    ChangePswComponent,
    TabooedComponent,
    MessageSettingsComponent,
} from "./";


const routes: Routes = [
    {
        path: 'authority',
        children: [
            {path: 'roles', component: RolesManageComponent},
            {path: 'personnel', component: PersonnelManageComponent},
            {path: 'mechanism', component: MechanismManageComponent},
        ],
    },
    {
        path: 'settings',
        children: [
            {path: 'dict', component: DictManageComponent},
            {path: 'browserSupport', component: BrowserSupportComponent},
            {path: 'menu-settings', component: MenuSettingsComponent},
            {path: 'change-psw', component: ChangePswComponent},
            {path: 'tabooed', component: TabooedComponent},
            {path: 'messages-settings', component: MessageSettingsComponent},
        ],
    },
    {
        path: 'user',
        children: [
            {
                path: 'settings',
                component: UserSettingsComponent,
                children: [
                    {path: '', redirectTo: 'base', pathMatch: 'full'},
                    {
                        path: 'base',
                        component: UserSettingsBaseComponent,
                        data: {titleI18n: '基本设置'},
                    },
                    {
                        path: 'security',
                        component: UserSettingsSecurityComponent,
                        data: {titleI18n: '安全设置'},
                    },
                    {
                        path: 'binding',
                        component: UserSettingsBindingComponent,
                        data: {titleI18n: '绑定信息'},
                    },
                    {
                        path: 'notification',
                        component: UserSettingsNotificationComponent,
                        data: {titleI18n: '新消息通知'},
                    },
                ],
            },
        ],
    },
    {
        path: 'sys-messages',
        loadChildren: './sys-messages/sys-messages.module#SysMessagesModule',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemsRoutingModule {
}
