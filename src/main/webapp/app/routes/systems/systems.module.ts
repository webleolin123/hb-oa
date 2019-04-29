import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {SystemsRoutingModule} from './systems-routing.module';

import {
    MechanismManageComponent,
    MechanismManageCheckComponent,
    MechanismManageAddComponent,
    MechanismManageOwnComponent,
    PersonnelManageComponent,
    PersonnelManageAddComponent,
    PersonnelManageOwnComponent,
    PersonnelManageCheckComponent,
    PersonnelManageModifyComponent,
    RolesManageComponent,
    RolesManageAddComponent,
    RolesManageService,
    BrowserSupportComponent,
    DictManageComponent,
    DictManageAddComponent,
    DictManageCheckComponent,
    DictManageService,
    UserSettingsComponent,
    UserSettingsBaseComponent,
    UserSettingsSecurityComponent,
    UserSettingsBindingComponent,
    UserSettingsNotificationComponent,
    UserSecurityEditComponent,
    UserSettingsService,
    SysMessagesModule,
    MenuSettingsComponent,
    ChangePswComponent,
    TabooedComponent,
    MessageSettingsComponent,
} from './';

const COMPONENTS = [
    MechanismManageComponent,
    PersonnelManageComponent,
    RolesManageComponent,
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
];
const COMPONENTS_NOROUNT = [
    MechanismManageAddComponent,
    MechanismManageCheckComponent,
    MechanismManageOwnComponent,
    PersonnelManageAddComponent,
    PersonnelManageCheckComponent,
    PersonnelManageOwnComponent,
    PersonnelManageModifyComponent,
    DictManageCheckComponent,
    DictManageAddComponent,
    RolesManageAddComponent,
    UserSecurityEditComponent,
];

@NgModule({
    imports: [
        SharedModule,
        SystemsRoutingModule,
        SysMessagesModule,
    ],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: [...COMPONENTS_NOROUNT],
    providers:[RolesManageService,DictManageService,UserSettingsService],
})
export class SystemsModule {
}
