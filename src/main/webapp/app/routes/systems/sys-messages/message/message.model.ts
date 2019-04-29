/**
 * Created by yl on 2017/11/27.
 */
export class Message {
    public id ?: any;
    public content ?: string;
    public createdBy ?: string;
    public createdTime ?: any;
    public isRead ?: any; // 0-为未读消息 ，1-为已读消息
    public kind ?: any; // 1-评论，2-关注，3-投稿审核状态，4-升管审核状态，5-禁言
    public msgType ?: any; // 消息类型
    public needPush ?: any;
    public status ?: any; // 1-正常，2-删除
    public targetUser ?: string; // 目标人
    public targetType ?: any; // 1-全体，2-个体
    public title ?: string;
    public value ?: string; // 业务值

    constructor(id ?: any,
                content ?: string,
                createdBy ?: string,
                createdTime ?: any,
                isRead ?: any,
                kind ?: any,
                msgType ?: any,
                needPush ?: any,
                status ?: any,
                targetUser ?: string,
                targetType ?: any,
                title ?: string,
                value ?: string) {
        this.id = id ? id : null;
        this.content = content ? content : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdTime = createdTime ? createdTime : null;
        this.isRead = isRead ? isRead : null;
        this.kind = kind ? kind : null;
        this.msgType = msgType ? msgType : null;
        this.needPush = needPush ? needPush : null;
        this.status = status ? status : null;
        this.targetUser = targetUser ? targetUser : null;
        this.targetType = targetType ? targetType : null;
        this.title = title ? title : null;
        this.value = value ? value : null;
    }
}
