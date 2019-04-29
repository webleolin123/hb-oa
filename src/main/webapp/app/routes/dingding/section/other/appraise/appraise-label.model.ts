/**
 * Created by Administrator on 2018/7/10.
 */
export class AppraiseLabel {
    public id ?: any;
    public label ?: string;
    public appraiseContentId ?: any;
    constructor(
        id ?: any,
        label ?: string,
        appraiseContentId ?: any,
    ) {
        this.id = id ? id : null;
        this.label = label ? label : null;
        this.appraiseContentId = appraiseContentId ? appraiseContentId : null;
    }
}
