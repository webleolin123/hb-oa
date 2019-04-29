import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {TaoKe} from './tao-ke.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_TAO_KE_API,
    WORKFLOW_TAO_KE_EXPORT_API,
    WORKFLOW_TAO_KE_SEARCH_API,
} from '../../../../../../app.constants';

@Injectable()
export class TaoKeService {
    private resourceUrl = WORKFLOW_TAO_KE_API;
    private resourceUrl_search = WORKFLOW_TAO_KE_SEARCH_API;
    private resourceUrl_export= WORKFLOW_TAO_KE_EXPORT_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<TaoKe[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaoKe[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }


    find(id: any): Observable<HttpResponse<TaoKe>> {
        return this.http.get<TaoKe>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(taoKe: TaoKe): Observable<HttpResponse<TaoKe>> {
        return this.http.put<TaoKe>(this.resourceUrl, taoKe, {observe: 'response'});
    }

    create(taoKe: TaoKe): Observable<HttpResponse<TaoKe>> {
        return this.http.post<TaoKe>(this.resourceUrl, taoKe, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TaoKe[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaoKe[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    export(req?: any): Observable<HttpResponse<TaoKe[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaoKe[]>(this.resourceUrl_export, {
            params: options,
            observe: 'response'
        });
    }

}
