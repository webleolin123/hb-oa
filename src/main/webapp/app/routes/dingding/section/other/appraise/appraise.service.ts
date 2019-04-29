import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appraise} from './appraise.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_APPRAISE_API,
    WORKFLOW_UPLOAD_PARSE_HTML_API,
    WORKFLOW_APPRAISE_ORDER_API,
    WORKFLOW_APPRAISE_SEARCH_BY_CUSTOMID_API,
    WORKFLOW_APPRAISE_SEARCH_BY_GOODSID_API,
    WORKFLOW_APPRAISE_SEARCH_BY_ORDERCODE_API,
    WORKFLOW_APPRAISE_SEARCH_BY_LABELS_API,
    WORKFLOW_APPRAISE_SEARCH_BY_CONTENT_API,
    WORKFLOW_APPRAISE_FIND_BY_TIME_BETWEEN_API,
    WORKFLOW_APPRAISE_BATCH_MODIFY_API,
    WORKFLOW_APPRAISE_BATCH_DELETE_API,
    WORKFLOW_APPRAISE_SEARCH_BY_STORE_NAME_API
} from '../../../../../app.constants';
import {AttendanceTableInfo} from "../attendance/attendance-table/attendance-table.model";
@Injectable()
export class AppraiseService {
    appraiseId: any;
    startTime: any;
    endTime: any;
    storeName: string;
    ids: string;
    private resourceUrl = WORKFLOW_APPRAISE_ORDER_API;
    // private queryUrl = WORKFLOW_APPRAISE_API;
    private uploadUrl = WORKFLOW_UPLOAD_PARSE_HTML_API;
    private findAllByCustomIdUrl = WORKFLOW_APPRAISE_SEARCH_BY_CUSTOMID_API;
    private findAllByGoodsIdUrl = WORKFLOW_APPRAISE_SEARCH_BY_GOODSID_API;
    private findAllByOrderCodeUrl = WORKFLOW_APPRAISE_SEARCH_BY_ORDERCODE_API;
    private findAllByLabelsUrl = WORKFLOW_APPRAISE_SEARCH_BY_LABELS_API;
    private findAllByContentUrl = WORKFLOW_APPRAISE_SEARCH_BY_CONTENT_API;
    private findAllByStoreNameUrl = WORKFLOW_APPRAISE_SEARCH_BY_STORE_NAME_API;
    private findByTimeBetweenUrl = WORKFLOW_APPRAISE_FIND_BY_TIME_BETWEEN_API;
    private batchModifyUrl = WORKFLOW_APPRAISE_BATCH_MODIFY_API;
    private batchDeleteUrl = WORKFLOW_APPRAISE_BATCH_DELETE_API;
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Appraise[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appraise[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    findAllByCustomId(req?: any): Observable<HttpResponse<Appraise[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appraise[]>(this.findAllByCustomIdUrl, {
            params: options,
            observe: 'response'
        });
    }
    findAllByGoodsId(req?: any): Observable<HttpResponse<Appraise[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appraise[]>(this.findAllByGoodsIdUrl, {
            params: options,
            observe: 'response'
        });
    }
    findAllByOrderCode(req?: any): Observable<HttpResponse<Appraise[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appraise[]>(this.findAllByOrderCodeUrl, {
            params: options,
            observe: 'response'
        });
    }
    findAllByLabels(req?: any): Observable<HttpResponse<Appraise[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appraise[]>(this.findAllByLabelsUrl, {
            params: options,
            observe: 'response'
        });
    }
    findAllByContent(req?: any): Observable<HttpResponse<Appraise[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appraise[]>(this.findAllByContentUrl, {
            params: options,
            observe: 'response'
        });
    }
    findAllByStoreName(req?: any): Observable<HttpResponse<Appraise[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appraise[]>(this.findAllByStoreNameUrl, {
            params: options,
            observe: 'response'
        });
    }
    findByTimeBetween(req?: any): Observable<HttpResponse<Appraise[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appraise[]>(this.findByTimeBetweenUrl, {
            params: options,
            observe: 'response'
        });
    }
    batchModify(ids: any, info: any, kind: any): Observable<any> {
        return this.http.put<Appraise>(this.batchModifyUrl + '?ids=' + ids + '&info=' + info + '&kind=' + kind, null, {observe: 'response'});
    }
    batchDelete(ids: any): Observable<any> {
        return this.http.put<Appraise>(this.batchDeleteUrl + '?ids=' + ids, null, {observe: 'response'});
    }
    uploadHtmlUrl(file: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.uploadUrl, file, {observe: 'response'});
    }
    find(id: any): Observable<HttpResponse<Appraise>> {
        return this.http.get<Appraise>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    update(appraise: Appraise): Observable<HttpResponse<Appraise>> {
        return this.http.put<Appraise>(this.resourceUrl, appraise, {observe: 'response'});
    }
    create(appraise: Appraise): Observable<HttpResponse<Appraise>> {
        return this.http.post<Appraise>(this.resourceUrl, appraise, {observe: 'response'});
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
