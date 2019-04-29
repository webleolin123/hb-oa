export class Brand {
    public id ?: any;
    public brandName ?: string;
    public logo ?: string;
    public status ?: any;
    public isAgencyBrand ?: any;
    constructor(id ?: any,
                brandName ?: string,
                logo ?: string,
                status ?: any,
                isAgencyBrand ?: any
    ) {
        this.id = id ? id : null;
        this.brandName = brandName ? brandName : null;
        this.logo = logo ? logo : null;
        this.status = status ? status : null;
        this.isAgencyBrand = isAgencyBrand ? isAgencyBrand : null;
    }
}
