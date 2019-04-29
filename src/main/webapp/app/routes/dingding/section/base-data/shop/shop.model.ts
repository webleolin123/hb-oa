/**
 * Created by yl on 2018/4/17.
 */
export class Shop {
    public id ?: any;
    public logo ?: string;
    public platformId ?: any;
    public preLink ?: string;
    public shopName ?: string;
    public status ?: any;
    public platformName ?: string;

    constructor(
        id ?: any,
        logo ?: string,
        platformId ?: any,
        preLink ?: string,
        shopName ?: string,
        status ?: any,
        platformName ?: string
    ) {
        this.id = id ? id : null;
        this.logo = logo ? logo : null;
        this.platformId = platformId ? platformId : null;
        this.preLink = preLink ? preLink : null;
        this.shopName = shopName ? shopName : null;
        this.status = status ? status : null;
        this.platformName = platformName ? platformName : null;
    }
}
