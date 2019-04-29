import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {StockTransferModel} from './stock-transfer.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_STOCK_MANAGE_API,
    WORKFLOW_STOCK_MANAGE_SEARCH_API,
} from '../../../../../../app.constants';

@Injectable()
export class StockTransferService {

    private resourceUrl = WORKFLOW_STOCK_MANAGE_API;
    private resourceUrl_search = WORKFLOW_STOCK_MANAGE_SEARCH_API;
    private resourceUrl_update ;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<StockTransferModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockTransferModel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<StockTransferModel>> {
        return this.http.get<StockTransferModel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(loadUploadModel: StockTransferModel): Observable<HttpResponse<StockTransferModel>> {
        return this.http.put<StockTransferModel>(this.resourceUrl_update, loadUploadModel, {observe: 'response'});
    }

    create(loadUploadModel: StockTransferModel): Observable<HttpResponse<StockTransferModel>> {
        return this.http.post<StockTransferModel>(this.resourceUrl, loadUploadModel, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    search(req?: any): Observable<HttpResponse<StockTransferModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockTransferModel[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
}
