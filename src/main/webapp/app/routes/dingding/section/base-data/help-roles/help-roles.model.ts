/**
 * Created by yl on 2018/5/16.
 */
export class HelpRoles {
    public id ?: any;
    public answerStr ?: any; // 答案
    public answerblob ?: any; // 答案
    public answerblobContentType ?: any;
    public businessType ?: any; // 模块
    public moduleId ?: any; // 模块id
    public createdBy ?: string; // 创建者
    public createdDate ?: string; // 创建时间
    public isNeedToNotify ?: any; // 是否需要通知
    public lastModifiedBy ?: string;
    public lastModifiedDate ?: string;
    public question ?: string; // 问题
    public roleType ?: any; // 规则类型
    public status ?: any; // 状态
    public validityPeriod ?: any; // 有效期
    public order ?: any; // 排序

    constructor(id ?: any,
                answerStr ?: any,
                answerblob ?: any,
                answerblobContentType ?: any,
                businessType ?: any,
                moduleId ?: any,
                createdBy ?: string,
                createdDate ?: string,
                isNeedToNotify ?: any,
                lastModifiedBy ?: string,
                lastModifiedDate ?: string,
                question ?: string,
                roleType ?: any,
                status ?: any,
                validityPeriod ?: string,
                order ?: any) {
        this.id = id ? id : null;
        this.answerStr = answerStr ? answerStr : null;
        this.answerblob = answerblob ? answerblob : null;
        this.answerblobContentType = answerblobContentType ? answerblobContentType : null;
        this.businessType = businessType ? businessType : null;
        this.moduleId = moduleId ? moduleId : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.isNeedToNotify = isNeedToNotify ? isNeedToNotify : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.question = question ? question : null;
        this.roleType = roleType ? roleType : null;
        this.validityPeriod = validityPeriod ? validityPeriod : null;
        this.status = status ? status : null;
        this.order = order ? order : null;
    }
}
