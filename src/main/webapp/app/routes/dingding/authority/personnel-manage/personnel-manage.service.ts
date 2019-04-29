import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';

import {Personnel} from './personnel-manage.model';
import {
    WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API,
    WORKFLOW_DINGDING_PERMISSION_PERSONNEL_SEARCH_API,
} from '../../../../app.constants';

@Injectable()
export class PersonnelManageService {
    private resourceUrl = WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API;
    private resourceUrl_search = WORKFLOW_DINGDING_PERMISSION_PERSONNEL_SEARCH_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Personnel[]>> {
        const options = createRequestOption(req);
        return this.http.get<Personnel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    search(req?: any): Observable<HttpResponse<Personnel[]>> {
        const options = createRequestOption(req);
        return this.http.get<Personnel[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Personnel>> {
        return this.http.get<Personnel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(personnel: Personnel): Observable<HttpResponse<Personnel>> {
        return this.http.put<Personnel>(this.resourceUrl, personnel, {observe: 'response'});
    }

    create(personnel: Personnel): Observable<HttpResponse<Personnel>> {
        return this.http.post<Personnel>(this.resourceUrl, personnel, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    add(personnel: Personnel): Observable<HttpResponse<Personnel>> {
        const options = createRequestOption(Personnel);
        return this.http.put<Personnel>(this.resourceUrl, personnel, {
            params: options,
            observe: 'response'
        });
    }
}
