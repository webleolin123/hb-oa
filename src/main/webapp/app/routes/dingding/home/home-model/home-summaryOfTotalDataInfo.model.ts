export class SummaryOfTotalDataInfo {
    public totalNumberOfProductApplications?: any;//商品申请总数
    public totalNumberOfPendingApplications?: any;//待办申请总数
    public actualUsageFee?: any;//实际使用费用
    public passedFee?: any;//已通过费用
    public totalNumberOfApplications?: any;//申请总数
    public totalApplicationFee?: any;//总申请费用
    public totalNumberOfGoodsPassed?: any;//已通过商品总数
    public totalNumberOfApplicationsApproved?: any;//已通过申请总数
    constructor(
        totalNumberOfProductApplications?: any,
        totalNumberOfPendingApplications?: any,
        actualUsageFee?: any,
        passedFee?: any,
        totalNumberOfApplications?: any,
        totalApplicationFee?: any,
        totalNumberOfGoodsPassed?: any,
        totalNumberOfApplicationsApproved?: any,
    ) {
        this.totalNumberOfProductApplications = totalNumberOfProductApplications ? totalNumberOfProductApplications : null;
        this.totalNumberOfPendingApplications = totalNumberOfPendingApplications ? totalNumberOfPendingApplications : null;
        this.actualUsageFee = actualUsageFee ? actualUsageFee : null;
        this.passedFee = passedFee ? passedFee : null;
        this.totalNumberOfApplications = totalNumberOfApplications ? totalNumberOfApplications : null;
        this.totalApplicationFee = totalApplicationFee ? totalApplicationFee : null;
        this.totalNumberOfGoodsPassed = totalNumberOfGoodsPassed ? totalNumberOfGoodsPassed : null;
        this.totalNumberOfApplicationsApproved = totalNumberOfApplicationsApproved ? totalNumberOfApplicationsApproved : null;
    }
}
