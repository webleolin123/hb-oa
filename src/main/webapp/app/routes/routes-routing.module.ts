import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SimpleGuard} from '@delon/auth';
import {environment} from '@env/environment';
// layout
import {LayoutDefaultComponent} from '../layout/default/default.component';
// import {LayoutFullScreenComponent} from '../layout/fullscreen/fullscreen.component';
import {LayoutPassportComponent} from '../layout/passport/passport.component';
// dashboard pages
import {DashboardComponent} from './dashboard/dashboard.component';
// widgets pages
import {WidgetsComponent} from './widgets/widgets.component';
// passport pages
import {UserLoginComponent} from './passport/login/login.component';
import {UserRegisterComponent} from './passport/register/register.component';
import {UserRegisterResultComponent} from './passport/register-result/register-result.component';
import {UserResetComponent} from './passport/reset/reset.component';
// single pages
import {CallbackComponent} from './callback/callback.component';
import {UserLockComponent} from './passport/lock/lock.component';
//ClauseComponent
import {PrivacyComponent} from './privacy-clause/privacy/privacy.component';
import {ClauseComponent} from './privacy-clause/clause/clause.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        canActivate: [SimpleGuard],
        canActivateChild: [SimpleGuard],
        children: [
            {path: '', redirectTo: 'dingding', pathMatch: 'full'},
            // {path: 'dashboard', component: DashboardComponent},
            {path: 'widgets', component: WidgetsComponent},
            {
                path: 'map',
                loadChildren: './map/maps.module#MapsModule',
            },
            {
                path: 'multi-grid-view',
                loadChildren: './nine-grid-view/nine-grid-view.module#NineGridViewModule',
            },
            {path: 'style', loadChildren: './style/style.module#StyleModule'},
            {path: 'delon', loadChildren: './delon/delon.module#DelonModule'},
            {path: 'extras', loadChildren: './extras/extras.module#ExtrasModule'},
            {path: 'pro', loadChildren: './pro/pro.module#ProModule'},
            {path: 'systems', loadChildren: './systems/systems.module#SystemsModule'},
            {path: 'dingding', loadChildren: './dingding/dingding.module#DingDingModule'},
            // Exception
            {path: 'exception', loadChildren: './exception/exception.module#ExceptionModule'},
        ],
    },
    // passport
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            {
                path: 'login',
                component: UserLoginComponent,
                data: {title: '登录', titleI18n: '登录'},
            },
            {
                path: 'register',
                component: UserRegisterComponent,
                data: {title: '注册', titleI18n: '注册'},
            },
            {
                path: 'register-result',
                component: UserRegisterResultComponent,
                data: {title: '注册结果', titleI18n: '注册结果'},
            },
            {
                path: 'lock',
                component: UserLockComponent,
                data: {title: '锁屏', titleI18n: '锁屏'},
            },
            {
                path: 'reset',
                component: UserResetComponent,
                data: {title: '忘记密码', titleI18n: '忘记密码'},
            },
        ],
    },
    // 单页不包裹Layout
    {path: 'callback/:type', component: CallbackComponent},
    {path: 'privacy', component: PrivacyComponent,data:{title: '隐私', titleI18n: '隐私'}},
    {path: 'clause', component: ClauseComponent,data:{title: '条款', titleI18n: '条款'}},
    {path: '**', redirectTo: 'dingding'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes, {
                useHash: environment.useHash,
                // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
                // Pls refer to https://ng-alain.com/components/reuse-tab
                scrollPositionRestoration: 'top',
            }
        )],
    exports: [RouterModule],
})
export class RouteRoutingModule {
}
