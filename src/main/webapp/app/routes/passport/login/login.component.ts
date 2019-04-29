import {SettingsService, _HttpClient} from '@delon/theme';
import {Component, OnDestroy, Inject, Optional} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {
    SocialService,
    ITokenService,
    DA_SERVICE_TOKEN,
} from '@delon/auth';
import {ReuseTabService} from '@delon/abc';
import {AuthServerProvider, LoginService, Principal, StartupService} from "@core";
import {LoginResult} from "./login.model";

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
    authenticationError=false;
    form: FormGroup;
    error = '';
    type = 0;
    count = 0;
    interval$: any;

    constructor(
        fb: FormBuilder,
        modalSrv: NzModalService,
        private router: Router,
        private settingsService: SettingsService,
        private socialService: SocialService,
        @Optional()
        @Inject(ReuseTabService)
        private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private startupSrv: StartupService,
        public http: _HttpClient,
        public msg: NzMessageService,
        private loginService: LoginService,
        private principal: Principal,
    ) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(4)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true],
        });
        modalSrv.closeAll();
    }

    // #region fields
    get userName() {
        return this.form.controls.userName;
    }

    get password() {
        return this.form.controls.password;
    }

    get mobile() {
        return this.form.controls.mobile;
    }

    get captcha() {
        return this.form.controls.captcha;
    }

    get remember() {
        return this.form.controls.remember;
    }

    // #endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    submit() {
        this.error = '';
        if (this.type === 0) {
            this.userName.markAsDirty();
            this.userName.updateValueAndValidity();
            this.password.markAsDirty();
            this.password.updateValueAndValidity();
            if (this.userName.invalid || this.password.invalid) return;
        } else {
            this.mobile.markAsDirty();
            this.mobile.updateValueAndValidity();
            this.captcha.markAsDirty();
            this.captcha.updateValueAndValidity();
            if (this.mobile.invalid || this.captcha.invalid) return;
        }
        this.loginService
            .login({
                username: this.userName.value,
                password: this.password.value,
                rememberMe: this.remember.value
            })
            .then((data: LoginResult) => {
                this.authenticationError = false;
                const token: any = {
                    jti: data.jti,
                    iat: data.iat,
                    expires_in: data.expires_in,
                    refresh_token: data.refresh_token,
                    token: data.access_token,
                    token_type: data.token_type
                };
                // 清空路由复用信息
                this.reuseTabService.clear();
                // 设置用户Token信息
                this.tokenService.set(token);
                // this.reloadUrl();
                // this.prin
                // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
                this.startupSrv.load().then((isLogined) => {
                    if (isLogined) {
                        let url = this.tokenService.referrer.url || 'dingding/home';
                        if (url.includes('/passport')) url = 'dingding/home';
                        this.router.navigate(['dingding/home']);
                    } else {
                        this.loginService.logout();
                    }
                });
            })
            .catch((err) => {
                console.log('err',err);
                this.authenticationError = true;
            });
    }
    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }
}
