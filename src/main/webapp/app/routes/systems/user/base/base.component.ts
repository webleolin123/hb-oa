import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { IMAGE_API_URL,UPLOAD_IMAGE_API,SERVER_API_URL,} from 'app/app.constants';
import {Principal} from '@core/auth/principal.service';
import {Router} from "@angular/router";
import {UserSettingsService} from '../settings.service';
import {SettingsService} from '@delon/theme';
import {ACCOUNT, LogService} from '@shared';
import {StartupService} from "@core";
import {SettingsModel} from '../settings.model';
import {NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from "@angular/common/http";
import {UserCompanyModel} from "../../authority/user-company.model";
import {PersonnelManageService} from "../../authority/personnelManage/personnel-manage.service";

import { Observable, Observer } from 'rxjs';
import {JhiEventManager} from "ng-jhipster";
import { ElementRef,ViewChild  } from '@angular/core';
import {CacheService} from "@delon/cache";
@Component({
    selector: 'app-user-settings-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsBaseComponent implements OnInit,OnDestroy{
    @ViewChild('companySpan') companySpan: ElementRef;
    companyHtml:any;
    avatar = '';
    userLoading = true;
    user: any={};
    data: SettingsModel;
    hasCompanyList=[];

    previewVisible = false;
    loading = false;
    upLoadUrl:string;
    constructor(
        private http: _HttpClient,
        private cdr: ChangeDetectorRef,
        private msg: NzMessageService,
        private principal: Principal,
        private router: Router,
        private userSetting: UserSettingsService,
        private settings: SettingsService,
        private logService: LogService,
        private startupSrv: StartupService,
        private modalService: NzModalService,
        private personnelManageService: PersonnelManageService,
        private eventManager: JhiEventManager,
        private cache: CacheService,
    ) {
        this.upLoadUrl=SERVER_API_URL+UPLOAD_IMAGE_API;
        this.user.avatar="./assets/tmp/img/default_avatar.png";//默认图片 因为存在异步请求的问题
        this.companyHtml=`<span style="padding-left: 12px;">暂无</span>`;
    }
    ngOnInit(): void {
        this.principal.identity().then(account => {
            this.logService.printLog('account', account);
            if (account) {
                this.cache.set(ACCOUNT,account);
                this.data = account;
                this.userLoading = false;
                this.user.login = account.login;
                this.user.email = account.email;
                this.user.name = account.nickname;
                this.user.profile = account.signature;
                this.user.phone = account.mobilePhone;
                this.user.imageUrl=account.imageUrl;
                this.user.avatar = this.user.imageUrl ? IMAGE_API_URL + this.user.imageUrl : "./assets/tmp/img/default_avatar.png";
                this.logService.printLog('data', this.data);
                this.logService.printLog('user', this.user);
                this.isOwnCompany();
            }
        });
    }
    ngOnDestroy(){

    }
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
            if(this.hasCompanyList.length>0){
                this.companyHtml='';
                for(let company of this.hasCompanyList){
                    this.companyHtml+=`  <span style="padding-left: 12px" >${company.companyName}</span><br>`;
                }
                this.companySpan.nativeElement.innerHTML = this.companyHtml;
            }
        }
    }

    beforeUpload = (file: File) => {
        return new Observable((observer: Observer<boolean>) => {
            const isPic = file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/gif';
            if (!isPic) {
                this.msg.error('请上传后缀格式为jpg/jpeg/png/gif的图片');
                this.msg.error('请上传后缀格式为jpg/jpeg/png/gif的图片');
                observer.complete();
                return;
            }
            //小于10M
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                this.msg.error('请上传小于10M的图片');
                this.msg.error('请上传小于10M的图片');
                observer.complete();
                return;
            }
            //上传图片最后校验
            this.checkImageDimension(file).then(() => {
                observer.next(isPic && isLt10M);
                observer.complete();
            });
        });
    };
    checkImageDimension(file: File): Promise<boolean> {
        return new Promise(resolve => {
            const img = new Image(); // create image
            img.src = window.URL.createObjectURL(file);
            img.onload = () => {
                window.URL.revokeObjectURL(img.src);
                resolve(true);//不做图片尺寸限制
            };
        });
    }
    getBase64(img: File, callback: (img: string) => void): void {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result.toString()));
        reader.readAsDataURL(img);
    }
    previewPic(){
        this.previewVisible = true;
    }
    handleChange(info: { file: UploadFile }): void {
        console.log('handleChange-info',info);
        if (info.file.status === 'uploading') {
            this.loading = true;
            return;
        }
        if (info.file.status === 'done') {
            this.user.avatar = info.file.thumbUrl;
            this.user.imageUrl=info.file.response.info['md5'];//保存已上传图片返回的md5
            this.getBase64(info.file.originFileObj, (img: string) => {
                this.loading = false;
            });
        }
    }
    broadcastChange(){
            this.eventManager.broadcast({//辅助更新
                name: 'userInfo',
                content:this.user,
            });
    }
    save() {
        this.data.email = this.user.email;
        this.data.nickname = this.user.name;
        this.data.signature = this.user.profile;
        this.data.mobilePhone = this.user.phone;
        this.data.imageUrl= this.user.imageUrl;
        this.userSetting.update(this.data).subscribe((response) => this.onSaveSuccess(response),
            (res: Response) => this.onSaveError(res.json()));
    }

    onSaveSuccess(res) {
        this.logService.printLog('res', res);
        if(res.ok==true){
            this.broadcastChange();
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
