import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOption} from '@shared';
import {HomeInfo} from './home-model/home.model';
import {
// 日趋势响应
    WORKFLOW_HOME_GOODS_DAY_TREND_API,
    WORKFLOW_HOME_PERSON_DAY_TREND_API,
    WORKFLOW_HOME_BUSINESS_DAY_TREND_API,
// 月趋势响应
    WORKFLOW_HOME_GOODS_MONTH_TREND_API,
    WORKFLOW_HOME_PERSON_MONTH_TREND_API,
    WORKFLOW_HOME_BUSINESS_MONTH_TREND_API,
// 年趋势响应
    WORKFLOW_HOME_GOODS_YEAR_TREND_API,
    WORKFLOW_HOME_PERSON_YEAR_TREND_API,
    WORKFLOW_HOME_BUSINESS_YEAR_TREND_API,
} from '../../app.constants';
@Injectable()
export class ChartService {
    result:any;
    public getGoodsDayTrendDataUrl=WORKFLOW_HOME_GOODS_DAY_TREND_API;//趋势图请求天数据
    public getGoodsMonthTrendDataUrl=WORKFLOW_HOME_GOODS_MONTH_TREND_API;//趋势图请求月数据
    public getGoodsYearTrendDataUrl=WORKFLOW_HOME_GOODS_YEAR_TREND_API;//趋势图请求年数据

    public getPersonDayTrendDataUrl=WORKFLOW_HOME_PERSON_DAY_TREND_API;//趋势图请求天数据
    public getPersonMonthTrendDataUrl=WORKFLOW_HOME_PERSON_MONTH_TREND_API;//趋势图请求月数据
    public getPersonYearTrendDataUrl=WORKFLOW_HOME_PERSON_YEAR_TREND_API;//趋势图请求年数据

    public getBusinessDayTrendDataUrl=WORKFLOW_HOME_BUSINESS_DAY_TREND_API;//趋势图请求天数据
    public getBusinessMonthTrendDataUrl=WORKFLOW_HOME_BUSINESS_MONTH_TREND_API;//趋势图请求月数据
    public getBusinessYearTrendDataUrl=WORKFLOW_HOME_BUSINESS_YEAR_TREND_API;//趋势图请求年数据
    constructor(private http: HttpClient) {

    }
    getGoodsDayTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.getGoodsDayTrendDataUrl, {
            params: options,
            observe: 'response'
        });
    }
    getGoodsMonthTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.getGoodsMonthTrendDataUrl, {
            params: options,
            observe: 'response'
        });
    }
    getGoodsYearTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.getGoodsYearTrendDataUrl, {
            params: options,
            observe: 'response'
        });
    }
    getPersonDayTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.getPersonDayTrendDataUrl, {
            params: options,
            observe: 'response'
        });
    }
    getPersonMonthTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.getPersonMonthTrendDataUrl, {
            params: options,
            observe: 'response'
        });
    }
    getPersonYearTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.getPersonYearTrendDataUrl, {
            params: options,
            observe: 'response'
        });
    }
    getBusinessDayTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.getBusinessDayTrendDataUrl, {
            params: options,
            observe: 'response'
        });
    }
    getBusinessMonthTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.getBusinessMonthTrendDataUrl, {
            params: options,
            observe: 'response'
        });
    }
    getBusinessYearTrendData(req?: any): Observable<HttpResponse<HomeInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<HomeInfo[]>(this.getBusinessYearTrendDataUrl, {
            params: options,
            observe: 'response'
        });
    }
}
