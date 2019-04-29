import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {DingDingRoutingModule} from './dingding-routing.module';

import {
    HomeComponent,
    HomeService,
    HomeSomeListComponent,
    HomeSomeListService,
    HomeSomeListDetailComponent,
    HomeSomeListDetailService,
    SectionModule,
    AuthorityModule,
    MessagesModule,
} from './';

const COMPONENTS = [
    HomeComponent,
    HomeSomeListComponent,
    HomeSomeListDetailComponent,
];
const COMPONENTS_NOROUNT = [
    HomeSomeListDetailComponent,
];

@NgModule({
    imports: [
        SharedModule,
        DingDingRoutingModule,
        SectionModule,
        AuthorityModule,
        MessagesModule,
    ],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: [...COMPONENTS_NOROUNT],
    providers:[HomeService,HomeSomeListService,HomeSomeListDetailService],
})
export class DingDingModule {
}
