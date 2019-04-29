/**
 * Created by yl on 2017/11/1.
 */
export class BaiduSms {
    public id ?: any;
    public atTime ?: any;
    public byUser ?: string;
    public content ?: string;
    public deviceType ?: any;
    public kind ?: any;
    public msgId ?: any;
    public read ?: any;
    public status ?: any;
    public title ?: string;
    public userType ?: any;
    public value ?: string;
    public custom?: string;

    constructor(id ?: any,
                atTime ?: any,
                byUser ?: string,
                content ?: string,
                deviceType ?: any,
                kind ?: any,
                msgId ?: any,
                read ?: any,
                status ?: any,
                title ?: string,
                userType ?: any,
                custom?: string,
                value ?: string,) {
        this.id = id ? id : null;
        this.content = content ? content : null;
        this.status = status ? status : null;
        this.kind = kind ? kind : null;
        this.atTime = atTime ? atTime : null;
        this.byUser = byUser ? byUser : null;
        this.deviceType = deviceType ? deviceType : null;
        this.msgId = msgId ? msgId : null;
        this.read = read ? read : null;
        this.title = title ? title : null;
        this.userType = userType ? userType : null;
        this.value = value ? value : null;
        this.custom = custom ? custom : null;
    }
}
