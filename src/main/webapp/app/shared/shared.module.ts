import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
// delon
import {AlainThemeModule} from '@delon/theme';
import {DelonABCModule} from '@delon/abc';
import {DelonChartModule} from '@delon/chart';
import {DelonACLModule} from '@delon/acl';
import {DelonFormModule} from '@delon/form';
import {XlsxModule} from '@delon/abc';
// #region third libs
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CountdownModule} from 'ngx-countdown';
import {UEditorModule} from 'ngx-ueditor';
import {NgxTinymceModule} from 'ngx-tinymce';

//custom CommonModule
import {CommonModule} from '@angular/common';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {
    GadminSharedLibsModule,
    HasAnyAuthorityDirective,
    LogService,
    UeeRender2Directive,
    WidgetNineGridViewComponent,
    //before
    CommonMethodsService,
    CustomPipe,
    OperationPipe,
    ContainPipe,
    CutStrPipe,
    TimeStampsPipe,
    HtmlPipe,
    ChartComponent,
    ChartService,
    NzCustomAlertService,
    DepartmentService,
} from './';
//
const CUSTOMCOMPONENT=[
    CustomPipe,
    OperationPipe,
    ContainPipe,
    CutStrPipe,
    TimeStampsPipe,
    HtmlPipe,
    ChartComponent,
];
const THIRDMODULES = [
    NgZorroAntdModule,
    CountdownModule,
    UEditorModule,
    NgxTinymceModule,
];
// #endregion

// #region your componets & directives
const COMPONENTS = [WidgetNineGridViewComponent];
const DIRECTIVES = [];
// #endregion


@NgModule({
    imports: [
        GadminSharedLibsModule,
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        DelonABCModule,
        XlsxModule,
        DelonChartModule,
        DelonACLModule,
        DelonFormModule,
        // third libs
        ...THIRDMODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        HasAnyAuthorityDirective,
        UeeRender2Directive,
//before
        ...CUSTOMCOMPONENT,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonABCModule,
        XlsxModule,
        DelonChartModule,
        DelonACLModule,
        DelonFormModule,
        // third libs
        ...THIRDMODULES,
        HasAnyAuthorityDirective,
        UeeRender2Directive,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        //before
        ...CUSTOMCOMPONENT,
    ],
    providers:[
        LogService,
        CommonMethodsService,
        NzCustomAlertService,
        ChartService,
        NgbActiveModal,
        DatePipe,
        DepartmentService,
    ],
    entryComponents: [
        ChartComponent,
    ],
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule
        };
    }
}
