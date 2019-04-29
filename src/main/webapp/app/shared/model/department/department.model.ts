import {DepartmentUser} from "./department-user.model";
export class Department {
    public id ?: any;
    public name ?: string;
    public parentid ?: any;
    public createDeptGroup ?: any;
    public autoAddUser ?: any;
    public users ?: DepartmentUser[];
    public children ?: Department[];
    public higherDepartments ?:any;
    constructor(id ?: any,
                name ?: string,
                parentid ?: any,
                createDeptGroup ?: any,
                autoAddUser ?: any,
                children ?: Department[],
                users ?: DepartmentUser[],
                higherDepartments ?: any,
    ) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.parentid = parentid ? parentid : null;
        this.createDeptGroup = createDeptGroup ? createDeptGroup : null;
        this.autoAddUser = autoAddUser ? autoAddUser : null;
        this.children = children ? children : new Array<Department>();
        this.users = users ? users : new Array<DepartmentUser>();
        this.higherDepartments = higherDepartments ? higherDepartments :null;
    }
}
