export class AttendanceModel {
    public id ?: any;
    public createDate ?: string;
    public month ?: string;
    public status ?: number;
    public keyCode ?: string;
    public moduleType ?: number;
    public applicant ?: string;
    public applicantId ?: any;

    public bankName ?: string;
    public bankCode ?: string;
    public department ?: string;
    public sendMessageStatus  ?: any;

    constructor(
        id ?: any,
        createDate ?: string,
        month ?: string,
        status ?: number,
        keyCode ?: string,
        moduleType ?: number,
        applicant ?: string,
        applicantId ?: any,
        bankCode ?: string,
        bankName ?: string,
        department ?: string,
        sendMessageStatus ?: any,
    ) {
        this.id = id ? id : null;
        this.createDate = createDate ? createDate : null;
        this.month = month ? month : null;
        this.status = status ? status : null;
        this.keyCode = keyCode ? keyCode : null;
        this.status = status ? status : null;
        this.moduleType = moduleType ? moduleType : null;
        this.applicant = applicant ? applicant : null;
        this.applicantId = applicant ? applicantId : null;
        this.month = month ? month : null;
        this.keyCode = keyCode ? keyCode : null;
        this.bankName = bankName ? bankName : null;
        this.bankCode = bankCode ? bankCode : null;
        this.department = department ? department : null;
        this.sendMessageStatus = sendMessageStatus ? sendMessageStatus : null;
    }
}
