import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';

import {AttendanceModel} from './attendance.model';
import {
    WORKFLOW_TO_APERATIONSATES_ATTENDANCE_API,
    WORKFLOW_TO_ATTENDANCE_SEARCH_API,
} from '../../../../../app.constants';
//工资条新增--详情
@Injectable()
export class AttendanceService{
     private resourceUrl=WORKFLOW_TO_APERATIONSATES_ATTENDANCE_API;
     private resourceUrl_search=WORKFLOW_TO_ATTENDANCE_SEARCH_API;

    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<AttendanceModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<AttendanceModel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
    search(req?: any): Observable<HttpResponse<AttendanceModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<AttendanceModel[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }
    find(id: any): Observable<HttpResponse<AttendanceModel>> {
        return this.http.get<AttendanceModel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    update(attendanceModel: AttendanceModel): Observable<HttpResponse<AttendanceModel>> {
        return this.http.put<AttendanceModel>(this.resourceUrl, attendanceModel, {observe: 'response'});
    }
    create(attendanceModel: AttendanceModel): Observable<HttpResponse<AttendanceModel>> {
        return this.http.post<AttendanceModel>(this.resourceUrl, attendanceModel, {observe: 'response'});
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    add(attendanceModel: AttendanceModel): Observable<HttpResponse<AttendanceModel>> {
        const options = createRequestOption(attendanceModel);
        return this.http.put<AttendanceModel>(this.resourceUrl,attendanceModel, {
            params: options,
            observe: 'response'
        });
    }
}
