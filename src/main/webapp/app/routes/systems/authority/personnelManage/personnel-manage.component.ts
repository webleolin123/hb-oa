import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {NzMessageService} from 'ng-zorro-antd';
import {ModalHelper} from '@delon/theme';
import {HttpResponse} from '@angular/common/http';
import {PersonnelManageService} from './personnel-manage.service';
import {LogService} from '@shared';
import {PersonnelManageModel} from './personnel-manage.model';
import {PersonnelManageAddComponent} from './add/add.component';
import {PersonnelManageCheckComponent} from './check/check.component';
import {PersonnelManageOwnComponent} from './own/own.component';
import {PersonnelManageModifyComponent} from './modify-password/modify.component';
import {Principal} from '@core/auth/principal.service';
import {LoginService} from '@core/login/login.service.ts';
import {
    ITEMS_PER_PAGE,
} from '@shared/constants/pagination.constants';
@Component({
    selector: 'personnel-manage',
    templateUrl: './personnel-manage.component.html',
})
export class PersonnelManageComponent implements OnInit, OnDestroy {
    pageIndex = 1;//默认第一页
    pageSize = ITEMS_PER_PAGE;//显示10条数据
    total = 1;//总记录数 定义默认值1 类型number
    numberOfElements=0;//当前存在记录数
    dataSet = [];//接收返回数据
    loading = true;//控制是否loading
    sortArr: any=null;//排序条件数组 字段+正/倒叙
    constructor(
        private personnelManageService: PersonnelManageService,
        private logService: LogService,
        private modalService: NzModalService,
        public msg: NzMessageService,
        private modal: ModalHelper,
        private principal: Principal,
        private loginService: LoginService,
    ) {}

    ngOnInit(): void {
        this.searchData();
    }

    ngOnDestroy() {
    }

    searchData(reset: boolean = false): void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        console.log('this.pageIndex',this.pageIndex);
        this.personnelManageService.queryUsers({
            page: this.pageIndex - 1,
            size: this.pageSize,
            sort: this.sortArr,
        }).subscribe(
            (res: HttpResponse<(PersonnelManageModel)[]>) => this.onSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        );
    }

    add() {
        this.startModal({id: null});
    }

    edit(data) {
        this.startModal(data);
    }

    startModal(data) {
        this.modal
            .static(PersonnelManageAddComponent, {theData: data})
            .subscribe(() => {//回调函数 重新请求新数据
                this.searchData();
            });
    }

    delete(login) {
        const modal = this.modalService.confirm({
            nzTitle: '你确定要删除?',
            nzContent: `用户名:<b style="color:red;">${login}</b>`,
            nzOkText: '确定',
            nzOkType: 'danger',
            nzOnOk: () => {
                if(this.numberOfElements==1){
                    this.pageIndex = 1;
                }
                this.personnelManageService.deleteUser_new(login).subscribe(
                    (res: HttpResponse<PersonnelManageModel>) => this.onSaveSuccess(res),
                    (res: HttpResponse<any>) => this.onSaveError(res)
                );
            },
            nzCancelText: '取消',
            nzOnCancel: () => {
                modal.destroy()
            },
        });
    }

    check(login) {
        console.log('modal', this.modal);
        this.modal
            .static(PersonnelManageCheckComponent, {parentData: {login: login}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.searchData();
            });
    }

    own(data) {
        this.modal
            .static(PersonnelManageOwnComponent, {parentData: data})
            .subscribe(() => {//回调函数 重新请求新数据
                this.searchData();
            });
    }

    modifyPassword(login,nickName){
        this.modal
            .static(PersonnelManageModifyComponent, {parentData: {login: login,nickName:nickName}})
            .subscribe(() => {//回调函数 重新请求新数据
                this.searchData();
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
        this.logService.printLog('人员管理列表响应', data);
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

