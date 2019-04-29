import {Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit,OnDestroy} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {SettingsService} from '@delon/theme';
import {LoginService} from '@core/login/login.service.ts';
// import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';

import {Subscription} from "rxjs";
import {JhiEventManager} from "ng-jhipster"
@Component({
    selector: 'header-user',
    template: `
        <nz-dropdown nzPlacement="bottomRight">
            <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
                <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
                {{settings.user.name}}
            </div>
            <div nz-menu class="width-sm">
                <!--<div nz-menu-item routerLink="/pro/account/center"><i nz-icon type="user" class="mr-sm"></i>-->
                <!--个人中心-->
                <!--</div>-->
                <div nz-menu-item routerLink="/systems/user/settings/base"><i nz-icon type="setting" class="mr-sm"></i>
                    个人设置
                </div>
                <div nz-menu-item routerLink="/exception/trigger"><i nz-icon type="setting" class="mr-sm"></i>
                    触发错误
                </div>
                <li nz-menu-divider></li>
                <div nz-menu-item (click)="logout()"><i nz-icon type="logout" class="mr-sm"></i>
                    退出登录
                </div>
            </div>
        </nz-dropdown>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent implements OnInit,OnDestroy{
    subInfo:Subscription;//订阅编辑成功广播消息
    constructor(
        public settings: SettingsService,
        private loginService: LoginService,
        private changeRef:ChangeDetectorRef,
        private msg:NzMessageService,
        private eventManager: JhiEventManager,
        // @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) {
    }
    ngOnInit() {
        this.registerChangeInUsers();
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
    logout() {
        this.loginService.logout();
        this.msg.success('退出成功!');
    }
}
