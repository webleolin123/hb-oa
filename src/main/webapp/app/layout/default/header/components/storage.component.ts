import {Component, HostListener, ChangeDetectionStrategy} from '@angular/core';
import {NzModalService, NzMessageService} from 'ng-zorro-antd';
import {LoginService} from '@core/login/login.service.ts';
import {Principal} from '@core/auth/principal.service';
import {ACCOUNT} from "@shared";
import {CacheService} from "@delon/cache";
@Component({
    selector: 'header-storage',
    template: `
  <i nz-icon type="tool"></i>
  清理本地缓存
  `,
    host: {
        '[class.d-block]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderStorageComponent {
    constructor(
        private modalSrv: NzModalService,
        private messageSrv: NzMessageService,
        private loginService: LoginService,
        private principal: Principal,
        private cache: CacheService,
        ) {
    }

    @HostListener('click')
    _click() {
        this.modalSrv.confirm({
            nzTitle: '清除本地缓存,将退出登录?',
            nzOnOk: () => {
                localStorage.clear();
                this.cache.set(ACCOUNT,null);
                this.principal.authenticate(null);
                this.messageSrv.success('清除成功!');
            },
        });
    }
}
