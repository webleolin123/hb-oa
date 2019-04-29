import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
    HomeComponent,
    HomeSomeListComponent,
} from "./";


const routes: Routes = [
    {
        path: '',
        component:HomeComponent,
        data: {titleI18n: '首页'},
    },
    {
        path: 'home',
        component:HomeComponent,
        children:[],
        data: {titleI18n: '首页'},

    },
    {
        path: 'home-someList',
        component: HomeSomeListComponent,
        data: {titleI18n: '首页明细'},
    },
    {
        path: 'section',
        loadChildren: './section/section.module#SectionModule',
    },
    {
        path: 'authority',
        loadChildren: './authority/authority.module#AuthorityModule',
    },
    {
        path: 'messages',
        loadChildren: './messages/messages.module#MessagesModule',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DingDingRoutingModule {
}
