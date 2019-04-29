/**
 * Created by Administrator on 2018/8/3.
 */
export class DingUser {
    public id ?: any;
    public dingName ?: string;
    public dingId ?: string;
    public avatar ?: string;
    public type ?: any;
    public approveOrder ?: any;
    public isDefaultActor ?: any;
    public departmentId ?: any;

    constructor(id ?: any,
                dingName ?: string,
                dingId ?: string,
                avatar ?: string,
                type ?: any,
                approveOrder ?: any,
                isDefaultActor ?: any,
                departmentId ?: any,
                ) {
        this.id = id ? id : null;
        this.dingName = dingName ? dingName : null;
        this.dingId = dingId ? dingId : null;
        this.avatar = avatar ? avatar : null;
        this.type = type ? type : null;
        this.approveOrder = approveOrder ? approveOrder : null;
        this.isDefaultActor = isDefaultActor ? isDefaultActor : null;
        this.departmentId = departmentId ? departmentId : null;
    }
}
