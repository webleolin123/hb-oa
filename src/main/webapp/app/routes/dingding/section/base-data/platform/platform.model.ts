/**
 * Created by yl on 2018/4/17.
 */
export class Platform {
    public id ?: any;
    public platformName ?: string;
    public preLink ?: string;

    constructor(id ?: any,
                platformName ?: string,
                preLink ?: string) {
        this.id = id ? id : null;
        this.platformName = platformName ? platformName : null;
        this.preLink = preLink ? preLink : null;
    }
}
