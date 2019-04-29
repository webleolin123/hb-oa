import {ApproverInfo} from '../../approver-info.model';
export class Gift {
    public id ?: any;
    public startDate ?: string;
    public endDate ?: string;
    public approveInfoId ?: number;
    public approveInfoDTO ?: ApproverInfo;
    constructor(
        id ?: any,
        startDate ?: string,
        endDate ?: string,
        approveInfoDTO ?: ApproverInfo,
        approveInfoId ?: any,
        ) {
        this.id = id ? id : null;
        this.startDate = startDate ? startDate : null;
        this.endDate = endDate ? endDate : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
    }
}
