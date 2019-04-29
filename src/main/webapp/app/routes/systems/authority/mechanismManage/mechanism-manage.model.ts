export class MechanismManageModel {
// 系统模块
    // 机构管理
    public id ?: number;
    public name ?: string;
    public authRole?: string;
    public authManagerRole?: boolean;
    public telephone ?: string;
    public address ?: string;
    public parentId ?: number;
    public parentName ?: string;
    public authManagerRoleLabel ?: string;
    public authRoleLabel ?: string;
    public administrative ?: string;//行政区
    constructor(
        id ?: number,
        name ?: string,
        authRole?: string,
        authManagerRole?: boolean,
        telephone ?: string,
        address ?: string,
        parentId ?: number,
        parentName ?: string,
        authManagerRoleLabel ?: string,
        authRoleLabel ?: string,
        administrative ?: string,
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.authRole = authRole ? authRole : null;
        this.authManagerRole = authManagerRole ? authManagerRole : null;
        this.telephone = telephone ? telephone : null;
        this.address = address ? address : null;
        this.parentId = parentId ? parentId : null;
        this.parentName = parentName ? parentName : null;
        this.authManagerRoleLabel = authManagerRoleLabel ? authManagerRoleLabel : null;
        this.authRoleLabel = authRoleLabel ? authRoleLabel : null;
        this.administrative = administrative ? administrative : null;
    }
}
