export default class Authentication {
    static TYPE = {
        HTTP_BASIC_AUTH: 'basic'
    };

    /**
     *
     * @param {string} type
     * @param {string} login
     * @param {string} password
     */
    constructor({type, login, password}) {
        this.type     = type;
        this.login    = login;
        this.password = password;
    }

    /**
     *
     * @return {{password: string, type: string, login: string}}
     */
    toJSON() {
        return {
            type:     this.type,
            login:    this.login,
            password: this.password,
        };
    }
}
