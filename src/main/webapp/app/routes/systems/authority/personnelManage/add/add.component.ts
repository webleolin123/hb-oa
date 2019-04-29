import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {LogService} from '@shared';

import {PersonnelManageService} from '../personnel-manage.service';
import {PersonnelManageModel} from '../personnel-manage.model';
import {RolesManageModel} from '../../rolesManage/roles-manage.model';
import {RolesManageService} from '../../rolesManage/roles-manage.service';

import {MechanismManageModel} from '../../mechanismManage/mechanism-manage.model';
import {MechanismManageService} from '../../mechanismManage/mechanism-manage.service';
import {UserCompanyModel} from '../../user-company.model';
import {Principal} from "@core";

@Component({
    selector: 'personnel-manage-add',
    templateUrl: './add.component.html',
})
export class PersonnelManageAddComponent implements OnInit {

    theData: any;
    theCompanyId: number;
    rolesOfOption = [];
    rolesOfTagOptions = [];

    companyList = [];
    selectedCompanies:any;

    constructor(
        private modal: NzModalRef,
        public msg: NzMessageService,
        public modalService: NzModalService,
        private personnelManageService: PersonnelManageService,
        private rolesManageService: RolesManageService,
        private logService: LogService,
        private mechanismManageService: MechanismManageService,
        private principal: Principal,
    ) {
    }

    ngOnInit() {
        setTimeout(() => {//请求数据
            this.loadAllAuthorities();//关联角色选择s
        }, 500);

        this.principal.hasAnyAuthority(['ROLE_ADMIN']).then((auth)=>{
            if (auth){
                this.loadAllCompanies();
            } else{
                this.loadMyCompanies();
            }
        });
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
        if (data.content!=null){
            data.content.forEach(one=>{
                let userCompanyModel = new UserCompanyModel();
                userCompanyModel.companyId = one.id;
                userCompanyModel.companyName = one.name;
                this.companyList.push(userCompanyModel);
            })
        }
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

    loadAllAuthorities() {//获取所有角色 用于关联
        this.rolesManageService.query({
            size: 10000,
        }).subscribe(
            (res: HttpResponse<(RolesManageModel)[]>) => this.onLoadAllAuthsSuccess(res.body),
            (res: Response) => this.onSaveError(res)
        )
    }

    onLoadAllAuthsSuccess(data) {
        this.logService.printLog('获取所有角色列表', data);
        if (data) {
            this.rolesOfOption = data.content;
            this.rolesOfTagOptions = this.theData.authorities;//显示已有角色
            console.log('this.rolesOfTagOptions', this.rolesOfTagOptions);
        }
    }

    //页面提交 共有
    save() {//备注 用户填写_manage 大小写 都不允许 后端会报406
        this.theData.authorities = this.rolesOfTagOptions;
        this.theCompanyId = this.selectedCompanies;
        if (this.theData.id != null) {
            this.personnelManageService.updateUser(this.theData).subscribe(
                (res: HttpResponse<PersonnelManageModel>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        } else {
            this.personnelManageService.createUser({companyId: this.theCompanyId}, this.theData).subscribe(
                (res: HttpResponse<PersonnelManageModel>) => this.onSaveSuccess(res),
                (res: HttpResponse<any>) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(res) {
        this.logService.printLog('res', res);
        if (res.ok === true) {
            this.msg.success(!this.theData.id ? '创建成功' : '修改成功');
            this.close();
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

