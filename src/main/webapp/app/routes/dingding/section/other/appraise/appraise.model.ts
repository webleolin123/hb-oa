import {AppraiseContent} from "./appraise-content.model";
/**
 * Created by Administrator on 2018/7/5.
 */
export class Appraise {
    public id ?: any;
    public customerId ?: string; //淘宝ID
    public orderCode ?: string; //订单号
    public goodsId ?: string; //商品ID
    public store ?: string; //店铺
    public goodsName ?: string; //商品名称
    public sku ?: string; //商品sku
    public cause ?: string; //原因
    public analysisOfCauses ?: string; //原因分析
    public touch ?: any; //是否已联系客服
    public react ?: string; //接待客服
    public proposalsForHandling ?: string;//处理方案
    public appraiseContents ?: AppraiseContent[];
    public checked ?: boolean;
    constructor(
        id ?: any,
        customerId ?: string,
        orderCode ?: string,
        goodsId ?: string,
        store ?: string,
        goodsName ?: string,
        sku ?: string,
        cause ?: string,
        analysisOfCauses ?: string,
        touch ?: any,
        react ?: string,
        proposalsForHandling ?: string,
        appraiseContents ?: AppraiseContent[],
        checked ?: boolean
    ) {
        this.id = id ? id : null;
        this.customerId = customerId ? customerId : null;
        this.orderCode = orderCode ? orderCode : null;
        this.goodsId = goodsId ? goodsId : null;
        this.store = store ? store : null;
        this.goodsName = goodsName ? goodsName : null;
        this.sku = sku ? sku : null;
        this.cause = cause ? cause : null;
        this.analysisOfCauses = analysisOfCauses ? analysisOfCauses : null;
        this.touch = touch ? touch : null;
        this.react = react ? react : null;
        this.proposalsForHandling = proposalsForHandling ? proposalsForHandling : null;
        this.appraiseContents = appraiseContents ? appraiseContents : null;
        this.checked = checked ? checked : null;
    }
}
