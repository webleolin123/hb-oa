import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
// import {Subscription} from "rxjs";
// import {JhiEventManager} from "ng-jhipster";
// try
import {UserSecurityEditComponent} from "./security-edit/security-edit.component";
import {ModalHelper} from '@delon/theme';

// try
@Component({
    selector: 'app-user-settings-security',
    templateUrl: './security.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsSecurityComponent implements OnInit, OnDestroy {
    // subs:Subscription;
    // securityLevel:any='pool';
    constructor(
        private modal: ModalHelper,
        // private eventManager: JhiEventManager,
    ) {
    }

    ngOnInit() {
        // this.subs=this.eventManager.subscribe('securityLever', (response) => {
        //     if(response.name=='securityLever'){//接收修改的密码强度信息
        //       this.securityLevel=response.content;
        //     }
        // });
    }

    ngOnDestroy() {
        // this.subs.unsubscribe();
    }

    add() {
        this.modal
            .static(UserSecurityEditComponent)
            .subscribe(() => {
            });
    }
}
