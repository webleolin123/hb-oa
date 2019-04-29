import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Platform} from './platform.model';
import {createRequestOption} from '@shared';
import {WORKFLOW_PLATFORM_API, WORKFLOW_PLATFORM_SEARCH_API} from '../../../../../app.constants';
@Injectable()
export class PlatformService {
    private resourceUrl = WORKFLOW_PLATFORM_API;
    private searchUrl = WORKFLOW_PLATFORM_SEARCH_API;
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Platform[]>> {
        const options = createRequestOption(req);
        return this.http.get<Platform[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<Platform>> {
        return this.http.get<Platform>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(platform: Platform): Observable<HttpResponse<Platform>> {
        return this.http.put<Platform>(this.resourceUrl, platform, {observe: 'response'});
    }

    create(platform: Platform): Observable<HttpResponse<Platform>> {
        return this.http.post<Platform>(this.resourceUrl, platform, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    search(req?: any): Observable<HttpResponse<Platform[]>> {
        const options = createRequestOption(req);
        return this.http.get<Platform[]>(this.searchUrl, {
            params: options,
            observe: 'response'
        });
    }
}
