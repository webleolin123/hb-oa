import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {Component, OnInit} from '@angular/core';
// import {JhiEventManager} from "ng-jhipster";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import {
    CHANGE_PASSWORD_API,
} from "../../../../../../app.constants";
import {SettingsService} from '../../../settings/settings.service';
import {LoginService} from "@core";

@Component({
    selector: 'security-edit',
    templateUrl: './security-edit.component.html',
    styleUrls: ['./security-edit.component.less'],
    providers: [SettingsService],
})
export class ProAccountSecurityEditComponent implements OnInit {
    //表单相关
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

    // securityLevel:any='';//密码强度
    constructor(
        fb: FormBuilder,
        private modal: NzModalRef,
        public msg: NzMessageService,
        public settingsService: SettingsService,
        private modalService: NzModalService,
        private loginService: LoginService,
        // private eventManager: JhiEventManager,
    ) {
        this.form = fb.group({
            currentPassword: [
                null,
                [
                    Validators.required,
                ],
            ],
            newPassword: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    this.checkPassword.bind(this),
                ],
            ],
            confirm: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    this.passwordEquar,
                ],
            ],
        });
        this.settingsService.resourceUrl = CHANGE_PASSWORD_API;//修改密码
    }

    ngOnInit() {
    }

    checkPassword(control: FormControl) {
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
        // this.securityLevel=self.status;
        if (self.visible) {
            self.progress =
                control.value.length * 10 > 100 ? 100 : control.value.length * 10;
        }
    }

    passwordEquar(control: FormControl) {
        if (!control || !control.parent) {
            return null;
        }
        if (control.value !== control.parent.get('newPassword').value) {
            return {equar: true};
        }
        return null;
    }

    get currentPassword() {
        return this.form.controls.currentPassword;
    }

    get newPassword() {
        return this.form.controls.newPassword;
    }

    get confirm() {
        return this.form.controls.confirm;
    }

    save() {
        this.error = '';
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        if (this.form.invalid) {
            return;
        }
        const data = this.form.value;
        this.settingsService.modify(data).subscribe((res) => {
            if (res.status === 200) {
                const modal = this.modalService.success({
                    nzTitle: '密码修改成功',
                    nzContent: '3秒后退出登录，请重新登录'
                });
                // this.eventManager.broadcast({//使用广播向父组件传送密码强度信息
                //     name: 'securityLever',
                //     content:this.securityLevel,
                // });
                window.setTimeout(() => {
                    this.modal.close(true);
                    this.close();
                    this.loginService.logout();//退出登录并将debug关闭
                }, 3000);
            }
        });
    }

    close() {
        this.modal.destroy();
    }
}
