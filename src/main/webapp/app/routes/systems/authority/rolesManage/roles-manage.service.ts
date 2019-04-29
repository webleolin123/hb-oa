import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {RolesManageModel} from './roles-manage.model';
import {createRequestOption} from '@shared/util/request-util';
import {
    ROLES_API,
    ROLES_DELETE_API,
    ROLES_CREATE_API,
} from 'app/app.constants';
@Injectable()
export class RolesManageService {
    moduleId: any;//模块的id
    private resourceUrl = ROLES_API;//模块的通用请求地址
    private deleteRoleUrl = ROLES_DELETE_API;//模块的删除请求地址
    private createRoleUrl = ROLES_CREATE_API;//模块的创建请求地址
    constructor(
        private http: HttpClient
    ) {
    }

    query(req?: any): Observable<HttpResponse<RolesManageModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<RolesManageModel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<RolesManageModel>> {
        return this.http.get<RolesManageModel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(rolesManageModel: RolesManageModel): Observable<HttpResponse<RolesManageModel>> {
        return this.http.put<RolesManageModel>(this.resourceUrl, rolesManageModel, {observe: 'response'});
    }

    create(rolesManageModel: RolesManageModel): Observable<HttpResponse<RolesManageModel>> {
        return this.http.post<RolesManageModel>(this.resourceUrl, rolesManageModel, {observe: 'response'});
    }
    add(rolesManageModel: RolesManageModel): Observable<HttpResponse<RolesManageModel>> {
        const options = createRequestOption(rolesManageModel);
        return this.http.put<RolesManageModel>(this.resourceUrl, rolesManageModel, {
            params: options,
            observe: 'response'
        });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    deleteRole(name: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.deleteRoleUrl}?name=${name}`, {observe: 'response'});
    }

    createRole(rolesManageModel: RolesManageModel): Observable<HttpResponse<RolesManageModel>> {
        const options = createRequestOption(rolesManageModel);
        return this.http.put<RolesManageModel>(this.createRoleUrl, rolesManageModel, {
            params: options,
            observe: 'response'
        });
    }

}

