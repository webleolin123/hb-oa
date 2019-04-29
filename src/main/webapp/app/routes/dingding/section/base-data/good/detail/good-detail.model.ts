import {GoodSku} from "./good-sku.model";
/**
 * Created by Administrator on 2018/6/15.
 */

export class GoodDetail {
    public id ?: any;
    public brandId ?: any;
    public brandName ?: any;
    public createdBy ?: string;
    public preLink ?: string;
    public createdDate ?: string;
    public goodId ?: string;
    public goodName ?: string;
    public image ?: string;
    public lastModifiedBy ?: string;
    public lastModifiedDate ?: string;
    public shopId ?: any;
    public shopName ?: any;
    public status ?: any;
    public sku ?: GoodSku;
    public price ?: GoodSku;

    constructor(id ?: any,
                brandId ?: any,
                createdBy ?: string,
                createdDate ?: string,
                goodId ?: any,
                goodName ?: string,
                image ?: string,
                lastModifiedBy ?: string,
                lastModifiedDate ?: string,
                shopId ?: any,
                status ?: any,
                brandName ?: any,
                preLink ?: string,
                shopName ?: any,
                price ?: any,
                sku ?: GoodSku
    ) {
        this.id = id ? id : null;
        this.brandId = brandId ? brandId : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.goodId = goodId ? goodId : null;
        this.goodName = goodName ? goodName : null;

        this.image = image ? image : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.shopId = shopId ? shopId : null;
        this.status = status ? status : null;
        this.brandName = brandName ? brandName : null;
        this.shopName = shopName ? shopName : null;
        this.preLink = preLink ? preLink : null;
        this.sku = sku ? sku : null;
        this.price = price ? price : null;
    }
}
