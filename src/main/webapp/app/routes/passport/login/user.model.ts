/**
 * Created by yl on 2018/5/3.
 */
export class UserModel {
    public email ?: string;
    public id ?: any;
    public name ?: string;
    public time ?: any;
    public token ?: string;

    constructor(
        email ?: string,
        id ?: any,
        name ?: string,
        time ?: any,
        token ?: string
    ) {
        this.email = email ? email : null;
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.time = time ? time : null;
        this.token = token ? token : null;
    }
}
