import {NgModule} from '@angular/core';
import {
    OtherModule,
    BaseDataModule,
    DevManageModule,
    SalesManageModule,
} from './';
@NgModule({
    imports: [
        OtherModule,
        BaseDataModule,
        DevManageModule,
        SalesManageModule,
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
    ]
})
export class SectionModule {
}
