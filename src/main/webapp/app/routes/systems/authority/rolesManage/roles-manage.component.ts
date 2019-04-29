import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {NzMessageService} from 'ng-zorro-antd';
import {ModalHelper} from '@delon/theme';
import {HttpResponse} from '@angular/common/http';
import {RolesManageService} from './roles-manage.service';
import {LogService} from '@shared';
import {RolesManageModel} from './roles-manage.model';
import {RolesManageAddComponent} from './add/add.component';
import {Principal} from '@core/auth/principal.service';
import {
    ITEMS_PER_PAGE,
} from '@shared/constants/pagination.constants';
@Component({
    selector: 'roles-manage',
    templateUrl: './roles-manage.component.html',
})
export class RolesManageComponent implements OnInit, OnDestroy {
    hasAuthWithAdmin:boolean;//是否有超管权限
    pageIndex = 1;//默认第一页
    pageSize = ITEMS_PER_PAGE;//显示10条数据
    total = 1;//总记录数 定义默认值1 类型number
    dataSet = [];//接收返回数据
    loading = true;//控制是否loading
    sortArr: any=null;//排序条件数组 字段+正/倒叙
    numberOfElements=0;//当前页记录数
    constructor(
        private rolesManageService: RolesManageService,
        private logService: LogService,
        private modalService: NzModalService,
        public msg: NzMessageService,
        private modal: ModalHelper,
        private principal: Principal,
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.logService.printLog('account', account);
            if (account) {
                this.searchData();
            }
        });
    }

    ngOnDestroy() {
    }

    searchData(reset: boolean = false): void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        this.rolesManageService.query({
            page: this.pageIndex - 1,
            size: this.pageSize,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(RolesManageModel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        );
    }

    add() {
        this.modal
            .static(RolesManageAddComponent, {parentData: {name: null}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.searchData();
            });
    }


    delete(name) {
        const modal = this.modalService.confirm({
            nzTitle: '你确定要删除?',
            nzContent: `角色标识: <b style="color:red;">${name}</b>`,
            nzOkText: '确定',
            nzOkType: 'danger',
            nzOnOk: () => {
                if(this.numberOfElements==1){
                    this.pageIndex=1;
                }
                this.rolesManageService.deleteRole(name).subscribe(//此处删除接口不同其他 单独写了适配的
                    (res: HttpResponse<RolesManageModel>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res)
                );
            },
            nzCancelText: '取消',
            nzOnCancel: () => {
                modal.destroy()
            },
        });
    }

    sort(sort: { key: string, value: string }){
        if(sort.value){
            this.sortArr = [sort.key + ',' + (sort.value.replace('end',''))];
        }
        else{
            this.sortArr = null;
        }
        this.searchData();
    }

    private onSuccess(data) {//列表请求使用
        this.logService.printLog('data', data);
        if (data) {
            this.loading = false;
            this.dataSet = data.content;
            this.total = data.totalElements;
            this.numberOfElements=data.numberOfElements;
        }
    }

    private onSaveSuccess(res) {//弹窗请求使用
        this.logService.printLog('res', res);
        if (res.ok === true) {
            this.msg.success('删除成功');
            this.msg.success('删除成功');
            this.searchData();
        }
    }

    private onSaveError(res) {
        this.logService.printLog('err', res);
        this.modalService.error({
            nzTitle: '哎呀,出错啦!',
            nzContent: `${res.error.status}:${res.error.message}<br>${res.error.title}`,
        });
    }
}
