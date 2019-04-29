import {ApproverInfo} from '../../approver-info.model';
export class PreSaleModel {
    public id ?: any;
    public startTime ?: string;
    public endTime ?: string;
    public approveInfoId ?: number;
    public approveInfoDTO ?: ApproverInfo;
    constructor(
        id ?: any,
        startTime ?: string,
        endTime ?: string,
        approveInfoDTO ?: ApproverInfo,
        approveInfoId ?: any,
        ) {
        this.id = id ? id : null;
        this.startTime = startTime ? startTime : null;
        this.endTime = endTime ? endTime : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
    }
}
