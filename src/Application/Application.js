import Endpoint from '../Endpoint.js';
import Client from '../Client.js';

export default class Application extends Endpoint {
    static STATUS = {
        VERIFIED:   'verified',
        UNVERIFIED: 'unverified', // TODO is this the real value?
    };

    /**
     *
     * @param {Client} client
     * @param {string} app
     * @param {string} app_id
     * @param {string} status
     */
    constructor(client, {app, app_id, status}) {
        super(client);

        this.app_id = app_id;
        this.app    = app;
        this.status = status;
    }

    /**
     *
     * @return {Promise<boolean>}
     */
    async delete() {
        try {
            await this.client.request(`apps/${this.app_id}`, Client.METHOD.DELETE);
        }
        catch {
            return false;
        }

        return true;
    }

    /**
     *
     * @return {Promise<boolean>}
     */
    async verify() {
        if (this.status === Application.STATUS.VERIFIED) {
            return true;
        }

        const data = await this.client.request(`apps/${this.app_id}`, Client.METHOD.POST, {body: `method=http`});

        if (data.message === 'success') {
            this.status = Application.STATUS.VERIFIED;
        }

        return this.status === Application.STATUS.VERIFIED;
    }
}
