import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {PersonnelManageService} from '../personnel-manage.service';
import {LogService} from '@shared';
import {PersonnelManageModel} from '../personnel-manage.model';
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'jhi-personnel-manage-check-dialog',
    templateUrl: './check.component.html',
})
export class PersonnelManageCheckComponent implements OnInit {
    parentData: any;//parentData.login是否拥有用户名 没有--创建   如果有--编辑
    data: PersonnelManageModel;//返回数据
    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private personnelManageService: PersonnelManageService,
        private logService: LogService,
    ) {
    }

    ngOnInit() {
        if (this.parentData.login) {
            this.personnelManageService.find(this.parentData.login).subscribe(
                (res: HttpResponse<PersonnelManageModel>) => this.data = res.body,
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.modalService.error({
                nzTitle: '用户名不存在',
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

