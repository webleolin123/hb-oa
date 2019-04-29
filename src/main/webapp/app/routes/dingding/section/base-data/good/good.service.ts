import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Good} from './good.model';
import {createRequestOption} from '@shared';
import {WORKFLOW_GOOD_API, WORKFLOW_GOOD_SEARCH_API, WORKFLOW_GOOD_DETAI_API,WORKFLOW_FIND_GOOD_BY_SHOP_AND_BRAND_API} from '../../../../../app.constants';
import {GoodDetail} from "./detail/good-detail.model";

@Injectable()
export class GoodService {

    goodId: any;
    private resourceUrl = WORKFLOW_GOOD_API;
    private searchUrl = WORKFLOW_GOOD_SEARCH_API;
    private goodDetailUrl = WORKFLOW_GOOD_DETAI_API;
    private findGoodByShopUrl = WORKFLOW_FIND_GOOD_BY_SHOP_AND_BRAND_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Good[]>> {
        const options = createRequestOption(req);
        return this.http.get<Good[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    queryByShopIdAndBrandId(req?: any): Observable<HttpResponse<Good[]>> {
        const options = createRequestOption(req);
        return this.http.get<Good[]>(this.findGoodByShopUrl, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<Good>> {
        return this.http.get<Good>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    checkDetail(id: any): Observable<HttpResponse<GoodDetail>> {
        return this.http.post<any>(this.goodDetailUrl + '?id=' + id, {observe: 'response'});
    }

    update(good: Good): Observable<HttpResponse<Good>> {
        return this.http.put<Good>(this.resourceUrl, good, {observe: 'response'});
    }

    create(good: Good): Observable<HttpResponse<Good>> {
        return this.http.post<Good>(this.resourceUrl, good, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Good[]>> {
        const options = createRequestOption(req);
        return this.http.get<Good[]>(this.searchUrl, {
            params: options,
            observe: 'response'
        });
    }
}
