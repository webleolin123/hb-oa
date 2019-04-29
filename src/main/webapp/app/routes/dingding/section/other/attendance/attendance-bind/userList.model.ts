export class UserListModel {
    public jobNum  ?: string;
    public name  ?: string;
    public dingId  ?: string;

    constructor(
        jobNum ?: string,
        name ?: string,
        dingId ?: string,
    ) {
        this.jobNum = jobNum ? jobNum : null;
        this.name = name ? name : null;
        this.dingId = dingId ? dingId : null;
    }
}
