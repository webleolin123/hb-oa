import {Component, OnInit} from '@angular/core';
import {HttpResponse} from "@angular/common/http";

import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {LogService} from '@shared';

import {MechanismManageService} from '../mechanism-manage.service';
import {MechanismManageModel} from '../mechanism-manage.model';


@Component({
    selector: 'personnel-manage-check',
    templateUrl: './check.component.html',
})
export class MechanismManageCheckComponent implements OnInit {
    parentData: any;//parentData.id //机构id 没有--创建   如果有--编辑
    data: MechanismManageModel;//返回数据
    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private mechanismManageService: MechanismManageService,
        private logService: LogService,
    ) {}

    ngOnInit() {
        if (this.parentData.id) {
            this.mechanismManageService.find(this.parentData.id).subscribe(
                (res: HttpResponse<MechanismManageModel>) => this.data = res.body,
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.modalService.error({
                nzTitle: 'id不存在',
            });
        }
    }
    save() {
        this.modal.destroy();
    }
    private onSaveError(res) {
        this.logService.printLog('err', res);
        this.modalService.error({
            nzTitle: '哎呀,出错了!',
            nzContent: `${res.error.status}:${res.error.message}<br>${res.error.title}`,
        });
    }

    close() {
        this.modal.destroy();
    }
}

