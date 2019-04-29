import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthoritySettings} from './authority-settings.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_BUSINESS_PERMISSION_API,
    WORKFLOW_BUSINESS_PERMISSION_CREATE_PERMISSIONS_API,
    WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API,
    WORKFLOW_BUSINESS_PERMISSION_APPROVE_PERMISSIONS_API,
    WORKFLOW_BUSINESS_PERMISSION_SEARCH_API,
} from '../../../../app.constants';
@Injectable()
export class AuthoritySettingsService {

    private resourceUrl = WORKFLOW_BUSINESS_PERMISSION_API;
    private createPermissonsUrl = WORKFLOW_BUSINESS_PERMISSION_CREATE_PERMISSIONS_API;
    private getPermissionsByModuleIdUrl = WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API;
    private searchApprovePermissionsUrl = WORKFLOW_BUSINESS_PERMISSION_APPROVE_PERMISSIONS_API;
    // private searchUrl = WORKFLOW_BUSINESS_PERMISSION_SEARCH_API;
    // private resourceUrl_search = WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<AuthoritySettings[]>> {
        const options = createRequestOption(req);
        return this.http.get<AuthoritySettings[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    getPermissionsByModuleId(req?: any): Observable<HttpResponse<AuthoritySettings[]>> {
        const options = createRequestOption(req);
        return this.http.get<AuthoritySettings[]>(this.getPermissionsByModuleIdUrl, {
            params: options,
            observe: 'response'
        });
    }

    createPermissons(authoritySettings: AuthoritySettings): Observable<HttpResponse<AuthoritySettings>> {
        return this.http.post<AuthoritySettings>(this.createPermissonsUrl, authoritySettings, {observe: 'response'});
    }

    find(id: any): Observable<HttpResponse<AuthoritySettings>> {
        return this.http.get<AuthoritySettings>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(authoritySettings: AuthoritySettings): Observable<HttpResponse<AuthoritySettings>> {
        return this.http.put<AuthoritySettings>(this.resourceUrl, authoritySettings, {observe: 'response'});
    }

    create(authoritySettings: AuthoritySettings): Observable<HttpResponse<AuthoritySettings>> {
        return this.http.post<AuthoritySettings>(this.resourceUrl, authoritySettings, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    // search(req?: any): Observable<HttpResponse<AuthoritySettings[]>> {
    //     const options = createRequestOption(req);
    //     return this.http.get<AuthoritySettings[]>(this.resourceUrl_search, {
    //         params: options,
    //         observe: 'response'
    //     });
    // }
}
