export class RolesManageModel {
// 系统模块
    // 角色管理
    public name ?: string;
    public label ?: string;

    constructor(
        name ?: string,
        label ?: string,
    ) {
        this.name = name ? name : null;
        this.label = label ? label : null;
    }
}
