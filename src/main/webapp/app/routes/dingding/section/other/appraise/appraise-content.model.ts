import {AppraiseLabel} from "./appraise-label.model";
/**
 * Created by Administrator on 2018/7/10.
 */
export class AppraiseContent {
    public id ?: any;
    public appraise ?: string;
    public when ?: string;
    public appraiseOrderId ?: any;
    public appraiseLabels ?: AppraiseLabel[];

    constructor(
        id ?: any,
        appraise ?: string,
        when ?: string,
        appraiseOrderId ?: any,
        appraiseLabels ?: AppraiseLabel[]
    ) {
        this.id = id ? id : null;
        this.appraise = appraise ? appraise : null;
        this.when = when ? when : null;
        this.appraiseOrderId = appraiseOrderId ? appraiseOrderId : null;
        this.appraiseLabels = appraiseLabels ? appraiseLabels : null;
    }
}
