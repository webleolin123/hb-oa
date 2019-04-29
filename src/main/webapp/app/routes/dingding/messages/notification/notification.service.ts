import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from './notification.model';
import {createRequestOption} from '@shared';
import {
    SERVER_API_URL,
    WORKFLOW_NOTICE_API,
} from '../../../../app.constants';

@Injectable()
export class NotificationService {

    private resourceUrl = SERVER_API_URL + WORKFLOW_NOTICE_API;
    private resourceUrl_batch_delete;
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Notification[]>> {
        const options = createRequestOption(req);
        return this.http.get<Notification[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Notification>> {
        return this.http.get<Notification>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(notification: Notification): Observable<HttpResponse<Notification>> {
        return this.http.put<Notification>(this.resourceUrl, notification, {observe: 'response'});
    }

    create(notification: Notification): Observable<HttpResponse<Notification>> {
        return this.http.post<Notification>(this.resourceUrl, notification, {observe: 'response'});
    }

    delete(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    batch_delete(list:any): Observable<HttpResponse<Notification>> {
        return this.http.delete(`${this.resourceUrl_batch_delete}?list=${list}`, {observe: 'response'});
    }
}
