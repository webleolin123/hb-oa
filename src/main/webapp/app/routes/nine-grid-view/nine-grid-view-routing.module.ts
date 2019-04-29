import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NineGridViewComponent} from './nine-grid-view.component';

const routes: Routes = [
    {
        path: 'nine-grid-view',//九宫格
        component: NineGridViewComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NineGridViewRoutingModule {
}
