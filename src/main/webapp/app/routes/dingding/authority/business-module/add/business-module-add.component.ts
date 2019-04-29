import {Component,OnInit} from '@angular/core';

import { NzModalRef, UploadFile } from 'ng-zorro-antd';
import {NzCustomAlertService} from '@shared';
import {HttpResponse} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import {UPLOAD_IMAGE_API, IMAGE_API_URL, SERVER_API_URL} from '../../../../../app.constants';

import {BusinessModule} from '../business-module.model';
import {BusinessModuleService} from '../business-module.service';

@Component({
    selector: 'business-module-add',
    templateUrl: './business-module-add.component.html',
    styleUrls:['./business-module-add.component.less']
})
export class BusinessModuleAddComponent implements OnInit {
    //图片上传相关
    previewVisible = false;
    previewVisible_end = false;
    loading = false;
    upLoadUrl:string;
    //图片上传相关
    parentData: any;//parentData.id 没有--创建   如果有--编辑

    businessModule: BusinessModule;

    imageUrl: string; // logo
    imageMd5: string;

    greyLogoImageUrl: string; // greyLogo
    greyLogoImageMd5: string;

    serverLogoImageUrl: string; // serverLogo
    serverLogoImageMd5: string;

    baseImageUrl: any;

    firstModules: BusinessModule[];
    secondModules: BusinessModule[];

    parentModulesIds: any;

    constructor(
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
        private businessModuleService: BusinessModuleService,
        ) {
        this.upLoadUrl=SERVER_API_URL+UPLOAD_IMAGE_API;
    }

    ngOnInit() {
        this.load();
    }
    load() {
        this.baseImageUrl = IMAGE_API_URL;
        if (this.parentData.id) {
            this.businessModuleService.find(this.parentData.id).subscribe(
                (res: HttpResponse<BusinessModule>) => {
                    this.businessModule = res.body;
                    this.imageUrl = IMAGE_API_URL + this.businessModule.clientLogo;
                    this.imageMd5 = this.businessModule.clientLogo;
                    this.greyLogoImageUrl = IMAGE_API_URL + this.businessModule.greyCLogo;
                    this.greyLogoImageMd5 = this.businessModule.greyCLogo;
                    this.serverLogoImageUrl = IMAGE_API_URL + this.businessModule.serverLogo;
                    this.serverLogoImageMd5 = this.businessModule.serverLogo;
                },
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.businessModule = new BusinessModule();
        }

        this.businessModuleService.getParentOrChildModules({level: 0}).subscribe((response) => {
            this.firstModules = response.body;
        });

        this.businessModuleService.getParentOrChildModules({level: 1}).subscribe((response) => {
            this.secondModules = response.body;
        })
    }
    //图片上传相关
    beforeUpload = (file: File) => {
        return new Observable((observer: Observer<boolean>) => {
            const isPic = file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/gif';
            if (!isPic) {
                this.nzCustomAlertService.error('请上传后缀格式为jpg/jpeg/png/gif的图片');
                observer.complete();
                return;
            }
            //小于10M
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                this.nzCustomAlertService.error('请上传小于10M的图片');
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
    previewPic(type:number){
        if(type==3){
            this.previewVisible_end = true;
        }
        else{
            this.previewVisible = true;
        }
    }
    handleChange(info: { file: UploadFile },type:number): void {
        console.log('handleChange-info',info);
        if (info.file.status === 'uploading') {
            this.loading = true;
            return;
        }
        if (info.file.status === 'done') {
            if(type==3){
                this.serverLogoImageUrl = info.file.thumbUrl;
                this.serverLogoImageMd5 = info.file.response.info['md5'];
            }
            else{
                switch (this.businessModule.status) {
                    case 1:
                        this.imageUrl = info.file.thumbUrl;
                        this.imageMd5 = info.file.response.info['md5'];
                        break;
                    case 2:
                        this.greyLogoImageUrl = info.file.thumbUrl;
                        this.greyLogoImageMd5 = info.file.response.info['md5'];
                        break;
                }
            }
            this.getBase64(info.file.originFileObj, (img: string) => {
                this.loading = false;
            });
        }
    }
    //图片上传相关
    save() {
        this.businessModule.clientLogo = this.imageMd5;
        this.businessModule.greyCLogo = this.greyLogoImageMd5;
        this.businessModule.serverLogo = this.serverLogoImageMd5;
        this.parentModulesIds = [];
        if(this.businessModule.level == 1){
            this.firstModules.forEach((firstModule)=>{
                if(firstModule.isSelected == true){
                    this.parentModulesIds.push(firstModule.id);
                }
            });
        }
        else if(this.businessModule.level == 2){
            this.secondModules.forEach((secondModule)=>{
                if(secondModule.isSelected == true){
                    this.parentModulesIds.push(secondModule.id);
                }
            });
        }
        if (this.parentData.id) {
            this.businessModuleService.update(this.businessModule).subscribe(
                (res: HttpResponse<BusinessModule>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.businessModuleService.create(this.businessModule).subscribe(
                (res: HttpResponse<BusinessModule>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result) {
        if(result.body.level == 1){
            this.businessModuleService.addChildRelationship(this.parentModulesIds.toString(), result.body.id).subscribe((res) => {
                this.onSaveSuccessInfo(res)
            })
        }else if (result.body.level == 2) {
            this.businessModuleService.addChildRelationship(this.parentModulesIds.toString(), result.body.id).subscribe((res) => {
                this.onSaveSuccessInfo(res)
            })
        } else {
            this.onSaveSuccessInfo(result)
        }
    }
    close() {
        this.modal.destroy();
    }

    private onSaveSuccessInfo(res) {
        if (res.ok === true) {
            this.nzCustomAlertService.success('操作成功');
            this.close();
        }
    }

    private onSaveError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }

}
