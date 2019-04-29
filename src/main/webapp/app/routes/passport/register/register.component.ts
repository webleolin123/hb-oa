import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from 'app/app.constants';
import {LoginService, StartupService} from "@core";
import {LoginResult} from "../login/login.model";

@Component({
    selector: 'passport-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnDestroy {
    form: FormGroup;
    error = '';
    type = 0;
    visible = false;
    status = 'pool';
    progress = 0;
    passwordProgressMap = {
        ok: 'success',
        pass: 'normal',
        pool: 'exception',
    };

    constructor(
        fb: FormBuilder,
        private router: Router,
        public http: _HttpClient,
        public msg: NzMessageService,
        public resetService: LoginService,
    ) {
        this.form = fb.group({
            mail: [null, [Validators.required, Validators.email]],
            password: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    UserRegisterComponent.checkPassword.bind(this),
                ],
            ],
            confirm: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    UserRegisterComponent.passwordEquar,
                ],
            ],
            mobilePrefix: ['+86'],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
        });
    }

    static checkPassword(control: FormControl) {
        if (!control) return null;
        const self: any = this;
        self.visible = !!control.value;
        if (control.value && control.value.length > 9) {
            self.status = 'ok';
        } else if (control.value && control.value.length > 5) {
            self.status = 'pass';
        } else {
            self.status = 'pool';
        }

        if (self.visible) {
            self.progress =
                control.value.length * 10 > 100 ? 100 : control.value.length * 10;
        }
    }

    static passwordEquar(control: FormControl) {
        if (!control || !control.parent) {
            return null;
        }
        if (control.value !== control.parent.get('password').value) {
            return {equar: true};
        }
        return null;
    }

    // #region fields

    get mail() {
        return this.form.controls.mail;
    }

    get password() {
        return this.form.controls.password;
    }

    get confirm() {
        return this.form.controls.confirm;
    }

    get mobile() {
        return this.form.controls.mobile;
    }

    get captcha() {
        return this.form.controls.captcha;
    }

    // #endregion

    // #region get captcha

    count = 0;
    interval$: any;

    getCaptcha() {
        if (this.mobile.invalid) {
            this.mobile.markAsDirty({onlySelf: true});
            this.mobile.updateValueAndValidity({onlySelf: true});
            return;
        }
        // this.resetService
        //     .getCode({
        //         phone: this.mobile.value,
        //         validateType:1,//短信种类：1，注册验证，2 - 变更验证,3 - 手机绑定
        //     })
        //     .then((data: any) => {
        //         console.log('data',data);
        //     })
        //     .catch(() => {
        //         alert('哎呀，出错啦');
        //     });
        //发送短信验证码 POST /api/aliSms/sendVerification
        // this.http.post(SERVER_API_URL啥 + 'baseservice/api/aliSms/sendVerification', {
        //     phone:this.form.controls.mobile,
        //     validateType:1,//短信种类：1，注册验证，2 - 变更验证,3 - 手机绑定
        // }).subscribe(
        //     (res: HttpResponse<(any)>) => {
        //         alert(111);
        //         console.log('res',res);
        //     },
        //         (res: Response) => {
        //         alert('哎呀，出错啦')
        //         }
        //   );
        this.count = 59;
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0) clearInterval(this.interval$);
        }, 1000);
    }

    // #endregion

    submit() {
        this.error = '';
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        if (this.form.invalid) {
            return;
        }

        const data = this.form.value;
        this.http.post('/register', data).subscribe(() => {
            this.router.navigateByUrl('/passport/register-result', {
                queryParams: {email: data.mail},
            });
        });
    }

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }
}
