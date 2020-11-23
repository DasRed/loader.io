import Endpoint from './Endpoint.js';

export default class Servers extends Endpoint {
    /**
     *
     * @return {Promise<string[]>}
     */
    async list() {
        const data = await this.client.request('servers', Client.METHOD.GET);
        if (data === undefined) {
            return [];
        }

        return data?.ip_addresses || [];
    }
}
