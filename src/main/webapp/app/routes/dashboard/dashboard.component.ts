import {Component, OnInit, OnDestroy} from '@angular/core';
import {JhiEventManager} from "ng-jhipster";
import {IMAGE_API_URL, SERVER_API_URL, UPLOAD_IMAGE_API} from "../../app.constants";
import {Principal} from '@core/auth/principal.service';
import { UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { NzCustomAlertService } from '@shared';
@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard.component.less'],
    templateUrl: './dashboard.component.html',

})
export class DashboardComponent implements OnInit, OnDestroy {
    imgList:any;
    loading = false;
    avatarUrl: string;
    upLoadUrl:string;
    constructor(
        private eventManager: JhiEventManager,
        private principal: Principal,
        private nzCustomAlertService: NzCustomAlertService,
    ) {
        this.imgList=[
            {
                uid: 1,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/default_avatar.png'
            },
            {
                uid: 2,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 3,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/default_avatar.png'
            },
            {
                uid: 4,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 5,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/default_avatar.png'
            },
            {
                uid: 6,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 7,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/default_avatar.png'
            },
            {
                uid: 8,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 9,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/default_avatar.png'
            },
            {
                uid: 10,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/avatar.jpg'
            },
            {
                uid: 11,
                name: 'avatar.jpg',
                status: 'done',
                url: '../../../assets/tmp/img/default_avatar.png'
            },
        ];
        this.upLoadUrl=SERVER_API_URL+UPLOAD_IMAGE_API;
    }
    beforeUpload = (file: File) => {
        return new Observable((observer: Observer<boolean>) => {
            const isJPG = file.type === 'image/jpeg';
            if (!isJPG) {
                this.nzCustomAlertService.error('You can only upload JPG file!');
                observer.complete();
                return;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.nzCustomAlertService.error('Image must smaller than 2MB!');
                observer.complete();
                return;
            }
            // check height
            this.checkImageDimension(file).then(dimensionRes => {
                if (!dimensionRes) {
                    this.nzCustomAlertService.error('Image only 300x300 above');
                    observer.complete();
                    return;
                }

                observer.next(isJPG && isLt2M && dimensionRes);
                observer.complete();
            });
        });
    };

    ngOnInit() {
        this.principal.identity().then(account => {
            if (account) {
                //调用九宫格显示控件所需数据
                this.eventManager.broadcast({
                    name: 'widgets-nine-grid-view',
                    content:this.imgList,
                });
            }
        });
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

    handleChange(info: { file: UploadFile }): void {
        if (info.file.status === 'uploading') {
            this.loading = true;
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, (img: string) => {
                this.loading = false;
                this.avatarUrl = img;
            });
        }
    }

    ngOnDestroy() {
    }
}
