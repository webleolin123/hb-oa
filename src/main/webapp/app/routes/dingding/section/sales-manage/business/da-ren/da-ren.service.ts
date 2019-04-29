import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {DaRen} from './da-ren.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_DA_REN_API,
    WORKFLOW_DA_REN_EXPORT_API,
    WORKFLOW_DA_REN_SEARCH_API,
} from '../../../../../../app.constants';

@Injectable()
export class DaRenService {

    private resourceUrl = WORKFLOW_DA_REN_API;
    private resourceUrl_search = WORKFLOW_DA_REN_SEARCH_API;
    private resourceUrl_export= WORKFLOW_DA_REN_EXPORT_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<DaRen[]>> {
        const options = createRequestOption(req);
        return this.http.get<DaRen[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<DaRen>> {
        return this.http.get<DaRen>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(daRen: DaRen): Observable<HttpResponse<DaRen>> {
        return this.http.put<DaRen>(this.resourceUrl, daRen, {observe: 'response'});
    }

    create(daRen: DaRen): Observable<HttpResponse<DaRen>> {
        return this.http.post<DaRen>(this.resourceUrl, daRen, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<DaRen[]>> {
        const options = createRequestOption(req);
        return this.http.get<DaRen[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    export(req?: any): Observable<HttpResponse<DaRen[]>> {
        const options = createRequestOption(req);
        return this.http.get<DaRen[]>(this.resourceUrl_export, {
            params: options,
            observe: 'response'
        });
    }

}
