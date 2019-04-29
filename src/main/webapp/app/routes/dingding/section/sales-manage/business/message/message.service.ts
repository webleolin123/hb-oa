import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from './message.model';
import {createRequestOption} from '@shared';
import {WORKFLOW_MESSAGE_API,WORKFLOW_MESSAGE_SEARCH_API } from '../../../../../../app.constants';
@Injectable()
export class MessageService {
    private resourceUrl = WORKFLOW_MESSAGE_API;
    private resourceUrl_search = WORKFLOW_MESSAGE_SEARCH_API;
    private resourceUrl_export;

    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<Message[]>> {
        const options = createRequestOption(req);
        return this.http.get<Message[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<Message>> {
        return this.http.get<Message>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(message: Message): Observable<HttpResponse<Message>> {
        return this.http.put<Message>(this.resourceUrl, message, {observe: 'response'});
    }

    create(message: Message): Observable<HttpResponse<Message>> {
        return this.http.post<Message>(this.resourceUrl, message, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Message[]>> {
        const options = createRequestOption(req);
        return this.http.get<Message[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    export(req?: any): Observable<HttpResponse<Message[]>> {
        const options = createRequestOption(req);
        return this.http.get<Message[]>(this.resourceUrl_export, {
            params: options,
            observe: 'response'
        });
    }
}
