/**
 * Created by yl on 2018/5/3.
 */
export class ResetResult {
    public access_token ?: string;
    public expires_in ?: any;
    public iat ?: any;
    public jti ?: string;
    public refresh_token ?: string;
    public token_type ?: string;

    constructor(
        access_token ?: string,
        expires_in ?: any,
        iat ?: any,
        jti ?: string,
        refresh_token ?: string,
        token_type ?: string
    ) {
        this.access_token = access_token ? access_token : null;
        this.expires_in = expires_in ? expires_in : null;
        this.iat = iat ? iat : null;
        this.jti = jti ? jti : null;
        this.refresh_token = refresh_token ? refresh_token : null;
        this.token_type = token_type ? token_type : null;
    }
}
