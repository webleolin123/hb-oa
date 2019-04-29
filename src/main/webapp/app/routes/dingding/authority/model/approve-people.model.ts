/**
 * Created by Administrator on 2018/8/4.
 */
export class ApprovePeople{
    public id ?: any;
    public approveOrder ?: any;
    public avatar ?: string;
    public departmentId ?: any;
    public dingId ?: string;
    public dingName ?: string;
    public isDefaultActor ?: any;
    public type ?: any;
    constructor(
        id ?: any,
        approveOrder ?: any,
        avatar ?: string,
        departmentId ?: any,
        dingId ?: string,
        dingName ?: string,
        isDefaultActor ?: any,
        type ?: any,
    ){
        this.id = id ? id : null;
        this.approveOrder = approveOrder ? approveOrder : null;
        this.avatar = avatar ? avatar : null;
        this.departmentId = departmentId ? departmentId : null;
        this.dingId = dingId ? dingId : null;
        this.dingName = dingName ? dingName : null;
        this.isDefaultActor = isDefaultActor ? isDefaultActor : null;
        this.type = type ? type : null;
    }
}
