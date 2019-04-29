import {Component, OnDestroy, OnInit} from '@angular/core';
import {Principal} from '@core/auth/principal.service';
import {LogService} from '@shared';
@Component({
    selector: 'personnel-manage',
    templateUrl: './browser-support.component.html',
})
export class BrowserSupportComponent implements OnInit, OnDestroy {
    account:any;
    constructor(
        private  principal:Principal,
        private  logService:LogService,
    ) {
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            if (account) {
                this.account=account;
            }
        });
    }

    ngOnDestroy() {
    }
}
