import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';

import {StyleRoutingModule} from './style-routing.module';
import {ColorService} from './color.service';

import {GridMasonryComponent} from './gridmasonry/gridmasonry.component';
import {TypographyComponent} from './typography/typography.component';
import {ColorsComponent} from './colors/colors.component';
import {IconsComponent} from './icons/icons.component';

const COMPONENTS = [
    GridMasonryComponent,
    TypographyComponent,
    ColorsComponent,
    IconsComponent,
];

const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule,StyleRoutingModule],
    providers: [ColorService],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class StyleModule {
}
