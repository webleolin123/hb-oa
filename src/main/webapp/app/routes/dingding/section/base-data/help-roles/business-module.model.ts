/**
 * Created by Administrator on 2018/7/31.
 */
export class BusinessModule {
    public id ?: any;
    public applyPermissionType ?: any;
    public approvePermissionType ?: any;
    public autoAddApproverAtFirstSeq ?: any;
    public autoAddApproverAtSecondSeq ?: any;
    public autoAddCopy ?: any;
    public businessName ?: string;
    public businessType ?: any;
    public childModules ?: BusinessModule[];
    public clientLogo ?: string;
    public greyCLogo ?: string;
    public isManegeLimit ?: any;
    public isShowedInClient ?: any;
    public level ?: any;
    public linkUrl ?: string;
    public remarks ?: string;
    public seq ?: any;
    public seqLevel ?: any;
    public serverLogo ?: string;
    public status ?: any;

    public isSelected ?: boolean;
    public isDisabled ?: boolean;

    constructor(id ?: any,
                applyPermissionType ?: any,
                approvePermissionType ?: any,
                autoAddApproverAtFirstSeq ?: any,
                autoAddApproverAtSecondSeq ?: any,
                autoAddCopy ?: any,
                businessName ?: string,
                businessType ?: any,
                childModules ?: BusinessModule[],
                clientLogo ?: string,
                greyCLogo ?: string,
                isManegeLimit ?: any,
                isShowedInClient ?: any,
                level ?: any,
                linkUrl ?: string,
                remarks ?: string,
                seq ?: any,
                seqLevel ?: any,
                serverLogo ?: string,
                status ?: any,
                isSelected ?: boolean,
                isDisabled ?: boolean) {
        this.id = id ? id : null;
        this.applyPermissionType = applyPermissionType ? applyPermissionType : null;
        this.approvePermissionType = approvePermissionType ? approvePermissionType : null;
        this.autoAddApproverAtFirstSeq = autoAddApproverAtFirstSeq ? autoAddApproverAtFirstSeq : null;
        this.autoAddApproverAtSecondSeq = autoAddApproverAtSecondSeq ? autoAddApproverAtSecondSeq : null;
        this.autoAddCopy = autoAddCopy ? autoAddCopy : null;
        this.businessName = businessName ? businessName : null;
        this.businessType = businessType ? businessType : null;
        this.childModules = childModules ? childModules : null;
        this.clientLogo = clientLogo ? clientLogo : null;
        this.greyCLogo = greyCLogo ? greyCLogo : null;
        this.isManegeLimit = isManegeLimit ? isManegeLimit : null;
        this.isShowedInClient = isShowedInClient ? isShowedInClient : null;
        this.level = level ? level : null;
        this.linkUrl = linkUrl ? linkUrl : null;
        this.remarks = remarks ? remarks : null;
        this.seq = seq ? seq : null;
        this.seqLevel = seqLevel ? seqLevel : null;
        this.serverLogo = serverLogo ? serverLogo : null;
        this.status = status ? status : null;
        this.isSelected = isSelected ? isSelected : false;
        this.isDisabled = isDisabled ? isDisabled : false;
    }
}
