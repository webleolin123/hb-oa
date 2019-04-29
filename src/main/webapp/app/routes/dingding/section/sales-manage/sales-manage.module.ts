import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SharedModule} from '@shared';
import {
    SalesManageContainerComponent,
// 活动管理
    AmoySnapComponent,
    CustomerPromotionComponent,
    EventSaveComponent,
    PolyCostComponent,
    WeChatPromotionComponent,
    WhitelistComponent,
    OthersComponent,
// 推广管理
    ZhiTongCheComponent,
    ZhiTongCheService,
    ZhiTongCheDetailComponent,
    ZuanZhanComponent,
    ZuanZhanService,
    ZuanZhanDetailComponent,
    SalesPlanComponent,
    TaoKeComponent,
    TaoKeService,
    TaoKeDetailComponent,
    MessageComponent,
    MessageService,
    MessageDetailComponent,
    DaRenComponent,
    DaRenService,
    DaRenDetailComponent,
    ShopAdResourceComponent,
// 产品管理
    PriceComponent,
    PriceService,
    PreSaleComponent,
    PriceAddComponent,
    PreSaleService,
    PriceDetailComponent,
    PreSaleDetailComponent,
    LoadUploadComponent,
    LoadUploadService,
    LoadUploadDetailComponent,
    StockTransferComponent,
    StockTransferService,
    StockTransferDetailComponent,
// 促销管理
    CouponsComponent,
    CouponsService,
    CouponsDetailComponent,
    FullReduceComponent,
    FullReduceDetailComponent,
    FullReduceService,
    GiftComponent,
    GiftService,
    GiftDetailComponent,
// 销售管理
    SalesDevComponent,
    SalesProjectComponent,
} from "./";
const MODULE_COMPONENTS = [
    SalesManageContainerComponent,
// 活动管理
    AmoySnapComponent,
    CustomerPromotionComponent,
    EventSaveComponent,
    PolyCostComponent,
    WeChatPromotionComponent,
    WhitelistComponent,
    OthersComponent,
// 推广管理
    ZhiTongCheComponent,
    ZhiTongCheDetailComponent,
    ZuanZhanComponent,
    ZuanZhanDetailComponent,
    SalesPlanComponent,
    TaoKeComponent,
    TaoKeDetailComponent,
    MessageComponent,
    MessageDetailComponent,
    DaRenComponent,
    DaRenDetailComponent,
    ShopAdResourceComponent,
// 产品管理
    PriceComponent,
    PriceAddComponent,
    PriceDetailComponent,
    PreSaleComponent,
    PreSaleDetailComponent,
    LoadUploadComponent,
    LoadUploadDetailComponent,
    StockTransferComponent,
    StockTransferDetailComponent,
// 促销管理
    CouponsComponent,
    FullReduceComponent,
    GiftComponent,
    GiftDetailComponent,
    CouponsDetailComponent,
    FullReduceDetailComponent,
// 销售管理
    SalesDevComponent,
    SalesProjectComponent,
];
const MODULE_SERVICES=[
// 产品管理
    PriceService,
    PreSaleService,
    LoadUploadService,
    StockTransferService,
// 推广管理
    ZhiTongCheService,
    DaRenService,
    TaoKeService,
    MessageService,
    ZuanZhanService,
//促销管理
    GiftService,
    CouponsService,
    FullReduceService,
];
const COMPONENTS_NOROUNT=[
// 产品管理
    PriceAddComponent,
    PriceDetailComponent,
    PreSaleDetailComponent,
    LoadUploadDetailComponent,
    StockTransferDetailComponent,
// 推广管理
    ZhiTongCheDetailComponent,
    DaRenDetailComponent,
    TaoKeDetailComponent,
    MessageDetailComponent,
    ZuanZhanDetailComponent,
//促销管理
    GiftDetailComponent,
    CouponsDetailComponent,
    FullReduceDetailComponent,
];
const routes: Routes = [
    {
        path: '',
        component: SalesManageContainerComponent,
        children: [
            {
                path: 'white-list',
                component: WhitelistComponent,
                data: {titleI18n: '白名单申请(商品团、品牌团、主题团)'},
            },
            {
                path: 'tao-qg',
                component: AmoySnapComponent,
                data: {titleI18n: '淘抢购(商品团、品牌团、主题团)'},
            },
            {
                path: 'ju-hua-suan',
                component: PolyCostComponent,
                data: {titleI18n: '聚划算(商品团、品牌团、主题团)'},
            },
            {
                path: 'activity-other',
                component: OthersComponent,
                data: {titleI18n: '其他(天天特价、公域活动)'},
            },
            {
                path: 'weixin',
                component: WeChatPromotionComponent,
                data: {titleI18n: '微信推广'},
            },
            {
                path: 'customer',
                component: CustomerPromotionComponent,
                data: {titleI18n: '客服推广'},
            },
            {
                path: 'event-save',
                component: EventSaveComponent,
                data: {titleI18n: '活动存盘'},
            },
            {
                path: 'zhi-tong-che',
                component: ZhiTongCheComponent,
                data: {titleI18n: '直通车申请'},
            },
            {
                path: 'zuan-zhan',
                component: ZuanZhanComponent,
                data: {titleI18n: '钻展申请'},
            },
            {
                path: 'sale-plan',
                component: SalesPlanComponent,
                data: {titleI18n: '销售方案'},
            },
            {
                path: 'tao-bao',
                component: TaoKeComponent,
                data: {titleI18n: '淘宝客申请'},
            },
            {
                path: 'duan-xin',
                component: MessageComponent,
                data: {titleI18n: '短信申请'},
            },
            {
                path: 'daren',
                component: DaRenComponent,
                data: {titleI18n: '达人申请'},
            },
            {
                path: 'shop-ad-resource',
                component: ShopAdResourceComponent,
                data: {titleI18n: '店铺广告位资源申请'},
            },
            {
                path: 'gift',
                component: GiftComponent,
                data: {titleI18n: '赠品申请'},
            },
            {
                path: 'reduce',
                component: FullReduceComponent,
                data: {titleI18n: '满减申请'},
            },
            {
                path: 'coupon',
                component: CouponsComponent,
                data: {titleI18n: '优惠券申请'},
            },
            {
                path: 'price',
                component: PriceComponent,
                data: {titleI18n: '价格申请'},
            },
            {
                path: 'pre-sale',
                component: PreSaleComponent,
                data: {titleI18n: '预售申请'},
            },
            {
                path: 'shelve',
                component: LoadUploadComponent,
                data: {titleI18n: '上下架申请'},
            },
            {
                path: 'stock',
                component: StockTransferComponent,
                data: {titleI18n: '库存调拨申请'},
            },
            {
                path: 'sale-dev',
                component: SalesDevComponent,
                data: {titleI18n: '销售立项'},
            },
            {
                path: 'sale-pro',
                component: SalesProjectComponent,
                data: {titleI18n: '项目管理'},
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
  entryComponents: [...COMPONENTS_NOROUNT],
  providers:[...MODULE_SERVICES],
})
export class SalesManageModule { }
