import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';
import {NineGridViewRoutingModule} from './nine-grid-view-routing.module';
import {NineGridViewComponent} from './nine-grid-view.component';

const COMPONENTS = [
    NineGridViewComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [
        SharedModule,
        NineGridViewRoutingModule,
    ],
    exports: [ NineGridViewComponent],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: [NineGridViewComponent],
})
export class NineGridViewModule {
}
