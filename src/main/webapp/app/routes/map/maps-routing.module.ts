import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LbsAmapComponent} from './lbs-amap/lbs-amap.component';
import {LbsAmapPagenationComponent} from './lbs-amap-pagenation/lbs-amappagenation.component';

const routes: Routes = [
    {
        path: 'lbsamap',//滚动版
        component: LbsAmapComponent,
    },
    {
        path: 'lbsamappagenation',//翻页版
        component: LbsAmapPagenationComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MapsRoutingModule {
}
