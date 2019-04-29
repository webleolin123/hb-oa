import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {FullReduce} from './full-reduce.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_REDUCES_LESS_API,
    WORKFLOW_REDUCES_LESS_SEARCH_API,
    WORKFLOW_REDUCES_API,
} from '../../../../../../app.constants';

@Injectable()
export class FullReduceService {

    private resourceUrl = WORKFLOW_REDUCES_LESS_API;
    private resourceUrl_search = WORKFLOW_REDUCES_LESS_SEARCH_API;
    private resourceUrl_detail = WORKFLOW_REDUCES_API;
    private resourceUrl_update ;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<FullReduce[]>> {
        const options = createRequestOption(req);
        return this.http.get<FullReduce[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<FullReduce>> {
        return this.http.get<FullReduce>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    findDetail(id: any): Observable<HttpResponse<FullReduce>> {
        return this.http.get<FullReduce>(`${this.resourceUrl_detail}/${id}`, {observe: 'response'});
    }

    update(fullReduce: FullReduce): Observable<HttpResponse<FullReduce>> {
        return this.http.put<FullReduce>(this.resourceUrl_update, fullReduce, {observe: 'response'});
    }

    create(fullReduce: FullReduce): Observable<HttpResponse<FullReduce>> {
        return this.http.post<FullReduce>(this.resourceUrl, fullReduce, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    search(req?: any): Observable<HttpResponse<FullReduce[]>> {
        const options = createRequestOption(req);
        return this.http.get<FullReduce[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
}
