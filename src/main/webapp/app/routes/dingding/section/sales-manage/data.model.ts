/**
 * Created by Administrator on 2018/8/4.
 */
export class Data {
    public id ?: any;
    public startDate ?: any;
    public endDate?: any;
    public createdDate?: string;
    public status ?: any;
    public approveInfoId ?: any;
    public applicant ?: string;
    public applicantId ?: string;
    public goodId ?: any;
    public goodName ?: string;
    public brandName ?: string;
    public shopName ?: string;
    constructor(id ?: any,
                startDate?: any,
                endDate ?: any,
                createdDate ?: any,
                status ?: any,
                approveInfoId ?: any,
                applicant?: string,
                applicantId ?: string,
                goodId?: any,
                goodName ?: string,
                brandName ?: string,
                shopName ?: string,
    ) {
        this.id = id ? id : null;
        this.startDate = startDate ? startDate : null;
        this.endDate = endDate ? endDate : null;
        this.createdDate = createdDate ? createdDate : null;
        this.status = status ? status : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
        this.applicant = applicant ? applicant : null;
        this.applicantId = applicantId ? applicantId : null;
        this.goodId = goodId ? goodId : null;
        this.goodName = goodName ? goodName : null;
        this.brandName = brandName ? brandName : null;
        this.shopName = shopName ? shopName : null;
    }
}
