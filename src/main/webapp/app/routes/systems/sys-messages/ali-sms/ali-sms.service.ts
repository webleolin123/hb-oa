import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AliSms} from './ali-sms.model';
import {createRequestOption} from '@shared';
import {TASK_ALI_SMS_PUSH_API} from '../../../../app.constants';
@Injectable()
export class AliSmsService {

    private resourceUrl = TASK_ALI_SMS_PUSH_API;
    private resourceUrl_search;

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<AliSms[]>> {
        const options = createRequestOption(req);
        return this.http.get<AliSms[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<AliSms>> {
        return this.http.get<AliSms>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(aliSms: AliSms): Observable<HttpResponse<AliSms>> {
        return this.http.put<AliSms>(this.resourceUrl, aliSms, {observe: 'response'});
    }

    create(aliSms: AliSms): Observable<HttpResponse<AliSms>> {
        return this.http.post<AliSms>(this.resourceUrl, aliSms, {observe: 'response'});
    }

    delete(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AliSms[]>> {
        const options = createRequestOption(req);
        return this.http.get<AliSms[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
}
