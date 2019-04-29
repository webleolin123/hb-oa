import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-user-settings-binding',
    templateUrl: './binding.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsBindingComponent {
    constructor(public msg: NzMessageService) {
    }
}
