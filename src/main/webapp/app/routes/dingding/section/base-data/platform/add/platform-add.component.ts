import {Component, OnInit, OnDestroy} from '@angular/core';

import {NzModalRef} from 'ng-zorro-antd';
import {NzCustomAlertService} from '@shared';
import {HttpResponse} from '@angular/common/http';

import {Platform} from '../platform.model';
import {PlatformService} from '../platform.service';
@Component({
    selector: 'platform-add',
    templateUrl: './platform-add.component.html'
})
export class PlatformAddComponent implements OnInit {
    parentData: any;//parentData.id 没有--创建   如果有--编辑
    platform: Platform;
    constructor(
        private platformService: PlatformService,
        private modal: NzModalRef,
        private nzCustomAlertService: NzCustomAlertService,
    ) {}

    ngOnInit() {
        this.load();
    }
    load() {
        if (this.parentData.id) {
            this.platformService.find(this.parentData.id).subscribe(
                (res: HttpResponse<Platform>) => this.platform = res.body,
                    (res: HttpResponse<any>) => this.onSaveError(res)
            )
        } else {
            this.platform = new Platform;
        }
    }

    save() {
        if (this.parentData.id) {
            this.platformService.update(this.platform).subscribe(
                (res: HttpResponse<Platform>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.platformService.create(this.platform).subscribe(
                (res: HttpResponse<Platform>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }

    close() {
        this.modal.destroy();
    }

    private onSaveSuccess(res) {
        if (res.ok === true) {
            this.nzCustomAlertService.success(!this.parentData.id ? '创建成功' : '修改成功');
            this.close();
        }
    }

    private onSaveError(error) {
        console.log('error',error);
        this.nzCustomAlertService.error('哎呀，出错啦！')
    }
}
