import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '@shared';
import {DepartmentUser} from '@shared';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_DINGDING_DEPARTMENT_LIST_API,
    WORKFLOW_DINGDING_DEPARTMENT_USER_API,
    WORKFLOW_TO_ATTENDANCE_IMPORT_DK_DEPARTMENT_LIST_API,
    WORKFLOW_TO_ATTENDANCE_IMPORT_DK_DEPARTMENT_USER_LIST_API,
    WORKFLOW_GET_DEPARTMENT_USER_API,
} from '../../../app.constants';
@Injectable()
export class DepartmentService {

    private resourceUrl = WORKFLOW_DINGDING_DEPARTMENT_LIST_API;

    private getDepartmentUserUrl = WORKFLOW_DINGDING_DEPARTMENT_USER_API;

    private get_department = WORKFLOW_TO_ATTENDANCE_IMPORT_DK_DEPARTMENT_LIST_API;
    private get_department_user = WORKFLOW_TO_ATTENDANCE_IMPORT_DK_DEPARTMENT_USER_LIST_API;
    private get_department_user_old = WORKFLOW_GET_DEPARTMENT_USER_API;

    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Department[]>> {
        const options = createRequestOption(req);
        return this.http.get<Department[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    queryDepartmentUser(req?: any): Observable<HttpResponse<DepartmentUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<DepartmentUser[]>(this.getDepartmentUserUrl, {
            params: options,
            observe: 'response'
        });
    }
    getDepartmentUser(req?: any): Observable<HttpResponse<DepartmentUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<DepartmentUser[]>(this.get_department_user_old, {
            params: options,
            observe: 'response'
        });
    }
    queryDepartment(req?: any): Observable<HttpResponse<string[]>> {
        const options = createRequestOption(req);
        return this.http.get<string[]>(this.get_department, {
            params: options,
            observe: 'response'
        });
    }
    queryDepartmentUsers(req?: any): Observable<HttpResponse<DepartmentUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<DepartmentUser[]>(this.get_department_user, {
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
}
