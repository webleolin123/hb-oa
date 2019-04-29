import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ZuanZhan} from './zuan-zhan.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_ZUAN_ZHAN_API,
    WORKFLOW_ZUAN_ZHAN_EXPORT_API,
    WORKFLOW_ZUAN_ZHAN_SEARCH_API,
} from '../../../../../../app.constants';
@Injectable()
export class ZuanZhanService {
    startTime: any;
    endTime: any;
    private resourceUrl = WORKFLOW_ZUAN_ZHAN_API;
    private resourceUrl_search = WORKFLOW_ZUAN_ZHAN_SEARCH_API;
    private resourceUrl_export= WORKFLOW_ZUAN_ZHAN_EXPORT_API;
    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<ZuanZhan[]>> {
        const options = createRequestOption(req);
        return this.http.get<ZuanZhan[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<ZuanZhan>> {
        return this.http.get<ZuanZhan>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(zuanZhan: ZuanZhan): Observable<HttpResponse<ZuanZhan>> {
        return this.http.put<ZuanZhan>(this.resourceUrl, zuanZhan, {observe: 'response'});
    }

    create(zuanZhan: ZuanZhan): Observable<HttpResponse<ZuanZhan>> {
        return this.http.post<ZuanZhan>(this.resourceUrl, zuanZhan, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ZuanZhan[]>> {
        const options = createRequestOption(req);
        return this.http.get<ZuanZhan[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    export(req?: any): Observable<HttpResponse<ZuanZhan[]>> {
        const options = createRequestOption(req);
        return this.http.get<ZuanZhan[]>(this.resourceUrl_export, {
            params: options,
            observe: 'response'
        });
    }
}
