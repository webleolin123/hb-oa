export class Notification {
    public id ?: any;
    public title ?: string;
    public content ?: string;
    public publishTime ?: any;
    public type ?: any;
    public receiver ?: string;
    public checked ?: boolean;
    public operator ?: string;
    public operatorDingId ?: string;
    constructor(id ?: any,
                title ?: string,
                content ?: string,
                publishTime ?: any,
                type ?: any,
                receiver ?: string,
                checked ?: boolean,
                operator ?: string,
                operatorDingId ?: string,
    ) {
        this.id = id ? id : null;
        this.title = title ? title : null;
        this.content = content ? content : null;
        this.publishTime = publishTime ? publishTime : null;
        this.type = type ? type : null;
        this.receiver = receiver ? receiver : null;
        this.checked = checked ? checked : null;
        this.operator = operator ? operator : null;
        this.operatorDingId = operatorDingId ? operatorDingId : null;
    }
}
