import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';

import {HomeInfo} from './home-model/home.model';
import {
  WORKFLOW_HOME_API,
  WORKFLOW_HOME_YEAR_TREND_API,
  WORKFLOW_HOME_MONTH_TREND_API,
  WORKFLOW_HOME_DAY_TREND_API,
  WORKFLOW_HOME_YEAR_TREND_EXPORT_API,//年趋势数据导出
  WORKFLOW_HOME_MONTH_TREND_EXPORT_API,//月趋势导出
  WORKFLOW_HOME_DAY_TREND_EXPORT_API,//日趋势数据导出
} from '../../../app.constants';
@Injectable()
export class HomeService{
     private resourceUrl=WORKFLOW_HOME_API;

     private getTrend_dayTrend=WORKFLOW_HOME_DAY_TREND_API;//趋势图请求天数据
     private getTrend_monthTrend=WORKFLOW_HOME_MONTH_TREND_API;//趋势图请求月数据
     private getTrend_yearTrend=WORKFLOW_HOME_YEAR_TREND_API;//趋势图请求年数据

     private exportUrl_dayTrend=WORKFLOW_HOME_DAY_TREND_EXPORT_API;
     private exportUrl_monthTrend=WORKFLOW_HOME_MONTH_TREND_EXPORT_API;
     private exportUrl_yearTrend=WORKFLOW_HOME_YEAR_TREND_EXPORT_API;

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

    export_dayTrend(req?: any): Observable<HttpResponse<HomeInfo[]>> {
    const options = createRequestOption(req);
    if(req){
      if(req.startTime){
        options.set('size',req.startTime);
      }
      if(req.endTime){
        options.set('size',req.startTime);
      }
    }
    return this.http.get<HomeInfo[]>(this.exportUrl_dayTrend, {
      params: options,
      observe: 'response'
    });
  }
    export_monthTrend(req?: any): Observable<HttpResponse<HomeInfo[]>> {
    const options = createRequestOption(req);
    if(req){
      if(req.month){
        options.set('size',req.month);
      }
    }
    return this.http.get<HomeInfo[]>(this.exportUrl_monthTrend, {
      params: options,
      observe: 'response'
    });
  }
    export_yearTrend(req?: any): Observable<HttpResponse<HomeInfo[]>> {
    const options = createRequestOption(req);
    if(req){
      if(req.year){
        options.set('size',req.year);
      }
    }
    return this.http.get<HomeInfo[]>(this.exportUrl_yearTrend, {
      params: options,
      observe: 'response'
    });
  }
}
