import {ActionProcess} from "./action-process.model";
import {DingPerson} from "./ding-person.model";
export class ApproveInfoDetail {
    public id ?: any;
    public businessType ?: any;
    public approver ?: DingPerson[];
    public copyTo ?: DingPerson[];
    public businessId ?: any;
    public applicant ?: string;
    public applicantId ?: string;
    public applyReason ?: string;
    public status ?: any;
    public dingPeople ?: DingPerson[];
    public actionProcess ?: ActionProcess[];
    public createdDate ?: string;

    constructor(id ?: any,
                businessType ?: any,
                approver ?: DingPerson[],
                copyTo ?: DingPerson[],
                businessId ?: any,
                applicant ?: string,
                applicantId ?: string,
                applyReason ?: string,
                createdDate ?: any,
                status ?: any,
                dingPeople ?: DingPerson[],
                actionProcess ?: ActionProcess[],) {
        this.id = id ? id : null;
        this.businessType = businessType ? businessType : null;
        this.approver = approver ? approver : null;
        this.copyTo = copyTo ? copyTo : null;
        this.businessId = businessId ? businessId : null;
        this.applicant = applicant ? applicant : null;
        this.applicantId = applicantId ? applicantId : null;
        this.applyReason = applyReason ? applyReason : null;
        this.dingPeople = dingPeople ? dingPeople : null;
        this.actionProcess = actionProcess ? actionProcess : null;
        this.status = status ? status : null;
        this.createdDate = createdDate ? createdDate : null;
    }
}
