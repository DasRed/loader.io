import Endpoint from '../Endpoint.js';

export default class Application extends Endpoint {
    static STATUS = {
        VERIFIED:   'verified',
        UNVERIFIED: 'unverified', // TODO is this the real value?
    };

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

    /**
     *
     * @return {Promise<boolean>}
     */
    async delete() {
        try {
            await this.client.request(`apps/${this.id}`, Client.METHOD.DELETE);
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

        const data = await this.client.request(`apps/${this.id}`, Client.METHOD.POST, {body: `method=http`});

        if (data.message === 'success') {
            this.status = Application.STATUS.VERIFIED;
        }

        return this.status === Application.STATUS.VERIFIED;
    }
}
