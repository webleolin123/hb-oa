import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';

import {HomeInfo} from '../home-model/home.model';
import {
  WORKFLOW_HOME_BUSINESS_SEARCH_API,
  WORKFLOW_HOME_GOODS_SEARCH_API,
  WORKFLOW_HOME_PERSON_SEARCH_API,
} from '../../../../app.constants';
@Injectable()
export class HomeSomeListService{
     public resourceUrl;

     public getTrend_dayTrend;//趋势图请求天数据
     public getTrend_monthTrend;//趋势图请求月数据
     public getTrend_yearTrend;//趋势图请求年数据

     private resourceUrl_search_business=WORKFLOW_HOME_BUSINESS_SEARCH_API;
     private resourceUrl_search_goods=WORKFLOW_HOME_GOODS_SEARCH_API;
     private resourceUrl_search_person=WORKFLOW_HOME_PERSON_SEARCH_API;

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

    find(id: any): Observable<HttpResponse<HomeInfo>> {
        return this.http.get<HomeInfo>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    update(homeInfo: HomeInfo): Observable<HttpResponse<HomeInfo>> {
        return this.http.put<HomeInfo>(this.resourceUrl, homeInfo, {observe: 'response'});
    }
    create(homeInfo: HomeInfo): Observable<HttpResponse<HomeInfo>> {
        return this.http.post<HomeInfo>(this.resourceUrl, homeInfo, {observe: 'response'});
    }
    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
    add(homeInfo: HomeInfo): Observable<HttpResponse<HomeInfo>> {
        const options = createRequestOption(HomeInfo);
        return this.http.put<HomeInfo>(this.resourceUrl,homeInfo, {
            params: options,
            observe: 'response'
        });
    }

    search_busibess(req?: any): Observable<HttpResponse<HomeInfo[]>> {
      const options = createRequestOption(req);
      return this.http.get<HomeInfo[]>(this.resourceUrl_search_business, {
        params: options,
        observe: 'response'
      });
    }
    search_goods(req?: any): Observable<HttpResponse<HomeInfo[]>> {
      const options = createRequestOption(req);
      return this.http.get<HomeInfo[]>(this.resourceUrl_search_goods, {
        params: options,
        observe: 'response'
      });
    }
     search_person(req?: any): Observable<HttpResponse<HomeInfo[]>> {
      const options = createRequestOption(req);
      return this.http.get<HomeInfo[]>(this.resourceUrl_search_person, {
        params: options,
        observe: 'response'
      });
    }

    getDayTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
      const options = createRequestOption(req);
      return this.http.get<HomeInfo[]>(this.getTrend_dayTrend, {
        params: options,
        observe: 'response'
      });
    }
    getMonthTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
      const options = createRequestOption(req);
      return this.http.get<HomeInfo[]>(this.getTrend_monthTrend, {
        params: options,
        observe: 'response'
      });
    }
    getYearTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
      const options = createRequestOption(req);
      return this.http.get<HomeInfo[]>(this.getTrend_yearTrend, {
        params: options,
        observe: 'response'
      });
    }
}
