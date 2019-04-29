import {Data} from "./data.model";
/**
 * Created by Administrator on 2018/8/4.
 */
export class ExportData {
    public id ?: any;
    public businessType ?: any;
    public businessId?: any;
    public applicant?: string;
    public applicantId ?: any;
    public createdDate ?: any;
    public status ?: any;

    public data ?: Data;
    constructor(id ?: any,
                businessType?: any,
                businessId ?: any,
                applicant?: string,
                applicantId ?: any,
                createdDate?: any,
                status ?: any,

                data ?: Data,) {
        this.id = id ? id : null;
        this.businessType = businessType ? businessType : null;
        this.businessId = businessId ? businessId : null;
        this.applicant = applicant ? applicant : null;
        this.applicantId = applicantId ? applicantId : null;
        this.createdDate = createdDate ? createdDate : null;
        this.status = status ? status : null;
        this.data = data ? data : null;
    }
}
