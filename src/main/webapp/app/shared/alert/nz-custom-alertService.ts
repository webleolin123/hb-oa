import {Injectable} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class NzCustomAlertService {
    constructor(private modalService: NzModalService) { }

    success(msg:string): void {
        const modal = this.modalService.success({
            nzTitle:msg,
        });
        window.setTimeout(() => modal.destroy(), 3000);
    }
    error(msg:string): void {
        const modal = this.modalService.error({
            nzTitle:msg,
        });
        window.setTimeout(() => modal.destroy(), 3000);
    }
    info(msg:string): void {
        const modal = this.modalService.info({
            nzTitle:msg,
        });
        window.setTimeout(() => modal.destroy(), 3000);
    }
    warning(msg:string): void {
        const modal = this.modalService.warning({
            nzTitle:msg,
        });
        window.setTimeout(() => modal.destroy(), 3000);
    }
    confirm(msg,html,cb_ok): void {
        const modal = this.modalService.confirm({
            nzWidth:'420px',
            nzTitle:msg,
            nzContent:html,
            nzOkText: '确定',
            nzOkType: 'danger',
            nzOnOk:cb_ok,
            nzCancelText: '取消',
            nzOnCancel: () => {
                modal.destroy();
            },
        });
    }
}
