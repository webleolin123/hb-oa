import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Shop} from './shop.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_SHOP_API,
    WORKFLOW_SHOP_SEARCH_API,
} from '../../../../../app.constants';
@Injectable()
export class ShopService {
    private resourceUrl = WORKFLOW_SHOP_API;
    private searchUrl = WORKFLOW_SHOP_SEARCH_API;
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Shop[]>> {
        const options = createRequestOption(req);
        return this.http.get<Shop[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<Shop>> {
        return this.http.get<Shop>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    update(shop: Shop): Observable<HttpResponse<Shop>> {
        return this.http.put<Shop>(this.resourceUrl, shop, {observe: 'response'});
    }
    create(shop: Shop): Observable<HttpResponse<Shop>> {
        return this.http.post<Shop>(this.resourceUrl, shop, {observe: 'response'});
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    search(req?: any): Observable<HttpResponse<Shop[]>> {
        const options = createRequestOption(req);
        return this.http.get<Shop[]>(this.searchUrl, {
            params: options,
            observe: 'response'
        });
    }
}
