import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {DictManageService} from '../dict-manage.service';
import {LogService} from '@shared';
import {DictManageModel} from '../dict-manage.model';
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'jhi-personnel-manage-check-dialog',
    templateUrl: './check.component.html',
})
export class DictManageCheckComponent implements OnInit {
    parentData: any;//parentData.id//人员id 是否有id
    data: DictManageModel;//返回数据
    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private dictManageService: DictManageService,
        private logService: LogService,
    ) {}

    ngOnInit() {
        if (this.parentData.id) {
            this.dictManageService.find(this.parentData.id).subscribe(
                (res: HttpResponse<DictManageModel>) => this.data = res.body,
                (res: HttpResponse<any>) => this.onSaveError(res)
            )
        }
        else {
            this.modalService.error({
                nzTitle: 'id不存在',
            });
        }
    }
    save(){
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

