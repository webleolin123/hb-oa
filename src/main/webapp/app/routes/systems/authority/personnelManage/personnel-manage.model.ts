import {UserCompanyModel} from '../user-company.model';
export class PersonnelManageModel {
// 系统模块
    // 人员管理
    public id ?: any;
    public login ?: string;
    public email?: string;
    public activated?: boolean;
    public langKey ?: string;
    public createdBy ?: string;
    public createdDate ?: string;
    public lastModifiedBy ?: string;
    public lastModifiedDate ?: string;
    public authorities ?: string[];//字符串数组
    public authoritiesEntity ?: any;//对象素数组
    public emailVerified ?: boolean;
    public nickname ?: string;
    public sex ?: number;//0,1
    public mobilePhone ?: string;
    public mobilePhoneVerified ?: boolean;
    public qqNickName ?: string;
    public signature ?: string;
    public imageUrl ?: string;
    public userByCompany ?: UserCompanyModel;
    public companyId ?: number;

    constructor(
        id ?: any,
        login ?: string,
        email?: string,
        activated?: boolean,
        langKey ?: string,
        createdBy ?: string,
        createdDate ?: string,
        lastModifiedBy ?: string,
        lastModifiedDate ?: string,
        authorities ?: string[],//字符串数组
        emailVerified ?: boolean,
        nickname ?: string,
        sex ?: number,//0,1
        mobilePhone ?: string,
        mobilePhoneVerified ?: boolean,
        qqNickName ?: string,
        signature ?: string,
        imageUrl ?: string,
        userByCompany ?: UserCompanyModel,
        companyId ?: number,
    ) {
        this.id = id ? id : null;
        this.login = login ? login : null;
        this.email = email ? email : null;
        this.activated = activated ? activated : null;
        this.langKey = langKey ? langKey : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.authorities = authorities ? authorities : null;
        this.emailVerified = emailVerified ? emailVerified : null;
        this.nickname = nickname ? nickname : null;
        this.sex = sex ? sex : null;
        this.mobilePhone = mobilePhone ? mobilePhone : null;
        this.mobilePhoneVerified = mobilePhoneVerified ? mobilePhoneVerified : null;
        this.qqNickName = qqNickName ? qqNickName : null;
        this.signature = signature ? signature : null;
        this.imageUrl = imageUrl ? imageUrl : null;
        this.userByCompany = userByCompany ? userByCompany : null;
        this.companyId = companyId ? companyId : null;
    }
}
