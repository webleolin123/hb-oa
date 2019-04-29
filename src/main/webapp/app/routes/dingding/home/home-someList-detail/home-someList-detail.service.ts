import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';

import {HomeInfo} from '../home-model/home.model';
@Injectable()
export class HomeSomeListDetailService{
     public resourceUrl;

    tmp:any; //存放临时条件比如跳转查询的条件（见角色管理--查看人员）
    time:any; //存放临时条件比如月份2018-11
    list:any; //存放数组
    constructor(private http: HttpClient) {
    }
    query(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.resourceUrl, {
            params: options,
            observe: 'response'
        });
    }
}
