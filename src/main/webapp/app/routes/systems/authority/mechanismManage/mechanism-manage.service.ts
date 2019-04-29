import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MechanismManageModel} from './mechanism-manage.model';
import {UserCompanyModel} from "../user-company.model";
import {createRequestOption} from '@shared/util/request-util';

import {
    COMPANY_API,
    BATCH_JOIN_USER_API,//批量添加人员
    FINDLOGIN_BY_COMPANYID_API,//机构下是否有关联人员 获取已关联列表
    PERSONNEL_COMPANY_DELETE_USER_API,//机构中移除人员  或人员中移除机构
    COMPANY_FINDALL_BY_PARENT_API,
    MY_COMPANY_API,
} from 'app/app.constants';
@Injectable()
export class MechanismManageService {
    moduleId: any;//模块的id
    private resourceUrl=COMPANY_API; //模块的通用请求地址
    private deleteUserUrl=PERSONNEL_COMPANY_DELETE_USER_API; //模块的删除请求地址
    private queryUserByCompanyUrl=FINDLOGIN_BY_COMPANYID_API; //模块的已关联人员请求地址
    private batchJoinUrl=BATCH_JOIN_USER_API; //模块的关联人员请求地址
    private findTopUrl=COMPANY_FINDALL_BY_PARENT_API; //获取顶级机构的请求地址
    private myCompanyUrl = MY_COMPANY_API;//
    constructor(
        private http: HttpClient
    ) {}

    findMyCompanies(req?: any): Observable<HttpResponse<UserCompanyModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserCompanyModel[]>(this.myCompanyUrl, {
            params: options,
            observe: 'response'
        });
    }

    query(req?: any): Observable<HttpResponse<MechanismManageModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<MechanismManageModel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    add(mechanismManageModel: MechanismManageModel): Observable<HttpResponse<MechanismManageModel>> {
        const options = createRequestOption(mechanismManageModel);
        return this.http.put<MechanismManageModel>(this.resourceUrl, mechanismManageModel, {
            params: options,
            observe: 'response'
        });
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    find(id: any): Observable<HttpResponse<MechanismManageModel>> {
        return this.http.get<MechanismManageModel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(mechanismManageModel: MechanismManageModel): Observable<HttpResponse<MechanismManageModel>> {
        return this.http.put<MechanismManageModel>(this.resourceUrl, mechanismManageModel, {observe: 'response'});
    }

    create(mechanismManageModel: MechanismManageModel): Observable<HttpResponse<MechanismManageModel>> {
        return this.http.post<MechanismManageModel>(this.resourceUrl, mechanismManageModel, {observe: 'response'});
    }
    findTop(req?: any): Observable<HttpResponse<MechanismManageModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<MechanismManageModel[]>(this.findTopUrl, {
            params: options,
            observe: 'response'
        });
    }
    queryUserByCompany(req?: any): Observable<HttpResponse<UserCompanyModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserCompanyModel[]>(this.queryUserByCompanyUrl, {
            params: options,
            observe: 'response'
        });
    }
    deleteUser(req?: any): Observable<HttpResponse<UserCompanyModel>> {
        const options = createRequestOption(req);
        return this.http.delete(this.deleteUserUrl,{
            params: options,
            observe: 'response'
        });
    }

    batch_join(userCompanyModel?: any): Observable<HttpResponse<UserCompanyModel>> {
        const options = createRequestOption(userCompanyModel);
        return this.http.put<UserCompanyModel>(this.batchJoinUrl,userCompanyModel,{
            params: options,
            observe: 'response'
        });
    }
}

