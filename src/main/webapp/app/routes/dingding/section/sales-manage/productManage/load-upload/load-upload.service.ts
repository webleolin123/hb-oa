import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LoadUploadModel} from './load-upload.model';
import {createRequestOption} from '@shared';
import {
    WORKFLOW_SHELVES_API,
    WORKFLOW_SHELVES_SEARCH_API,
} from '../../../../../../app.constants';

@Injectable()
export class LoadUploadService {

    private resourceUrl = WORKFLOW_SHELVES_API;
    private resourceUrl_search = WORKFLOW_SHELVES_SEARCH_API;
    private resourceUrl_update ;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<LoadUploadModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<LoadUploadModel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<LoadUploadModel>> {
        return this.http.get<LoadUploadModel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(loadUploadModel: LoadUploadModel): Observable<HttpResponse<LoadUploadModel>> {
        return this.http.put<LoadUploadModel>(this.resourceUrl_update, loadUploadModel, {observe: 'response'});
    }

    create(loadUploadModel: LoadUploadModel): Observable<HttpResponse<LoadUploadModel>> {
        return this.http.post<LoadUploadModel>(this.resourceUrl, loadUploadModel, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    search(req?: any): Observable<HttpResponse<LoadUploadModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<LoadUploadModel[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
}
