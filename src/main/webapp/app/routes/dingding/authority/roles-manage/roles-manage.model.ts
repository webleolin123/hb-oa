export class Roles {
    public id ?: any;
    public roleName ?: any;
    public type?: any;
    public level?: any;
    public roleType?: any;
    public roleId?: number;
    public dingId?: string;

    constructor(
        id ?: any,
        roleName ?: string,
        type ?: string,
        level ?: string,
        roleType ?: string,
        roleId ?: number,
        dingId ?: string,
    ) {
        this.id = id ? id : null;
        this.roleName = roleName ? roleName : null;
        this.type = type ? type : null;
        this.level = level ? level : null;
        this.roleType = roleType ? roleType : null;
        this.roleId = roleId ? roleId : null;
        this.dingId = dingId ? dingId : null;
    }
}
