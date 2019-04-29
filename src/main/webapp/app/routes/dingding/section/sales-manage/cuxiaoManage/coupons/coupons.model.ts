import {ApproverInfo} from '../../approver-info.model';
export class Coupon {
    public id ?: any;
    public reducePrice ?: any;
    public limitPrice ?: any;
    public breakingPrice ?: number;
    public applyType ?: number;
    public startDate ?: string;
    public endDate ?: string;
    public startTime ?: string;
    public endTime ?: string;
    public approveInfoId ?: number;
    public approveInfoDTO ?: ApproverInfo;
    constructor(
        id ?: any,
        reducePrice ?: any,
        limitPrice ?: any,
        breakingPrice ?: number,
        applyType ?: number,
        startDate ?: string,
        endTime ?: string,
        startTime ?: string,
        endDate ?: string,
        approveInfoDTO ?: ApproverInfo,
        approveInfoId ?: any,
        ) {
        this.id = id ? id : null;
        this.reducePrice = reducePrice ? reducePrice : null;
        this.limitPrice = limitPrice ? limitPrice : null;
        this.breakingPrice = breakingPrice ? breakingPrice : null;
        this.applyType = applyType ? applyType : null;
        this.startTime = startTime ? startTime : null;
        this.endTime = endTime ? endTime : null;
        this.startDate = startDate ? startDate : null;
        this.endDate = endDate ? endDate : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
    }
}
