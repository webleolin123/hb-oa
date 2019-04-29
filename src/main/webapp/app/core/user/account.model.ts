export class Account {
    constructor(
        public activated: boolean,
        public authorities: string[],
        public email: string,
        public login: string,
        public imageUrl: string
    ) {
        this.activated = activated ? activated : null;
        this.authorities = authorities ? authorities : null;
        this.email = email ? email : null;
        this.login = login ? login : null;
        this.imageUrl = imageUrl ? imageUrl : null;
    }
}
