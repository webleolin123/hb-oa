import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaiduSms} from './baidu-sms.model';
import {createRequestOption} from '@shared';
import {
    TASK_BAIDU_PUSH_RECORD_API,
    TASK_BAIDU_PUSH_TO_ALL_API,
    TASK_BAIDU_PUSH_TO_SINGLE_API,
    TASK_BAIDU_PUSH_TO_TAG_API,
    TASK_BAIDU_PUSH_QUERY_MSG_STATUS_API,
    TASK_BAIDU_PUSH_DEVICE_NUM_IN_TAG_API,
    TASK_BAIDU_PUSH_ADD_DEVICE_TO_TAG_API,
    TASK_BAIDU_PUSH_DEL_DEVICE_FROM_TAG_API,
    TASK_BAIDU_PUSH_CREATE_TAG_API,
    TASK_BAIDU_PUSH_QUERY_TAG_API,
    TASK_BAIDU_PUSH_DEL_TAG_API
} from '../../../../app.constants';
@Injectable()
export class BaiduSmsService {
    private resourceUrl_search;
    private resourceUrl = TASK_BAIDU_PUSH_RECORD_API;
    private push2allUrl = TASK_BAIDU_PUSH_TO_ALL_API;
    private push2singleUrl = TASK_BAIDU_PUSH_TO_SINGLE_API;
    private push2tagUrl = TASK_BAIDU_PUSH_TO_TAG_API;
    private queryMsgStatusUrl = TASK_BAIDU_PUSH_QUERY_MSG_STATUS_API;
    private queryDeviceNumInTagUrl = TASK_BAIDU_PUSH_DEVICE_NUM_IN_TAG_API;
    private addDevice2TagUrl = TASK_BAIDU_PUSH_ADD_DEVICE_TO_TAG_API;
    private delDevice4TagUrl = TASK_BAIDU_PUSH_DEL_DEVICE_FROM_TAG_API;
    private createTagUrl = TASK_BAIDU_PUSH_CREATE_TAG_API;
    private queryTagsUrl = TASK_BAIDU_PUSH_QUERY_TAG_API;
    private delTagUrl = TASK_BAIDU_PUSH_DEL_TAG_API;

    constructor(private http: HttpClient) {
    }


    query(req?: any): Observable<HttpResponse<BaiduSms[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaiduSms[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<BaiduSms>> {
        return this.http.get<BaiduSms>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(baiduSms: BaiduSms): Observable<HttpResponse<BaiduSms>> {
        return this.http.put<BaiduSms>(this.resourceUrl, baiduSms, {observe: 'response'});
    }

    create(baiduSms: BaiduSms): Observable<HttpResponse<BaiduSms>> {
        return this.http.post<BaiduSms>(this.resourceUrl, baiduSms, {observe: 'response'});
    }

    delete(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<BaiduSms[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaiduSms[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    // queryMsgStatus(id: any): Observable<any> {
    //     return this.http.get(`${this.queryMsgStatusUrl}/${id}`).map((res: Response) => res.json());
    // }
    //
    // queryDeviceNumInTag(id: any): Observable<any> {
    //     return this.http.get(`${this.queryDeviceNumInTagUrl}/${id}`).map((res: Response) => res.json());
    // }
    //
    // queryTags(start: any, limit: any, deviceType: any): Observable<HttpResponse<any>> {
    //     return this.http.post<any>(this.queryTagsUrl + '?start=' + start + '&limit=' + limit + '&deviceType=' + deviceType, {observe: 'response'});
    // }
    //
    // push2all(title: any, content: any, custom: any, kind: any, deviceType: any, messageType: any): Observable<HttpResponse<any>> {
    //     return this.http.post<any>(this.push2allUrl + '?title=' + title + '&content=' + content + '&custom=' + custom + '&kind=' + kind + '&deviceType=' + deviceType + '&messageType=' + messageType, {observe: 'response'});
    // }
    //
    // push2tag(tagName: any, title: any, content: any, custom: any, kind: any, deviceType: any, messageType: any): Observable<HttpResponse<any>> {
    //     return this.http.post<any>(this.push2tagUrl + '?tagName=' + tagName + '&title=' + title + '&content=' + content + '&custom=' + custom + '&kind=' + kind + '&deviceType=' + deviceType + '&messageType=' + messageType, {observe: 'response'});
    // }
    //
    // push2single(login: any, title: any, content: any, custom: any, kind: any, deviceType: any, messageType: any): Observable<HttpResponse<any>> {
    //     return this.http.post<any>(this.push2singleUrl + '?login=' + login + '&title=' + title + '&content=' + content + '&custom=' + custom + '&kind=' + kind + '&deviceType=' + deviceType + '&messageType=' + messageType, {observe: 'response'});
    // }
    //
    // addDevice2Tag(tagId: any, login: any, deviceType: any): Observable<HttpResponse<any>> {
    //     return this.http.post<any>(this.addDevice2TagUrl + '?login=' + login + '&deviceType=' + deviceType + '&tagId=' + tagId, {observe: 'response'});
    // }
    //
    // delDevice4Tag(tagId: any, login: any, deviceType: any): Observable<HttpResponse<any>> {
    //     return this.http.post<any>(this.delDevice4TagUrl + '?login=' + login + '&deviceType=' + deviceType + '&tagId=' + tagId, {observe: 'response'});
    // }
    //
    // createTag(tagName: any, deviceType: any): Observable<HttpResponse<any>> {
    //     return this.http.post<any>(this.createTagUrl + '?tagName=' + tagName + '&deviceType=' + deviceType, {observe: 'response'});
    // }
    //
    //
    // delTag(tagName: any, deviceType: any): Observable<HttpResponse<any>> {
    //     return this.http.post<any>(this.delTagUrl + '?tagName=' + tagName + '&deviceType=' + deviceType, {observe: 'response'});
    // }

}
