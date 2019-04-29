export class Personnel {
    public id ?: any;
    public active ?: boolean;
    public roles ?: string;
    public position ?: string;
    public userid ?: string;
    public name ?: string;
    public mobile ?: string;
    public email ?: string;
    public department ?: string;

    constructor(
        id ?: any,
        active ?: boolean,
        roles ?: string,
        position ?: string,
        userid ?: string,
        name ?: string,
        mobile ?: string,
        email ?: string,
        department ?: string,
    ) {
        this.id = id ? id : null;
        this.active = active ? active : null;
        this.roles = roles ? roles : null;
        this.position = position ? position : null;
        this.userid = userid ? userid : null;
        this.name = name ? name : null;
        this.mobile = mobile ? mobile : null;
        this.email = email ? email : null;
        this.department = department ? department : null;
    }
}
