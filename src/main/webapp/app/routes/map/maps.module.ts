import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {MapsRoutingModule} from './maps-routing.module';
import {LbsAmapComponent} from './lbs-amap/lbs-amap.component';
import {LbsAmapPagenationComponent} from './lbs-amap-pagenation/lbs-amappagenation.component';

const COMPONENTS = [
    LbsAmapComponent,
    LbsAmapPagenationComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [
        SharedModule,
        MapsRoutingModule,
    ],
    exports: [ LbsAmapComponent,LbsAmapPagenationComponent],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: [LbsAmapComponent,LbsAmapPagenationComponent],
})
export class MapsModule {
}
