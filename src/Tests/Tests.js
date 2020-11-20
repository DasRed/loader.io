import Endpoint from '../Endpoint.js';
import Test from '../Tests/Test.js';
import Exception from '../Exception.js';

export default class Tests extends Endpoint {
    /**
     *
     * @return {Promise<Test[]>}
     */
    async list() {
        const data = await this.client.request('tests', Client.METHOD.GET);
        if (data === undefined) {
            return [];
        }

        return data.map((entry) => new Test(this.client, entry));
    }

    /**
     *
     * @param {string} app this is the domain, for which the test must be done
     * @return {Promise<Test>}
     */
    async create(app) {
        const data = await this.client.request('tests', Client.METHOD.POST, {body: `app=${app}`});
        if (data === undefined) {
            throw new Exception(`Loader.io app ${app} can not be created.`);
        }

        return new Test(this.client, data);
    }

    /**
     *
     * @param {string} id
     * @return {Promise<Test>}
     */
    async get(id) {
        const data = await this.client.request(`tests/${id}`, Client.METHOD.GET);
        if (data === undefined) {
            throw new Exception(`Loader.io app ${app} can not be found.`);
        }

        return new Test(this.client, data);
    }
}
