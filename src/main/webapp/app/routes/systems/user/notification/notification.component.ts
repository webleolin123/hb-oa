import {Component, ChangeDetectionStrategy} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-user-settings-notification',
    templateUrl: './notification.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsNotificationComponent {
    i: any = {
        // password: true,
        // messages: true,
        // todo: true,
        password: false,
        messages: false,
        todo: false,
    };

    constructor(public msg: NzMessageService) {
    }
}
