import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {PersonnelManageModel} from './personnel-manage.model';
import {createRequestOption} from '@shared/util/request-util';
import {UserCompanyModel} from '../user-company.model';
import {
    USERCENTER_API,//人员模块通用接口
    PERSONNEL_GET_USERS_API,//获取所有人员
    PERSONNEL_COMPANY_DELETE_USER_API,//机构中移除人员 或人员中移除机构
    COMPANY_FIND_PARENT_ID_API,//获取机构接口byLogin
    PERSONNEL_COMPANY_API,//人员机构关联接口
    PERSONNEL_MODIFY_PASSWORD_API,//修改人员登录密码
    CREATEUER_API,//新建用户
    DELETEUER_API,//移除用户
    UPDATEUER_API,//更新用户
} from 'app/app.constants';
@Injectable()
export class PersonnelManageService {
    moduleId: any;//模块的id
    private resourceUrl = USERCENTER_API;//模块的通用请求地址
    private queryUsersUrl = PERSONNEL_GET_USERS_API;//模块的获取所有人员请求地址
    private deleteUserUrl = PERSONNEL_COMPANY_DELETE_USER_API;//模块的移除关联机构请求地址
    private findByLoginUrl = COMPANY_FIND_PARENT_ID_API;//模块的获取机构请求地址
    private createOwnUrl = PERSONNEL_COMPANY_API;//模块的人员关联机构关联请求地址
    private modifyPasswordUrl = PERSONNEL_MODIFY_PASSWORD_API;//模块的修改密码请求地址
    private createUserUrl = CREATEUER_API;//新建用户
    private deleteUserNewUrl = DELETEUER_API;//移除用户
    private updateUserUrl = UPDATEUER_API;//更新用户用户
    constructor(
        private http: HttpClient
    ) {
    }

    modifyPassword(req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.put<PersonnelManageModel>(this.modifyPasswordUrl, req, {
            params: options,
            observe: 'response'
        });
    }
    query(req?: any): Observable<HttpResponse<PersonnelManageModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<PersonnelManageModel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    queryUsers(req?: any): Observable<HttpResponse<PersonnelManageModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<PersonnelManageModel[]>(this.queryUsersUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<PersonnelManageModel>> {
        return this.http.get<PersonnelManageModel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    update(personnelManageModel: PersonnelManageModel): Observable<HttpResponse<PersonnelManageModel>> {
        return this.http.put<PersonnelManageModel>(this.resourceUrl, personnelManageModel, {observe: 'response'});
    }
    updateUser(personnelManageModel: PersonnelManageModel): Observable<HttpResponse<PersonnelManageModel>> {
        return this.http.put<PersonnelManageModel>(this.updateUserUrl, personnelManageModel, {observe: 'response'});
    }

    create(personnelManageModel: PersonnelManageModel): Observable<HttpResponse<PersonnelManageModel>> {
        return this.http.post<PersonnelManageModel>(this.resourceUrl, personnelManageModel, {observe: 'response'});
    }
    createUser(req: any, userDTO: PersonnelManageModel): Observable<HttpResponse<PersonnelManageModel>> {
        const options = createRequestOption(req);
        return this.http.post<PersonnelManageModel>(this.createUserUrl, userDTO,{
            params: options,
            observe: 'response'
        });
    }
    add(personnelManageModel: PersonnelManageModel): Observable<HttpResponse<PersonnelManageModel>> {
        const options = createRequestOption(personnelManageModel);
        return this.http.put<PersonnelManageModel>(this.resourceUrl, personnelManageModel, {
            params: options,
            observe: 'response'
        });
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    deleteUser_new(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.deleteUserNewUrl}/${id}`, {observe: 'response'});
    }
    findUserByLogin(login: any): Observable<HttpResponse<PersonnelManageModel>> {
        return this.http.get<PersonnelManageModel>(`${this.resourceUrl}/${login}`, {observe: 'response'});
    }
    findByLogin(login: any): Observable<HttpResponse<UserCompanyModel>> {
        return this.http.get<UserCompanyModel>(`${this.findByLoginUrl}?login=${login}`, {observe: 'response'});
    }
    createOwn(userCompanyModel: UserCompanyModel): Observable<HttpResponse<UserCompanyModel>> {
        return this.http.post<UserCompanyModel>(this.createOwnUrl, userCompanyModel, {observe: 'response'});
    }

    deleteUser(req?: any): Observable<HttpResponse<UserCompanyModel>> {
        const options = createRequestOption(req);
        return this.http.delete(this.deleteUserUrl,{
            params: options,
            observe: 'response'
        });
    }
}

