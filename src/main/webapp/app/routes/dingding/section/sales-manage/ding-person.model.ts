/**
 * Created by yl on 2018/5/3.
 */
export class DingPerson {
    public id ?: any;
    public dingId ?: string;
    public dingName ?: string;
    public type ?: any; // APPLY("我申请的", 1),APPROVE("待我审批", 2),COPYTO("抄送给我", 3);
    public isDefaultActor ?: any; // 是否为默认审批人; 0:否  1：是
    public departmentId ?: any;
    public department ?: any;
    constructor(
        id ?: any,
        dingId ?: string,
        dingName ?: string,
        type ?: any,
        isDefaultActor ?: any,
        departmentId ?: any,
        department ?: any,
    ) {
        this.id = id ? id : null;
        this.dingId = dingId ? dingId : null;
        this.dingName = dingName ? dingName : null;
        this.type = type ? type : null;
        this.isDefaultActor = isDefaultActor ? isDefaultActor : 0;
        this.departmentId = departmentId ? departmentId : 0;
        this.department = department ? department : 0;
    }
}
