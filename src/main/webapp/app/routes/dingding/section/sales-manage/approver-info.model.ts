/**
 * Created by yl on 2018/5/6.
 */

import {DingPerson} from './ding-person.model';

export class ApproverInfo {
    public id ?: any;
    public status ?: any;
    public moduleId ?: number;
    public goodBakId ?: number;
    public goodBakGoodId ?: string;
    public goodGoodId ?: string;
    public goodId ?: number;
    public shopId ?: number;
    public brandId ?: number;
    public goodName ?: string;
    public shopName ?: string;
    public dingPeople ?: DingPerson[];
    public brandName ?: string;
    public applicant?: string;
    public applicantId?: string;
    public applyReason ?: string;
    public businessId ?: any;
    public businessType ?: any;
    public copyTo?: DingPerson[];
    public firstApprovers?: DingPerson[];
    public createdDate ?: string;

    public searchKey ?: string;
    public title ?: string;

    public completeDate ?: string;
    constructor(id ?: any,
                applicant?: string,
                applicantId?: string,
                applyReason ?: string,
                dingPeople?: DingPerson[],
                firstApprovers?: DingPerson[],
                businessId ?: any,
                businessType ?: any,
                copyTo?: DingPerson[],
                createdDate ?: string,
                status ?: any,
                searchKey ?: string,
                title ?: string,
                completeDate ?: string,
    ) {
        this.id = id ? id : null;
        this.applicant = applicant ? applicant : null;
        this.applicantId = applicantId ? applicantId : null;
        this.applyReason = applyReason ? applyReason : null;
        this.dingPeople = dingPeople ? dingPeople : null;
        this.businessId = businessId ? businessId : null;
        this.businessType = businessType ? businessType : null;
        this.copyTo = copyTo ? copyTo : null;
        this.firstApprovers = firstApprovers ? firstApprovers : null;
        this.createdDate = createdDate ? createdDate : null;
        this.status = status ? status : null;
        this.searchKey = searchKey ? searchKey : null;
        this.title = title ? title : null;
        this.completeDate = completeDate ? completeDate : null;
    }
}
