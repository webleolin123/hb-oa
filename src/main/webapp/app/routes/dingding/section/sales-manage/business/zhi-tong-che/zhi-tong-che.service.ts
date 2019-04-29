import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ZhiTongChe} from './zhi-tong-che.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_ZHI_TONG_CHE_API,
    WORKFLOW_ZHI_TONG_CHE_SEARCH_API,
    WORKFLOW_ZHI_TONG_CHE_EXPORT_API,
} from '../../../../../../app.constants';
@Injectable()
export class ZhiTongCheService {
    startTime: any;
    endTime: any;
    private resourceUrl = WORKFLOW_ZHI_TONG_CHE_API;
    private resourceUrl_search = WORKFLOW_ZHI_TONG_CHE_SEARCH_API;
    private resourceUrl_export= WORKFLOW_ZHI_TONG_CHE_EXPORT_API;
    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<ZhiTongChe[]>> {
        const options = createRequestOption(req);
        return this.http.get<ZhiTongChe[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<ZhiTongChe>> {
        return this.http.get<ZhiTongChe>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(zhiTongChe: ZhiTongChe): Observable<HttpResponse<ZhiTongChe>> {
        return this.http.put<ZhiTongChe>(this.resourceUrl, zhiTongChe, {observe: 'response'});
    }

    create(zhiTongChe: ZhiTongChe): Observable<HttpResponse<ZhiTongChe>> {
        return this.http.post<ZhiTongChe>(this.resourceUrl, zhiTongChe, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ZhiTongChe[]>> {
        const options = createRequestOption(req);
        return this.http.get<ZhiTongChe[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    export(req?: any): Observable<HttpResponse<ZhiTongChe[]>> {
        const options = createRequestOption(req);
        return this.http.get<ZhiTongChe[]>(this.resourceUrl_export, {
            params: options,
            observe: 'response'
        });
    }
}
