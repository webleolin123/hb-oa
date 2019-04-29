import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Price} from './price.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_PRICE_MANAGE_API,
    WORKFLOW_PRICE_MANAGE_SEARCH_API,
    WORKFLOW_PRICE_MANAGE_UPDATE_API,
} from '../../../../../../app.constants';

@Injectable()
export class PriceService {

    private resourceUrl = WORKFLOW_PRICE_MANAGE_API;
    private resourceUrl_search = WORKFLOW_PRICE_MANAGE_SEARCH_API;
    private resourceUrl_update = WORKFLOW_PRICE_MANAGE_UPDATE_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Price[]>> {
        const options = createRequestOption(req);
        return this.http.get<Price[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Price>> {
        return this.http.get<Price>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(price: Price): Observable<HttpResponse<Price>> {
        return this.http.put<Price>(this.resourceUrl_update, price, {observe: 'response'});
    }

    create(price: Price): Observable<HttpResponse<Price>> {
        return this.http.post<Price>(this.resourceUrl, price, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    search(req?: any): Observable<HttpResponse<Price[]>> {
        const options = createRequestOption(req);
        return this.http.get<Price[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
}
