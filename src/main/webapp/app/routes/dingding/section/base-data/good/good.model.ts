/**
 * Created by yl on 2018/4/17.
 */
export class Good {
    public id ?: any;
    public brandId?: any;
    public createdBy?: string;
    public createdDate?: any;
    public goodId?: string;
    public goodName?: string;
    public goodTitle?: string;
    public goodType?: any;
    public image?: string;
    public lastModifiedBy?: string;
    public lastModifiedDate?: any;
    public number?: any;
    public price?: any;
    public priceInterval?: string;
    public saleStatus?: any;
    public shopId?: any;
    public status?: any;

    constructor(id ?: any,
                brandId?: any,
                createdBy?: string,
                createdDate?: any,
                goodId?: string,
                goodName?: string,
                goodTitle?: string,
                goodType?: any,
                image?: string,
                lastModifiedBy?: string,
                lastModifiedDate?: any,
                number?: any,
                price?: any,
                priceInterval?: string,
                saleStatus?: any,
                shopId?: any,
                status?: any) {
        this.id = id ? id : null;
        this.brandId = brandId ? brandId : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.goodId = goodId ? goodId : null;
        this.goodName = goodName ? goodName : null;
        this.goodTitle = goodTitle ? goodTitle : null;
        this.goodType = goodType ? goodType : null;
        this.image = image ? image : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.number = number ? number : null;
        this.price = price ? price : null;
        this.priceInterval = priceInterval ? priceInterval : null;
        this.saleStatus = saleStatus ? saleStatus : null;
        this.shopId = shopId ? shopId : null;
        this.status = status ? status : null;
    }
}
