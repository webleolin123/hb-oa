import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BusinessModule} from './business-module.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_BUSINESS_MODULE_API,
    WORKFLOW_BUSINESS_MODULE_GET_CHILD_OR_PARENT_MODULES_API,
    WORKFLOW_BUSINESS_MODULE_ADD_CHILD_RELATIONSHIP_API,
    WORKFLOW_BUSINESS_MODULE_ADD_PARENT_RELATIONSHIP_API,
    WORKFLOW_BUSINESS_MODULE_REMOVE_RELATIONSHIP_API,
} from '../../../../../app.constants';

@Injectable()
export class BusinessModuleService {
    level: any;
    private resourceUrl = WORKFLOW_BUSINESS_MODULE_API;
    private getParentOrChildModulesUrl = WORKFLOW_BUSINESS_MODULE_GET_CHILD_OR_PARENT_MODULES_API;
    private addChildRelationshipUrl = WORKFLOW_BUSINESS_MODULE_ADD_CHILD_RELATIONSHIP_API;
    private addParentRelationshipUrl = WORKFLOW_BUSINESS_MODULE_ADD_PARENT_RELATIONSHIP_API;
    private removeParentRelationshipUrl = WORKFLOW_BUSINESS_MODULE_REMOVE_RELATIONSHIP_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<BusinessModule[]>> {
        const options = createRequestOption(req);
        return this.http.get<BusinessModule[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    getParentOrChildModules(req?: any): Observable<HttpResponse<BusinessModule[]>> {
        const options = createRequestOption(req);
        return this.http.get<BusinessModule[]>(this.getParentOrChildModulesUrl, {
            params: options,
            observe: 'response'
        });
    }

    addChildRelationship(parentModuleIds: any, childModuleId: any): Observable<any> {
        return this.http.put<any>(this.addChildRelationshipUrl + '?parentModuleIds=' + parentModuleIds + '&childModuleId=' + childModuleId, null, {observe: 'response'});
    }

    addParentRelationship(parentModuleId: any, childModuleIds: any): Observable<any> {
        return this.http.put<any>(this.addParentRelationshipUrl + '?parentModuleId=' + parentModuleId + '&childModuleIds=' + childModuleIds, null, {observe: 'response'});
    }

    removeParentRelationship(parentModuleId: any, childModuleIds: any): Observable<any> {
        return this.http.put<any>(this.removeParentRelationshipUrl + '?parentModuleId=' + parentModuleId + '&childModuleIds=' + childModuleIds, null, {observe: 'response'});
    }

    find(id: any): Observable<HttpResponse<BusinessModule>> {
        return this.http.get<BusinessModule>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(businessModule: BusinessModule): Observable<HttpResponse<BusinessModule>> {
        return this.http.put<BusinessModule>(this.resourceUrl, businessModule, {observe: 'response'});
    }

    create(businessModule: BusinessModule): Observable<HttpResponse<BusinessModule>> {
        return this.http.post<BusinessModule>(this.resourceUrl, businessModule, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
