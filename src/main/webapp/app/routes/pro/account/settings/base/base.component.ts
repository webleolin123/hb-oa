import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    ChangeDetectorRef,
} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { IMAGE_API_URL,UPLOAD_IMAGE_API, PERSONNEL_API,SERVER_API_URL } from 'app/app.constants';
import {Principal} from '@core/auth/principal.service';
import {Router} from "@angular/router";
import {SettingsService} from '../../settings/settings.service';
import {LogService} from '@shared';
import {StartupService} from "@core";
import {SettingsModel} from '../../settings/settings.model';
import {NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from "@angular/common/http";
import {UserCompanyModel} from "../../../../systems/authority/user-company.model";
import {PersonnelManageService} from "../../../../systems/authority/personnelManage/personnel-manage.service";

import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-account-settings-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.less','./base.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SettingsService, LogService],
})
export class ProAccountSettingsBaseComponent implements OnInit {
    avatar = '';
    userLoading = true;
    user: any = {};
    data: SettingsModel;
    hasCompanyList=[];

    previewVisible = false;
    loading = false;
    avatarUrl='';
    avatarMd5:string;
    upLoadUrl:string;

    constructor(
        private http: _HttpClient,
        private cdr: ChangeDetectorRef,
        private msg: NzMessageService,
        private principal: Principal,
        private router: Router,
        private settingsService: SettingsService,
        private logService: LogService,
        private startupSrv: StartupService,
        private modalService: NzModalService,
        private personnelManageService: PersonnelManageService,
    ) {
        this.settingsService.resourceUrl = PERSONNEL_API;//getAll,update
        this.upLoadUrl=SERVER_API_URL+UPLOAD_IMAGE_API;
    }
    private getBase64(img: File, callback: (img: string) => void): void {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result.toString()));
        reader.readAsDataURL(img);
    }

    private checkImageDimension(file: File): Promise<boolean> {
        return new Promise(resolve => {
            const img = new Image(); // create image
            img.src = window.URL.createObjectURL(file);
            img.onload = () => {
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                window.URL.revokeObjectURL(img.src);
                resolve(width === height && width >= 300);
            };
        });
    }

    ngOnInit(){
        this.principal.identity().then(account => {
            this.logService.printLog('account', account);
            if (account) {
                this.data = account;
                this.userLoading = false;
                this.user.login = account.login;
                this.user.email = account.email;
                this.user.name = account.nickname;
                this.user.profile = account.signature;
                this.user.phone = account.mobilePhone;
                this.user.avatar = account.imageUrl ? IMAGE_API_URL + account.imageUrl : "./assets/tmp/img/default_avatar.png";
                this.logService.printLog('data', this.data);
                this.logService.printLog('user', this.user);
                this.isOwnCompany();
            }
        });
        // zip(
        //   this.http.get('/user/current'),
        //   this.http.get('/geo/province'),
        // ).subscribe(([user, province]: any) => {
        //   this.userLoading = false;
        //   this.user = user;
        //   this.provinces = province;
        //   this.choProvince(user.geographic.province.key, false);
        //   this.cdr.detectChanges();
        // });
    }

    // #region geo

    // provinces: any[] = [];
    // cities: any[] = [];

    // choProvince(pid: string, cleanCity = true) {
    //   this.http.get(`/geo/${pid}`).subscribe((res: any) => {
    //     this.cities = res;
    //     if (cleanCity) this.user.geographic.city.key = '';
    //     this.cdr.detectChanges();
    //   });
    // }
    // #endregion
    isOwnCompany() {
        this.personnelManageService.findByLogin(this.user.login).subscribe(
            (res: HttpResponse<UserCompanyModel>) => {
                this.onFindCompanyIdSuccess(res.body)
            },
            (res: Response) => this.onSaveError(res)
        )
    }

    onFindCompanyIdSuccess(data) {
        this.logService.printLog('获取所有已关联公司', data);
        if (data) {//有数据，关联过 获取关联的机构列表
            this.hasCompanyList=data;
        }
    }

    handleChange(info: { file: UploadFile }): void {
        console.log('info',info);
        if (info.file.status === 'uploading') {
            this.loading = true;
            return;
        }
        if (info.file.status === 'done') {
            this.avatarUrl = info.file.thumbUrl;
            this.avatarMd5=info.file.response.info['md5'];
            this.user.avatar=this.avatarMd5;
            console.log('this.avatarMd5',this.avatarMd5);
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, (img: string) => {
                this.loading = false;
            });
        }
    }
    beforeUpload = (file: File) => {
        return new Observable((observer: Observer<boolean>) => {
            const isJPG = file.type === 'image/jpeg';
            if (!isJPG) {
                this.msg.error('You can only upload JPG file!');
                observer.complete();
                return;
            }
            //小于10M
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                this.msg.error('Image must smaller than 10MB!');
                observer.complete();
                return;
            }
            // check height
            this.checkImageDimension(file).then(dimensionRes => {
                if (!dimensionRes) {
                    this.msg.error('Image only 300x300 above');
                    observer.complete();
                    return;
                }

                observer.next(isJPG && isLt10M && dimensionRes);
                observer.complete();
            });
        });
    };

    previewPic(){
        this.previewVisible = true;
    }

    save() {
        this.data.email = this.user.email;
        this.data.nickname = this.user.name;
        this.data.signature = this.user.profile;
        this.data.mobilePhone = this.user.phone;
        this.data.imageUrl=this.user.avatar;
        this.settingsService.update(this.data).subscribe((response) => this.onSaveSuccess(response),
            (res: Response) => this.onSaveError(res.json()));
    }

    onSaveSuccess(res) {
        this.logService.printLog('res', res);
        if(res.ok==true){
            this.startupSrv.load();
            const modal = this.modalService.success({
                nzTitle: '基本信息更新成功',
                nzContent: '弹窗3秒后自动关闭'
            });
            window.setTimeout(() => modal.destroy(), 3000);
        }
    }

    onSaveError(err) {
        const modal = this.modalService.error({
            nzTitle: '哎呀，出错啦',
            nzContent: '点击确定，关闭弹窗'
        });
        this.logService.printLog('err', err);
    }
}
