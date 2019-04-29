import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgJhipsterModule} from 'ng-jhipster';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CookieModule} from 'ngx-cookie';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxTinymceModule } from 'ngx-tinymce';
@NgModule({
    imports: [
        NgbModule.forRoot(),
        InfiniteScrollModule,
        CookieModule.forRoot(),
        NgxEchartsModule,
        NgxTinymceModule.forRoot({
            baseURL: './assets/js/tinymce.min.js',
        })
    ],
    exports: [
        FormsModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule,
        NgxEchartsModule,
    ]
})
export class GadminSharedLibsModule {
    static forRoot() {
        return {
            ngModule: GadminSharedLibsModule
        };
    }
}
