import {DingUser} from "../model/ding-user.model";
export class AuthoritySettings {
    public id ?: any;
    public approveInfoId ?: any;
    public approvePermissionValue ?: any;
    public brandRange ?: any;
    public businessModuleId ?: any;
    public businessModuleIds ?: any[];
    public businessType ?: any;
    public dingDepartmentId ?: string;
    public dingDepartmentIds ?: any[];
    public dingPersonId ?: string;
    public dingPersonIds ?: any[];
    public dingPersonDTO ?: DingUser;

    public isDefaultPermission ?: any;
    public isMainDevPersonOnlyHavePermission ?: any;
    public permissionType ?: any;
    public roleId ?: any;
    // public roleIds ?: any[];

    constructor(id ?: any,
                approveInfoId ?: any,
                approvePermissionValue ?: any,
                brandRange ?: any,
                businessModuleId ?: any,
                businessModuleIds ?: any[],
                businessType ?: any,
                dingDepartmentId ?: string,
                dingDepartmentIds ?: any[],
                dingPersonId ?: string,
                dingPersonIds ?: any[],
                dingPersonDTO ?: DingUser,
                isDefaultPermission ?: any,
                isMainDevPersonOnlyHavePermission ?: any,
                permissionType ?: any,
                roleId ?: any,
                // roleIds ?: any[]
    )
    {
        this.id = id ? id : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
        this.approvePermissionValue = approvePermissionValue ? approvePermissionValue : null;
        this.brandRange = brandRange ? brandRange : null;
        this.businessModuleId = businessModuleId ? businessModuleId : null;
        this.businessModuleIds = businessModuleIds ? businessModuleIds : null;
        this.businessType = businessType ? businessType : null;
        this.dingDepartmentId = dingDepartmentId ? dingDepartmentId : null;
        this.dingDepartmentIds = dingDepartmentIds ? dingDepartmentIds : null;
        this.dingPersonId = dingPersonId ? dingPersonId : null;
        this.dingPersonIds = dingPersonIds ? dingPersonIds : null;
        this.dingPersonDTO = dingPersonDTO ? dingPersonDTO : null;
        this.isDefaultPermission = isDefaultPermission ? isDefaultPermission : null;
        this.isMainDevPersonOnlyHavePermission = isMainDevPersonOnlyHavePermission ? isMainDevPersonOnlyHavePermission : null;
        this.permissionType = permissionType ? permissionType : null;
        this.roleId = roleId ? roleId : null;
        // this.roleIds = roleIds ? roleIds : null;
    }
}
