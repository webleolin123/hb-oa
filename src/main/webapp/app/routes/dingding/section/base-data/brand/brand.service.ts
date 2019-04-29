import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Brand} from './brand.model';
import {createRequestOption} from '@shared';
import {WORKFLOW_BRAND_API, WORKFLOW_BRAND_SEARCH_API} from '../../../../../app.constants';

@Injectable()
export class BrandService {
    private resourceUrl = WORKFLOW_BRAND_API;
    private searchUrl = WORKFLOW_BRAND_SEARCH_API;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<Brand[]>> {
        const options = createRequestOption(req);
        return this.http.get<Brand[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Brand>> {
        return this.http.get<Brand>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(brand: Brand): Observable<HttpResponse<Brand>> {
        return this.http.put<Brand>(this.resourceUrl, brand, {observe: 'response'});
    }

    create(brand: Brand): Observable<HttpResponse<Brand>> {
        return this.http.post<Brand>(this.resourceUrl, brand, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Brand[]>> {
        const options = createRequestOption(req);
        return this.http.get<Brand[]>(this.searchUrl, {
            params: options,
            observe: 'response'
        });
    }
}
