import {ApproverInfo} from '../../approver-info.model';
export class DaRen {
    public id ?: any;
    public approveInfoDTO ?: ApproverInfo;

    public approveInfoId?: any;
    public newmark ?: any;
    public usedPrice ?: any;

    public shopId ?: any;
    public brandId ?: any;
    public goodId ?: any;
    public endDate ?: any;
    public isSupportedByFactory?: any;
    public perPrice ?: any;
    public perPriceOfSupport ?: any;
    public priceType?: any;
    public priceTypeOfSupport ?: any;
    public spreadType ?: any;
    public startDate ?: any;
    public status ?: any;
    public totalPrice ?: any;

    // public approveInfoDetailDTO ?: ApproveInfoDetail;
    public shopName ?: string;
    public brandName ?: string;
    public goodName ?: string;

    constructor(id ?: any,
                approveInfoDTO ?: ApproverInfo,
                approveInfoId?: any,
                newmark ?: any,
                usedPrice ?: any,
                spreadType?: any,
                endDate ?: any,
                shopId ?: any,
                brandId ?: any,
                goodId ?: any,
                isSupportedByFactory?: any,
                perPrice ?: any,
                perPriceOfSupport ?: any,
                priceType?: any,
                priceTypeOfSupport ?: any,
                startDate ?: any,
                status ?: any,
                totalPrice ?: any,
                // approveInfoDetailDTO ?: ApproveInfoDetail,
                shopName ?: string,
                brandName ?: string,
                goodName ?: string) {
        this.id = id ? id : null;
        this.approveInfoDTO = approveInfoDTO ? approveInfoDTO : null;
        this.approveInfoId = approveInfoId ? approveInfoId : null;
        this.newmark = newmark ? newmark : null;
        this.usedPrice = usedPrice ? usedPrice : null;
        this.spreadType = spreadType ? spreadType : null;
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
        // this.approveInfoDetailDTO = approveInfoDetailDTO ? approveInfoDetailDTO : null;
        this.shopName = shopName ? shopName : null;
        this.brandName = brandName ? brandName : null;
        this.goodName = goodName ? goodName : null;
    }
}
