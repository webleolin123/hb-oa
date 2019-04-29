import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Coupon} from './coupons.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_COUPONS_COUPON_API,
    WORKFLOW_COUPONS_SEARCH_API,
    WORKFLOW_COUPONS_API,
} from '../../../../../../app.constants';

@Injectable()
export class CouponsService {

    private resourceUrl = WORKFLOW_COUPONS_COUPON_API;
    private resourceUrl_search = WORKFLOW_COUPONS_SEARCH_API;
    private resourceUrl_detail = WORKFLOW_COUPONS_API;
    private resourceUrl_update ;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Coupon[]>> {
        const options = createRequestOption(req);
        return this.http.get<Coupon[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Coupon>> {
        return this.http.get<Coupon>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    findDetail(id: any): Observable<HttpResponse<Coupon>> {
        return this.http.get<Coupon>(`${this.resourceUrl_detail}/${id}`, {observe: 'response'});
    }

    update(coupon: Coupon): Observable<HttpResponse<Coupon>> {
        return this.http.put<Coupon>(this.resourceUrl_update, coupon, {observe: 'response'});
    }

    create(coupon: Coupon): Observable<HttpResponse<Coupon>> {
        return this.http.post<Coupon>(this.resourceUrl, coupon, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    search(req?: any): Observable<HttpResponse<Coupon[]>> {
        const options = createRequestOption(req);
        return this.http.get<Coupon[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
}
