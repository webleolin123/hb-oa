import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DictManageModel} from './dict-manage.model';
import {createRequestOption} from '@shared/util/request-util';
import {DICTIONARY_API} from "../../../../app.constants";

@Injectable()
export class DictManageService {
    moduleId: any;//模块的id
    private resourceUrl = DICTIONARY_API;//模块的通用请求地址
    constructor(
        private http: HttpClient
    ) {}

    query(req?: any): Observable<HttpResponse<DictManageModel[]>> {
        const options = createRequestOption(req);
        return this.http.get<DictManageModel[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<HttpResponse<DictManageModel>> {
        return this.http.get<DictManageModel>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    update(dictManageModel: DictManageModel): Observable<HttpResponse<DictManageModel>> {
        return this.http.put<DictManageModel>(this.resourceUrl, dictManageModel, {observe: 'response'});
    }

    create(dictManageModel: DictManageModel): Observable<HttpResponse<DictManageModel>> {
        return this.http.post<DictManageModel>(this.resourceUrl, dictManageModel, {observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    add(dictManageModel: DictManageModel): Observable<HttpResponse<DictManageModel>> {
        const options = createRequestOption(dictManageModel);
        return this.http.put<DictManageModel>(this.resourceUrl, dictManageModel, {
            params: options,
            observe: 'response'
        });
    }
}

