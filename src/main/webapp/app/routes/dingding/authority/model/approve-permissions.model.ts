import {ApprovePeople} from "./approve-people.model";
/**
 * Created by Administrator on 2018/8/4.
 */
export class ApprovePermission{
    public applyPermissionType ?: any;
    public approvePermissionType ?: any;
    public autoAddApproverAtFirstSeq ?: any;
    public autoAddApproverAtSecondSeq ?: any;
    public autoAddCopy ?: any;
    public copyPeople ?: ApprovePeople[];
    public firstApprovers ?: ApprovePeople[];
    public secondApprovers ?: ApprovePeople[];
    public seqLevel ?: any;
    constructor(
        applyPermissionType ?: any,
        approvePermissionType ?: any,
        autoAddApproverAtFirstSeq ?: any,
        autoAddApproverAtSecondSeq ?: any,
        autoAddCopy ?: any,
        copyPeople ?: ApprovePeople[],
        firstApprovers ?: ApprovePeople[],
        secondApprovers ?: ApprovePeople[],
        seqLevel ?: any
    ){
        this.applyPermissionType = applyPermissionType ? applyPermissionType : null;
        this.approvePermissionType = approvePermissionType ? approvePermissionType : null;
        this.autoAddApproverAtFirstSeq = autoAddApproverAtFirstSeq ? autoAddApproverAtFirstSeq : null;
        this.autoAddApproverAtSecondSeq = autoAddApproverAtSecondSeq ? autoAddApproverAtSecondSeq : null;
        this.autoAddCopy = autoAddCopy ? autoAddCopy : null;
        this.copyPeople = copyPeople ? copyPeople : null;
        this.firstApprovers = firstApprovers ? firstApprovers : null;
        this.secondApprovers = secondApprovers ? secondApprovers : null;
        this.seqLevel = seqLevel ? seqLevel : null;
    }
}
