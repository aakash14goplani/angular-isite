export class User {

    public email: string;
    public name: string;
    private token: string;
    private tokenExpirationDate: Date;

    constructor(email: string, name: string, token: string, tokenExpirationDate: Date) {
        this.email = email;
        this.name = name;
        this.token = token;
        this.tokenExpirationDate = tokenExpirationDate;
    }

    public getToken(): string {
        if ( this.tokenExpirationDate && this.tokenExpirationDate > (new Date()) ) {
            return this.token;
        }
        return null;
    }
}
