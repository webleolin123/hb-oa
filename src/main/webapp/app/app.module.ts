import {NgModule, LOCALE_ID, APP_INITIALIZER, Injector} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapsModule} from 'app/routes/map/maps.module';
import {NineGridViewModule} from 'app/routes/nine-grid-view/nine-grid-view.module';
// #region default language
// 参考：https://ng-alain.com/docs/i18n
import {default as ngLang} from '@angular/common/locales/zh';
import {NZ_I18N, zh_CN as zorroLang,NZ_MESSAGE_CONFIG,NZ_NOTIFICATION_CONFIG} from 'ng-zorro-antd';
import {DELON_LOCALE, zh_CN as delonLang} from '@delon/theme';

const LANG = {
    abbr: 'zh',
    ng: ngLang,
    zorro: zorroLang,
    delon: delonLang,
};
// register angular
import {registerLocaleData} from '@angular/common';

registerLocaleData(LANG.ng, LANG.abbr);
const MSG_PROVIDES = [//全局提示 服务 全局配置 修改在此
    {   provide: NZ_MESSAGE_CONFIG,
        useValue: {
            nzDuration: 3000,
            nzMaxStack: 7,
            nzPauseOnHover: true,
            nzAnimate: true
    }},
];
const NOTICE_PROVIDES = [//全局提示 服务 全局配置 修改在此
    {   provide: NZ_NOTIFICATION_CONFIG,
        useValue: {
            nzTop         : '100px',
            nzBottom      : '24px',
            nzPlacement   : 'topRight',
            nzDuration    : 4500,
            nzMaxStack    : 7,
            nzPauseOnHover: true,
            nzAnimate     : true
    }},
];
const LANG_PROVIDES = [
    {provide: LOCALE_ID, useValue: LANG.abbr},
    {provide: NZ_I18N, useValue: LANG.zorro},
    {provide: DELON_LOCALE, useValue: LANG.delon},
];
// #endregion

// #region JSON Schema form (using @delon/form)
import {JsonSchemaModule} from '@shared/json-schema/json-schema.module';

const FORM_MODULES = [JsonSchemaModule];
// #endregion

// #region Http Interceptors
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SimpleInterceptor} from '@delon/auth';
import {DefaultInterceptor} from '@core';

const INTERCEPTOR_PROVIDES = [
    {provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
];
// #endregion

// #region global third module
const GLOBAL_THIRD_MODULES = [];
// #endregion

// #region Startup Service
import {StartupService} from '@core';

export function StartupServiceFactory(
    startupService: StartupService,
): Function {
    return () => startupService.load();
}

const APPINIT_PROVIDES = [
    StartupService,
    {
        provide: APP_INITIALIZER,
        useFactory: StartupServiceFactory,
        deps: [StartupService],
        multi: true,
    },
];
// #endregion
import {DelonModule} from './delon.module';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {AppComponent} from './app.component';
import {RoutesModule} from './routes/routes.module';
import {LayoutModule} from './layout/layout.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DelonModule.forRoot(),
        MapsModule,
        NineGridViewModule,
        CoreModule,
        SharedModule,
        LayoutModule,
        RoutesModule,
        ...FORM_MODULES,
        ...GLOBAL_THIRD_MODULES
    ],
    exports: [
        MapsModule,
        NineGridViewModule,
    ],
    providers: [
        ...MSG_PROVIDES,
        ...NOTICE_PROVIDES,
        ...LANG_PROVIDES,
        ...INTERCEPTOR_PROVIDES,
        ...APPINIT_PROVIDES
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
