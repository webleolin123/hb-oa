import {Component} from '@angular/core';

@Component({
    selector: 'layout-passport',
    templateUrl: './passport.component.html',
    styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent {
    links = [
        {
            title: '隐私',
            href: '/privacy',
        },
        {
            title: '条款',
            href: '/clause',
        },
    ];
}
