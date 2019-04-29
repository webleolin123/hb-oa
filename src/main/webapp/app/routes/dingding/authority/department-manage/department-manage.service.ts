import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '@shared';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_SERACH_API,
    WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_API,
} from '../../../../app.constants';
@Injectable()
export class DepartmentManageService {

    private resourceUrl = WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_API;
    private resourceUrl_search = WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_SERACH_API;

    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Department[]>> {
        const options = createRequestOption(req);
        return this.http.get<Department[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<Department>> {
        return this.http.get<Department>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    update(department: Department): Observable<HttpResponse<Department>> {
        return this.http.put<Department>(this.resourceUrl, department, {observe: 'response'});
    }
    create(department: Department): Observable<HttpResponse<Department>> {
        return this.http.post<Department>(this.resourceUrl, department, {observe: 'response'});
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Department[]>> {
        const options = createRequestOption(req);
        return this.http.get<Department[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
}
