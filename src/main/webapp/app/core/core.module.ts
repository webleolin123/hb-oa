import {NgModule, LOCALE_ID, Optional, SkipSelf} from '@angular/core';

import {DatePipe, registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import locale from '@angular/common/locales/en';
import {
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    // LoginModalService,
    Principal,
    // JhiTrackerService,
    // WindowRef
} from './';
import {throwIfAlreadyLoaded} from './module-import-guard';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        LoginService,
        // LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        // WindowRef,
        // JhiTrackerService,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'en'
        },
        DatePipe
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        registerLocaleData(locale);
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
