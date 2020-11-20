import Exception from '../Exception.js';
import Endpoint from '../Endpoint.js';
import Application from './Application.js';

export default class Applications extends Endpoint {
    /**
     *
     * @return {Promise<Application[]>}
     */
    async list() {
        const data = await this.client.request('apps', Client.METHOD.GET);
        if (data === undefined) {
            return [];
        }

        return data.map((entry) => new Application(this.client, entry));
    }

    /**
     *
     * @param {string} app this is the domain, for which the test must be done
     * @return {Promise<Application>}
     */
    async create( app) {
        const data = await this.client.request('apps', Client.METHOD.POST, {body: `app=${app}`});
        if (data === undefined) {
            throw new Exception(`Loader.io app ${app} can not be created.`);
        }

        return new Application(this.client, data);
    }

    /**
     *
     * @param {string} id
     * @return {Promise<Application>}
     */
    async get( id) {
        const data = await this.client.request(`apps/${id}`, Client.METHOD.GET);
        if (data === undefined) {
            throw new Exception(`Loader.io app ${app} can not be found.`);
        }

        return new Application(this.client, data);
    }
}
