export class DepartmentUser {
    public userid ?: any;
    public name ?: string;
    public active ?: any;

    constructor(
        userid ?: any,
        name ?: string,
        active ?: any,
        ) {
        this.userid = userid ? userid : null;
        this.name = name ? name : null;
        this.active = active ? active : null;
    }
}
