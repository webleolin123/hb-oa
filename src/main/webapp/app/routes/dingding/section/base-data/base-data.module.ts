import { NgModule } from '@angular/core';
import {SharedModule} from '@shared';
import {Routes, RouterModule} from '@angular/router';
import {
    BaseDataComponent,
    PlatformService,
    PlatformComponent,
    PlatformAddComponent,
    PlatformDetailComponent,
    BrandService,
    BrandComponent,
    BrandAddComponent,
    BrandDetailComponent,
    ShopService,
    ShopComponent,
    ShopAddComponent,
    ShopDetailComponent,
    GoodComponent,
    GoodService,
    GoodAddComponent,
    GoodDetailComponent,
    GoodSkuService,
    GoodSkuComponent,
    GoodSkuAddComponent,
    GoodSkuDetailComponent,
    HelpRolesComponent,
    HelpRolesService,
    HelpRolesAddComponent,
    HelpRolesDetailComponent,
} from "./";
const MODULE_COMPONENTS = [
    BaseDataComponent,
    PlatformComponent,
    PlatformAddComponent,
    PlatformDetailComponent,
    BrandComponent,
    BrandAddComponent,
    BrandDetailComponent,
    ShopComponent,
    ShopAddComponent,
    ShopDetailComponent,
    GoodComponent,
    GoodAddComponent,
    GoodDetailComponent,
    GoodSkuComponent,
    GoodSkuAddComponent,
    GoodSkuDetailComponent,
    HelpRolesComponent,
    HelpRolesAddComponent,
    HelpRolesDetailComponent,
];
const COMPONENTS_NOROUNT = [
    PlatformAddComponent,
    PlatformDetailComponent,
    BrandAddComponent,
    BrandDetailComponent,
    ShopAddComponent,
    ShopDetailComponent,
    GoodAddComponent,
    GoodDetailComponent,
    GoodSkuAddComponent,
    GoodSkuDetailComponent,
    HelpRolesComponent,
    HelpRolesAddComponent,
    HelpRolesDetailComponent,
];
const COMPONENTS_SERVICES=[
    PlatformService,
    BrandService,
    ShopService,
    GoodService,
    GoodSkuService,
    HelpRolesService,
];
const routes: Routes = [
    {
        path: '',
        component: BaseDataComponent,
        children: [
            {
                path: 'platform',
                component: PlatformComponent,
                data: {titleI18n: '平台管理'},
            },
            {
                path: 'brand',
                component: BrandComponent,
                data: {titleI18n: '品牌管理'},
            },
            {
                path: 'shop',
                component: ShopComponent,
                data: {titleI18n: '店铺管理'},
            },
            {
                path: 'good',
                component: GoodComponent,
                data: {titleI18n: '商品管理'},
            },
            {
                path: 'sku',
                component: GoodSkuComponent,
                data: {titleI18n: '商品SKU管理'},
            },
            {
                path: 'help-roles',
                component: HelpRolesComponent,
                data: {titleI18n: '帮助规则'},
            },
        ],
    },
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...MODULE_COMPONENTS],
  entryComponents:[...COMPONENTS_NOROUNT],
  providers:[...COMPONENTS_SERVICES],
  exports:[],
})
export class BaseDataModule { }
