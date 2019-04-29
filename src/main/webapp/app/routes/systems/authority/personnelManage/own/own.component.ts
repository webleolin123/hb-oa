import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {PersonnelManageService} from '../personnel-manage.service';
import {LogService} from '@shared';
import {MechanismManageModel} from '../../mechanismManage/mechanism-manage.model';
import {MechanismManageService} from '../../mechanismManage/mechanism-manage.service';
import {UserCompanyModel} from '../../user-company.model';
import {Principal} from "@core";
@Component({
    selector: 'jhi-personnel-manage-own-dialog',
    templateUrl: './own.component.html',
})
export class PersonnelManageOwnComponent implements OnInit {
    parentData: any;//parentData.login是否拥有用户名 没有--创建   如果有--编辑

    isChecked = false;

    myOldCompanies: any=[];//保存人员关联的机构id列表
    chooseCompany:any;//ngModel Value

    companyList = [];
    selectedCompanies:any;

    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private personnelManageService: PersonnelManageService,
        private mechanismManageService: MechanismManageService,
        private logService: LogService,
        private principal: Principal,
    ) {}
    ngOnInit() {
        this.myOldCompanies = this.parentData.userByCompany;
        this.principal.hasAnyAuthority(['ROLE_ADMIN']).then((auth)=>{
            if (auth){
                this.loadAllCompanies();
            } else{
                this.loadMyCompanies();
            }
        });
    }

    //获取被操作账号已有公司
    isOwnCompany() {
        this.personnelManageService.findByLogin(this.parentData.login).subscribe(
            (res: HttpResponse<UserCompanyModel>) => {
                this.onFindCompanyIdSuccess(res.body)
            },
            (res: Response) => this.onSaveError(res)
        )
    }

    onFindCompanyIdSuccess(data) {
        this.myOldCompanies = data;
    }

    //获取登陆账号已有公司供创建选择
    loadMyCompanies() {
        this.mechanismManageService.findMyCompanies().subscribe(
            (res: HttpResponse<(UserCompanyModel)[]>) => this.onLoadMyCompaniesSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        )
    }

    onLoadMyCompaniesSuccess(data) {//获取所有机构名 用于关联
        this.companyList = data;//转换为需要的数据格式
    }

    loadAllCompanies() {
        this.mechanismManageService.query({
            size: 10000,
        }).subscribe(
            (res: HttpResponse<(MechanismManageModel)[]>) => this.onLoadAllCompaniesSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        )
    }

    onLoadAllCompaniesSuccess(data) {//获取所有机构名 用于关联
        if (data.content!=null) {
            data.content.forEach(one=>{
                let userCompanyModel = new UserCompanyModel();
                userCompanyModel.companyId = one.id;
                userCompanyModel.companyName = one.name;
                this.companyList.push(userCompanyModel);
            })
        }
    }

    choose(company){
        this.isChecked=true;
        this.chooseCompany=company;
    }

    removeCompany() {
        if (this.companyList.every(one=>one.companyId!=this.chooseCompany.companyId)){
            this.msg.success( '无权限操作');
            return;
        }
        if (this.myOldCompanies!=null&&this.myOldCompanies.length>1) {
            const modal = this.modalService.confirm({
                nzTitle: '你确定要删除?',
                nzContent: `机构名称:<b style="color:red;">${this.chooseCompany.companyName}</b>`,
                nzOkText: '确定',
                nzOkType: 'danger',
                nzOnOk: () => {
                    this.personnelManageService.deleteUser({
                        companyId:Number(this.chooseCompany.companyId),
                        login: this.parentData.login,
                    }).subscribe(
                        (res: HttpResponse<UserCompanyModel>) => this.onDeleteSuccess(res),
                        (res: HttpResponse<any>) => this.onSaveError(res)
                    );
                },
                nzCancelText: '取消',
                nzOnCancel: () => {
                    modal.destroy()
                },
            });
        } else {
            this.msg.success( '机构数量大于1，才能进行移除炒作');
        }

    }

    onDeleteSuccess(data){
        this.msg.success( '移除成功');
        // 成功都要执行
        this.isChecked=false;//隐藏移除按钮
        this.isOwnCompany();//重新调用已关联人员接口
    }

    save() {//备注 用户填写_manage 大小写 都不允许 后端会报406
        let companyId = this.selectedCompanies;
        if(this.myOldCompanies.every(one=>one.companyId!=companyId)){//如果存在重复添加的情况

            this.personnelManageService.createOwn({
                byLogin:this.parentData.login,
                companyId:companyId
            }).subscribe(
                (res: HttpResponse<UserCompanyModel>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
        else{//正常添加
            this.msg.info( '已关联，请去除后再关联');
        }
    }

    private onSaveSuccess(res) {
        this.msg.success( '关联成功');
        this.close();
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

