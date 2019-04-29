import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Gift} from './gift.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_GIFTS_API,
    WORKFLOW_GIFTS_SEARCH_API,
} from '../../../../../../app.constants';

@Injectable()
export class GiftService {

    private resourceUrl = WORKFLOW_GIFTS_API;
    private resourceUrl_search = WORKFLOW_GIFTS_SEARCH_API;
    private resourceUrl_update ;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Gift[]>> {
        const options = createRequestOption(req);
        return this.http.get<Gift[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Gift>> {
        return this.http.get<Gift>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(gift: Gift): Observable<HttpResponse<Gift>> {
        return this.http.put<Gift>(this.resourceUrl_update, gift, {observe: 'response'});
    }

    create(gift: Gift): Observable<HttpResponse<Gift>> {
        return this.http.post<Gift>(this.resourceUrl, gift, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    search(req?: any): Observable<HttpResponse<Gift[]>> {
        const options = createRequestOption(req);
        return this.http.get<Gift[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
}
