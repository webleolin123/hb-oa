import {ApproverInfo} from '../../approver-info.model';
export class ZhiTongChe {
    public id ?: any;
    public approveInfoDTO ?: ApproverInfo;
    public approveInfoId ?: any;
    public newmark ?: any;
    public usedPrice ?: any;  // 实际使用金额
    public endDate ?: any;
    public shopId ?: any;
    public brandId ?: any;
    public goodId ?: any;
    public isSupportedByFactory ?: any;
    public perPrice ?: any;
    public perPriceOfSupport ?: any;
    public priceType ?: any;
    public priceTypeOfSupport ?: any;
    public startDate ?: any;
    public status ?: any; //  状态
    public totalPrice ?: any;
    public shopName ?: string;
    public brandName ?: string;
    public goodName ?: string;

    public createdDate ?: any;

    constructor(id ?: any,
                approveInfoDTO ?: ApproverInfo,
                approveInfoId ?: any,
                newmark ?: any,
                usedPrice ?: any,
                endDate ?: any,
                shopId ?: any,
                brandId ?: any,
                goodId ?: any,
                isSupportedByFactory ?: any,
                perPrice ?: any,
                perPriceOfSupport ?: any,
                priceType ?: any,
                priceTypeOfSupport ?: any,
                startDate ?: any,
                status ?: any,
                totalPrice ?: any,
                shopName ?: string,
                brandName ?: string,
                goodName ?: string,
                createdDate ?: any,
                ) {
        this.id = id ? id : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
        this.newmark = newmark ? newmark : null;
        this.usedPrice = usedPrice ? usedPrice : null;
        this.endDate = endDate ? endDate : null;
        this.shopId = shopId ? shopId : null;
        this.brandId = brandId ? brandId : null;
        this.goodId = goodId ? goodId : null;
        this.isSupportedByFactory = isSupportedByFactory ? isSupportedByFactory : null;
        this.perPrice = perPrice ? perPrice : null;
        this.perPriceOfSupport = perPriceOfSupport ? perPriceOfSupport : null;
        this.priceType = priceType ? priceType : null;
        this.priceTypeOfSupport = priceTypeOfSupport ? priceTypeOfSupport : null;
        this.startDate = startDate ? startDate : null;
        this.status = status ? status : null;
        this.totalPrice = totalPrice ? totalPrice : null;
        this.totalPrice = totalPrice ? totalPrice : null;
        this.shopName = shopName ? shopName : null;
        this.brandName = brandName ? brandName : null;
        this.goodName = goodName ? goodName : null;
        this.createdDate = createdDate ? createdDate : null;
    }
}
