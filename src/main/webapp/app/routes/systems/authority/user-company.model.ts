export class UserCompanyModel {
    public id ?: number;
    public byLogin ?: string;
    public nickName ?: string;
    public companyId?: number;
    public companyName?: string;
    public users?: string;

    constructor(
        id ?: number,
        byLogin ?: string,
        nickName?: string,
        companyId?: number,
        companyName?: string,
        users?: string,
    ) {
        this.id = id ? id : null;
        this.byLogin = byLogin ? byLogin : null;
        this.nickName = nickName ? nickName : null;
        this.companyId = companyId ? companyId : null;
        this.companyName = companyName ? companyName : null;
        this.users = users ? users : null;
    }
}
