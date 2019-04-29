export class AliSms {
    public id ?: any;
    public content ?: string;
    public kind ?: any;
    public phone ?: string;
    public result ?: string;
    public status ?: any;
    constructor(
        id ?: any,
        content ?: string,
        kind ?: any,
        status ?: any,
        phone ?: string,
        result ?: string
    ) {
        this.id = id ? id : null;
        this.content = content ? content : null;
        this.status = status ? status : null;
        this.kind = kind ? kind : null;
        this.phone = phone ? phone : null;
        this.result = result ? result : null;
    }
}
