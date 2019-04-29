import {OverViewMonthInfo} from './home-overViewMonthInfo';
export class VariousAnalysesInfo {
    public numberOfPersonnelApplications?: OverViewMonthInfo;//人员申请数排行
    public numberOfProductApplications?: OverViewMonthInfo;//商品申请数排行
    public businessApplicationNumberRanking?: OverViewMonthInfo;//业务申请数排行
    public businessApplicationFeeRanking?: OverViewMonthInfo;//业务申请费用排行
    constructor(
        numberOfPersonnelApplications?: OverViewMonthInfo,
        numberOfProductApplications?: OverViewMonthInfo,
        businessApplicationNumberRanking?: OverViewMonthInfo,
        businessApplicationFeeRanking?: OverViewMonthInfo,
    ) {
        this.numberOfPersonnelApplications = numberOfPersonnelApplications ? numberOfPersonnelApplications : null;
        this.numberOfProductApplications = numberOfProductApplications ? numberOfProductApplications : null;
        this.businessApplicationNumberRanking = businessApplicationNumberRanking ? businessApplicationNumberRanking : null;
        this.businessApplicationFeeRanking = businessApplicationFeeRanking ? businessApplicationFeeRanking : null;
    }
}
