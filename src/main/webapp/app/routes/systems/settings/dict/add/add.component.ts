import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {DictManageModel} from '../dict-manage.model';
import {LogService} from '@shared';
import {DictManageService} from '../dict-manage.service';
@Component({
    selector: 'jhi-dict-manage-add-dialog',
    templateUrl: './add.component.html',
})
export class DictManageAddComponent implements OnInit {
    parentData: any;//parentData.id 人员id判空 没有--创建   如果有--编辑
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
            this.data = new DictManageModel;
            this.data.status = 0;//默认0 失效
        }
    }

    save() {
        if (this.parentData.id) {
            this.dictManageService.update(this.data).subscribe(
                (res: HttpResponse<DictManageModel>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.dictManageService.create(this.data).subscribe(
                (res: HttpResponse<DictManageModel>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(res) {
        this.logService.printLog('res', res);
        if (res.ok === true) {
            this.close();
            this.msg.success(!this.parentData.id ? '创建成功' : '修改成功');
            this.msg.success(!this.parentData.id ? '创建成功' : '修改成功');
        }
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

