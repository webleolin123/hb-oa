import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {SettingsService} from '@delon/theme';
import {Subscription} from "rxjs";
import {JhiEventManager} from "ng-jhipster";

@Component({
    selector: 'layout-sidebar',
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit,OnDestroy{
    subInfo:Subscription;//订阅编辑成功广播消息
    constructor(
        public settings: SettingsService,
        private eventManager: JhiEventManager,
        private changeRef:ChangeDetectorRef,
    ) {
    }
    ngOnInit() {
        this. registerChangeInUsers();
    }
    registerChangeInUsers() {
        this.subInfo=this.eventManager.subscribe('userInfo', (response) => {
            if(response.name=='userInfo'){
                this.changeRef.markForCheck();
            }
        });
    }
    ngOnDestroy(){
        this.subInfo.unsubscribe();
    }
}
