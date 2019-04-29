import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SettingsModel} from './settings.model';

@Injectable()
export class SettingsService {
    resourceUrl: any; //模块的通用请求地址
    constructor(private http: HttpClient) {
    }

    update(SettingsModel: SettingsModel): Observable<HttpResponse<SettingsModel>> {
        return this.http.put<SettingsModel>(this.resourceUrl, SettingsModel, {observe: 'response'});
    }

    modify(SettingsModel: SettingsModel): Observable<HttpResponse<SettingsModel>> {
        return this.http.post<SettingsModel>(this.resourceUrl, SettingsModel, {observe: 'response'});
    }
}
