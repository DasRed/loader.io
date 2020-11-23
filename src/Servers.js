import Endpoint from './Endpoint.js';
import Client from './Client.js';

export default class Servers extends Endpoint {
    /**
     *
     * @return {Promise<string[]>}
     */
    async list() {
        const data = await this.client.request('servers', Client.METHOD.GET);

        return data?.ip_addresses || [];
    }
}
