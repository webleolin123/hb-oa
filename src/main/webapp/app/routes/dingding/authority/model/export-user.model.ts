import {Department} from '../../../common/http/department.model';
/**
 * Created by yl on 2018/5/4.
 */
export class ExportUser {
    public department ?: Department;
    public children ?: Department[];

    constructor(department ?: Department,
                children ?: Department[]) {
        this.department = department ? department : null;
        this.children = children ? children : new Array<Department>();
    }
}
