import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {PreSaleModel} from './pre-sale.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_PRESELLS_API,
    WORKFLOW_PRESELLS_SEARCH_API,
} from '../../../../../../app.constants';

@Injectable()
export class PreSaleService {

    private resourceUrl = WORKFLOW_PRESELLS_API;
    private resourceUrl_search = WORKFLOW_PRESELLS_SEARCH_API;
    private resourceUrl_update ;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<PreSaleModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<PreSaleModel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<PreSaleModel>> {
        return this.http.get<PreSaleModel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(preSale: PreSaleModel): Observable<HttpResponse<PreSaleModel>> {
        return this.http.put<PreSaleModel>(this.resourceUrl_update, preSale, {observe: 'response'});
    }

    create(preSale: PreSaleModel): Observable<HttpResponse<PreSaleModel>> {
        return this.http.post<PreSaleModel>(this.resourceUrl, preSale, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    search(req?: any): Observable<HttpResponse<PreSaleModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<PreSaleModel[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
}
