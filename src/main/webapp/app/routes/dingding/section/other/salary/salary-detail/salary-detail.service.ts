import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';

import {SalaryInfo} from '../salary.model';
import {
    WORKFLOW_TO_SALARY_KEYCODE_API,
    WORKFLOW_TO_SALARY_DETAIL_SEARCH_API,
} from '../../../../../../app.constants';

//工资条新增--详情
@Injectable()
export class SalaryDetailService {
    public commonId: any;//保存临时变量id
    private resourceUrl = WORKFLOW_TO_SALARY_KEYCODE_API;
    private resourceUrl_search = WORKFLOW_TO_SALARY_DETAIL_SEARCH_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<SalaryInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalaryInfo[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    search(req?: any): Observable<HttpResponse<SalaryInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<SalaryInfo[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<SalaryInfo>> {
        return this.http.get<SalaryInfo>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(salaryInfo: SalaryInfo): Observable<HttpResponse<SalaryInfo>> {
        return this.http.put<SalaryInfo>(this.resourceUrl, salaryInfo, {observe: 'response'});
    }

    create(salaryInfo: SalaryInfo): Observable<HttpResponse<SalaryInfo>> {
        return this.http.post<SalaryInfo>(this.resourceUrl, salaryInfo, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    add(salaryInfo: SalaryInfo): Observable<HttpResponse<SalaryInfo>> {
        const options = createRequestOption(salaryInfo);
        return this.http.put<SalaryInfo>(this.resourceUrl, salaryInfo, {
            params: options,
            observe: 'response'
        });
    }
}
