import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';

import {ClfRegisterModel} from './clf-register.model';
import {
    WORKFLOW_CUO_LOU_FA_API,
    WORKFLOW_CUO_LOU_FA_VIEWDATA_DAY_API,
    WORKFLOW_CUO_LOU_FA_VIEWDATA_MONTH_API,
    WORKFLOW_CUO_LOU_FA_VIEWDATA_YEAR_API,
    WORKFLOW_CUO_LOU_FA_SEARCH_BY_API,
    WORKFLOW_CUO_LOU_FA_BATCH_DELETE_API,
    WORKFLOW_CUO_LOU_FA_BATCH_EDIT_API,
    WORKFLOW_CUO_LOU_FA_EXPORT_API,
} from '../../../../../app.constants';

//售后登记管理
@Injectable()
export class ClfRegisterService {
    list:any;
    private resourceUrl = WORKFLOW_CUO_LOU_FA_API;
    private resourceUrl_viewData_day= WORKFLOW_CUO_LOU_FA_VIEWDATA_DAY_API;
    private resourceUrl_viewData_month= WORKFLOW_CUO_LOU_FA_VIEWDATA_MONTH_API;
    private resourceUrl_viewData_year= WORKFLOW_CUO_LOU_FA_VIEWDATA_YEAR_API;
    private resourceUrl_search= WORKFLOW_CUO_LOU_FA_SEARCH_BY_API;
    private resourceUrl_batch_delete= WORKFLOW_CUO_LOU_FA_BATCH_DELETE_API;
    private resourceUrl_batch_edit= WORKFLOW_CUO_LOU_FA_BATCH_EDIT_API;
    private resourceUrl_export= WORKFLOW_CUO_LOU_FA_EXPORT_API;

    constructor(private http: HttpClient) {
    }
    view_year(req?: any): Observable<HttpResponse<ClfRegisterModel>> {
        const options = createRequestOption(req);
        return this.http.get<ClfRegisterModel>(this.resourceUrl_viewData_year, {
            params: options,
            observe: 'response'
        });
    }
    view_month(req?: any): Observable<HttpResponse<ClfRegisterModel>> {
        const options = createRequestOption(req);
        return this.http.get<ClfRegisterModel>(this.resourceUrl_viewData_month, {
            params: options,
            observe: 'response'
        });
    }
    view_day(req?: any): Observable<HttpResponse<ClfRegisterModel>> {
        const options = createRequestOption(req);
        return this.http.get<ClfRegisterModel>(this.resourceUrl_viewData_day, {
            params: options,
            observe: 'response'
        });
    }

    query(req?: any): Observable<HttpResponse<ClfRegisterModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClfRegisterModel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    search(req?: any): Observable<HttpResponse<ClfRegisterModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClfRegisterModel[]>(this.resourceUrl_search, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<ClfRegisterModel>> {
        return this.http.get<ClfRegisterModel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(clfRegisterModel: ClfRegisterModel): Observable<HttpResponse<ClfRegisterModel>> {
        return this.http.put<ClfRegisterModel>(this.resourceUrl, clfRegisterModel, {observe: 'response'});
    }

    create(clfRegisterModel: ClfRegisterModel): Observable<HttpResponse<ClfRegisterModel>> {
        return this.http.post<ClfRegisterModel>(this.resourceUrl, clfRegisterModel, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    add(clfRegisterModel: ClfRegisterModel): Observable<HttpResponse<ClfRegisterModel>> {
        const options = createRequestOption(ClfRegisterModel);
        return this.http.put<ClfRegisterModel>(this.resourceUrl, clfRegisterModel, {
            params: options,
            observe: 'response'
        });
    }

    batch_update(clfRegisterModel: ClfRegisterModel): Observable<HttpResponse<ClfRegisterModel>> {
        const options = createRequestOption(clfRegisterModel);
        return this.http.put<ClfRegisterModel>(this.resourceUrl_batch_edit,clfRegisterModel, {
            params: options,
            observe: 'response'
        });
    }
    batch_delete(list:any): Observable<HttpResponse<ClfRegisterModel>> {
        return this.http.delete(`${this.resourceUrl_batch_delete}?list=${list}`, {observe: 'response'});
    }

    export(req?: any): Observable<HttpResponse<ClfRegisterModel[]>> {
        const options = createRequestOption(req);
        if(req){
            if(req.startTime){
                options.set('size',req.startTime);
            }
            if(req.endTime){
                options.set('size',req.startTime);
            }
            if(req.year){
                options.set('size',req.year);
            }
            if(req.month){
                options.set('size',req.month);
            }
        }
        return this.http.get<ClfRegisterModel[]>(this.resourceUrl_export, {
            params: options,
            observe: 'response'
        });
    }
}
