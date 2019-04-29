/**
 * Created by yl on 2018/4/17.
 */
export class GoodSku {
    public id ?: any;
    public acticitySpecialPrice ?: any;
    public activityPrice ?: any;
    public createdBy ?: string;
    public createdDate ?: string;
    public dailyPrice ?: any;
    public dailySpecialPrice ?: any;
    public extraId ?: any;
    public goodId ?: any;
    public shopId ?: any;
    public brandId ?: any;
    public goodNumber ?: any;
    public lastModifiedBy ?: any;
    public lastModifiedDate ?: any;
    public memo ?: string;
    public purchasePrice ?: string;
    public saleStatus ?: string;
    public skuName ?: string;
    public skuId ?: string;
    public skuNum ?: any;
    public status ?: any;
    public goodName ?: any;

    constructor(
     id ?: any,
     acticitySpecialPrice ?: any,
     activityPrice ?: any,
     createdBy ?: string,
     createdDate ?: string,
     dailyPrice ?: any,
     dailySpecialPrice ?: any,
     extraId ?: any,
     goodId ?: any,
     shopId ?: any,
     brandId ?: any,
     goodNumber ?: any,
     lastModifiedBy ?: any,
     lastModifiedDate ?: any,
     memo ?: string,
     purchasePrice ?: string,
     saleStatus ?: string,
     skuName ?: string,
     skuId ?: string,
     skuNum ?: any,
     status ?: any,
     goodName ?: any,
    ) {
        this.id = id ? id : null;
        this.acticitySpecialPrice = acticitySpecialPrice ? acticitySpecialPrice : null;
        this.activityPrice = activityPrice ? activityPrice : null;
        this.dailyPrice = dailyPrice ? dailyPrice : null;
        this.dailySpecialPrice = dailySpecialPrice ? dailySpecialPrice : null;
        this.goodId = goodId ? goodId : null;
        this.shopId = shopId ? shopId : null;
        this.brandId = brandId ? brandId : null;
        this.skuName = skuName ? skuName : null;
        this.skuNum = skuNum ? skuNum : null;
        this.status = status ? status : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.extraId = extraId ? extraId : null;
        this.goodNumber = goodNumber ? goodNumber : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.memo = memo ? memo : null;
        this.purchasePrice = purchasePrice ? purchasePrice : null;
        this.saleStatus = saleStatus ? saleStatus : null;
        this.skuId = skuId ? skuId : null;
        this.goodName = goodName ? goodName : null;
    }
}
