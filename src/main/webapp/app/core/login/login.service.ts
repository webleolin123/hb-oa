import {Inject, Injectable} from '@angular/core';
import {Principal} from '../auth/principal.service';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {Router} from '@angular/router';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import {ACCOUNT} from "@shared";
import {CacheService} from "@delon/cache";
// import {JhiTrackerService} from '../tracker/tracker.service';
@Injectable({providedIn: 'root'})
export class LoginService {
    constructor(
        private principal: Principal,
        // private trackerService: JhiTrackerService,
        private authServerProvider: AuthServerProvider,
        private router: Router,
        private cache: CacheService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) {
    }

    login(credentials, callback?) {
        const cb = callback || function () {
        };

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    resolve(data);
                    // this.principal.identity().then(account => {//解开会出现登录后401错误
                    //     // this.trackerService.sendActivity();
                    // });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb();
                }
            );
        });
    }

    logout() {
        if (this.principal.isAuthenticated()) {
            this.authServerProvider.logout().subscribe(() => {
                this.principal.authenticate(null);
            });
        } else {
            this.principal.authenticate(null);
        }
        this.tokenService.clear();
        this.cache.set(ACCOUNT,null);
        window.localStorage.user = null;//退出登录消除用户信息
        this.router.navigateByUrl(this.tokenService.login_url);
    }
}
