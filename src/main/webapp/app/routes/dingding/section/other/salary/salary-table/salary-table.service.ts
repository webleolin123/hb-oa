import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';
import {SalaryTableInfo} from './salary-table.model';
import {
    WORKFLOW_TO_SALARY_API,
} from '../../../../../../app.constants';

//工资条新增--详情
@Injectable()
export class SalaryTableService {
    public commonId: any;//保存临时变量id
    private resourceUrl_upload = WORKFLOW_TO_SALARY_API;

    constructor(private http: HttpClient) {
    }

    importCSVOrExcel(req: any, salaryExcelDTO: SalaryTableInfo): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.post<SalaryTableInfo>(this.resourceUrl_upload, salaryExcelDTO, {
            params: options,
            observe: 'response'
        });
    }
}
