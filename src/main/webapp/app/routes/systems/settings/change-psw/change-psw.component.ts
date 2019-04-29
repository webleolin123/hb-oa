import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
@Component({
    selector: 'change-psw',
    templateUrl: './change-psw.component.html',
})
export class ChangePswComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
    ) {}

    ngOnInit() {
        this.router.navigate(['/systems/user/settings/security']);
    }

    ngOnDestroy() {
    }
}
