import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';
import {AttendanceTableInfo} from './attendance-table.model';
import {
    WORKFLOW_TO_ATTENDANCE_API,
    WORKFLOW_TO_ATTENDANCE_IMPORT_DK_API,
} from '../../../../../../app.constants';

//考勤新增--详情
@Injectable()
export class AttendanceTableService {
    private resourceUrl_upload = WORKFLOW_TO_ATTENDANCE_API;
    private resourceUrl_upload_DK = WORKFLOW_TO_ATTENDANCE_IMPORT_DK_API;

    constructor(private http: HttpClient) {
    }

    importCSVOrExcel(req: any, attendanceExcelDTO: AttendanceTableInfo): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.post<AttendanceTableInfo>(this.resourceUrl_upload, attendanceExcelDTO, {
            params: options,
            observe: 'response'
        });
    }
    importCSVOrExcel_DK(req: any, signExcelDTO: AttendanceTableInfo): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.post<AttendanceTableInfo>(this.resourceUrl_upload_DK, signExcelDTO, {
            params: options,
            observe: 'response'
        });
    }
}
