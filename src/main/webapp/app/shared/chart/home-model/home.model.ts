import {SummaryOfTotalDataInfo} from './home-summaryOfTotalDataInfo.model';
import {HomeMonthlyReportInfoModel} from './home-monthlyReportInfo.model';
import {VariousAnalysesInfo} from './home-variousAnalysesInfo';
export class HomeInfo {
    public summaryOfTotalData ?: SummaryOfTotalDataInfo;
    public monthlyReport ?: HomeMonthlyReportInfoModel;
    public variousAnalyses?: VariousAnalysesInfo;
    constructor(
        summaryOfTotalData ?: SummaryOfTotalDataInfo,
        monthlyReport ?: HomeMonthlyReportInfoModel,
        variousAnalyses?: VariousAnalysesInfo,
    ) {
        this.summaryOfTotalData = summaryOfTotalData ? summaryOfTotalData : null;
        this.monthlyReport = monthlyReport ? monthlyReport : null;
        this.variousAnalyses = variousAnalyses ? variousAnalyses : null;
    }
}
