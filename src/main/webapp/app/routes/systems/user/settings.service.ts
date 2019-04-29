import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SettingsModel} from './settings.model';
import {
    CHANGE_PASSWORD_API,
    PERSONNEL_API,
} from 'app/app.constants';
@Injectable()
export class UserSettingsService {
    private changePasswordUrl = CHANGE_PASSWORD_API;
    private upDateUrl = PERSONNEL_API;
    constructor(private http: HttpClient) {
    }

    update(SettingsModel: SettingsModel): Observable<HttpResponse<SettingsModel>> {
        return this.http.post<SettingsModel>(this.upDateUrl, SettingsModel, {observe: 'response'});
    }

    modify(SettingsModel: SettingsModel): Observable<HttpResponse<SettingsModel>> {
        return this.http.post<SettingsModel>(this.changePasswordUrl, SettingsModel, {observe: 'response'});
    }
}
