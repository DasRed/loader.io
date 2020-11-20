import Endpoint from '../Endpoint.js';

export default class Test extends Endpoint {
    /**
     *
     * @param {Client} client
     * @param {Object} data
     */
    constructor(client, data) {
        super(client);

        this.app             = data.app;
        this.app_id          = data.app_id;
        this.status          = data.status;
        this.verification_id = data.verification_id;
    }
}
