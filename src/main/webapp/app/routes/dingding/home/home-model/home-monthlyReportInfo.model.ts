import {OverViewMonthInfo} from './home-overViewMonthInfo';
export class HomeMonthlyReportInfoModel {
    public passedFeesThisMonth?: any;//本月已通过商品费用
    public totalNumberOfApplicationsLastMonth?: any;//上月申请商品总数
    public totalNumberOfApplicantsThisMonth?: any;//本月申请人员总数
    public totalNumberOfApplicantsLastMonth?: any;//上月申请人员总数
    public overViewLastMonth?: OverViewMonthInfo;//上月概况
    public overViewThisMonth?: OverViewMonthInfo;//本月概况
    public statisticsPersent?: OverViewMonthInfo;//本月概况
    public totalNumberOfApplicationsThisMonth?: any;//本月申请商品总数
    public merchandiseFeesPassedLastMonth?: any;//上月已通过商品费用
    constructor(
        passedFeesThisMonth?: any,
        totalNumberOfApplicationsLastMonth?: any,
        totalNumberOfApplicantsThisMonth?: any,
        totalNumberOfApplicantsLastMonth?: any,
        overViewLastMonth?: OverViewMonthInfo,
        overViewThisMonth?: OverViewMonthInfo,
        totalNumberOfApplicationsThisMonth?: any,
        merchandiseFeesPassedLastMonth?: any,
    ) {
        this.passedFeesThisMonth = passedFeesThisMonth ? passedFeesThisMonth : null;
        this.totalNumberOfApplicationsLastMonth = totalNumberOfApplicationsLastMonth ? totalNumberOfApplicationsLastMonth : null;
        this.totalNumberOfApplicantsThisMonth = totalNumberOfApplicantsThisMonth ? totalNumberOfApplicantsThisMonth : null;
        this.totalNumberOfApplicantsLastMonth = totalNumberOfApplicantsLastMonth ? totalNumberOfApplicantsLastMonth : null;
        this.overViewLastMonth = overViewLastMonth ? overViewLastMonth : null;
        this.overViewThisMonth = overViewThisMonth ? overViewThisMonth : null;
        this.totalNumberOfApplicationsThisMonth = totalNumberOfApplicationsThisMonth ? totalNumberOfApplicationsThisMonth : null;
        this.merchandiseFeesPassedLastMonth = merchandiseFeesPassedLastMonth ? merchandiseFeesPassedLastMonth : null;
    }
}
