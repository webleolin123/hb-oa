import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';

import {Roles} from './roles-manage.model';
import {
    WORKFLOW_DINGDING_PERMISSION_ROLES_API,
    WORKFLOW_DINGDING_PERMISSION_ROLES_SEARCH_API,
    WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_API,
    WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_BY_PERSON_API,
    WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_ADD_API,
    WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_REMOVE_API,
} from '../../../../app.constants';

@Injectable()
export class RolesManageService {
    private resourceUrl = WORKFLOW_DINGDING_PERMISSION_ROLES_API;
    private resourceUrl_search = WORKFLOW_DINGDING_PERMISSION_ROLES_SEARCH_API;

    private addRoles_query = WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_API;
    private removeRoles_query = WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_BY_PERSON_API;

    private add_persons_roles = WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_ADD_API;
    private remove_persons_roles = WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_REMOVE_API;
    private add_roles = WORKFLOW_DINGDING_PERMISSION_ROLES_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Roles[]>> {
        const options = createRequestOption(req);
        return this.http.get<Roles[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    search(req?: any): Observable<HttpResponse<Roles[]>> {
        const options = createRequestOption(req);
        return this.http.get<Roles[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Roles>> {
        return this.http.get<Roles>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(roles: Roles): Observable<HttpResponse<Roles>> {
        return this.http.put<Roles>(this.resourceUrl, roles, {observe: 'response'});
    }

    create(roles: Roles): Observable<HttpResponse<Roles>> {
        return this.http.post<Roles>(this.resourceUrl, roles, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    add(roles: Roles): Observable<HttpResponse<Roles>> {
        const options = createRequestOption(Roles);
        return this.http.put<Roles>(this.resourceUrl, roles, {
            params: options,
            observe: 'response'
        });
    }

    addRoles(roles: Roles): Observable<HttpResponse<Roles>> {
        const options = createRequestOption(Roles);
        return this.http.put<Roles>(this.add_roles, roles, {
            params: options,
            observe: 'response'
        });
    }
    addPersonsAndRoles(roles: Roles): Observable<HttpResponse<Roles>> {
        const options = createRequestOption(roles);
        return this.http.put<Roles>(this.add_persons_roles,roles, {
            params: options,
            observe: 'response'
        });
    }
    removePersonsAndRoles(roles: Roles): Observable<HttpResponse<Roles>> {
        const options = createRequestOption(roles);
        return this.http.put<Roles>(this.remove_persons_roles,roles, {
            params: options,
            observe: 'response'
        });
    }

    addRolesQuery(req?: any): Observable<HttpResponse<Roles[]>> {
        const options = createRequestOption(req);
        return this.http.get<Roles[]>(this.addRoles_query, {
            params: options,
            observe: 'response'
        });
    }
    removeRolesQuery(req?: any): Observable<HttpResponse<Roles[]>> {
        const options = createRequestOption(req);
        return this.http.get<Roles[]>(this.removeRoles_query, {
            params: options,
            observe: 'response'
        });
    }

}
