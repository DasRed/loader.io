import Endpoint from '../Endpoint.js';
import Test from '../Tests/Test.js';
import Exception from '../Exception.js';

/**
 * @typedef {Object} LoaderIOTestCreateData
 * @property {string} name
 * @property {string} [test_type = Test.TYPE.CYCLING]
 * @property {string[]} urls
 * @property {number} duration
 * @property {number} [initial = 1] will be ignored for non-cycling tests
 * @property {number} [total = 25]
 * @property {number} [timeout = 10000]
 * @property {number} [error_threshold = 50]
 * @property {string} [callback]
 * @property {string} [callback_email]
 * @property {Date} [scheduled_at]
 * @property {string} [notes]
 */

export default class Tests extends Endpoint {
    /**
     * @param {LoaderIOTestCreateData} data
     * @return {Promise<Test>}
     */
    async create(data) {
        const responseData = await this.client.request('tests', Client.METHOD.POST, {
            body: {
                test_type:       Test.TYPE.CLIENTS_PER_SECOND,
                initial:         1,
                total:           25,
                timeout:         10000,
                error_threshold: 50,
                ...data
            }
        });

        if (responseData === undefined) {
            throw new Exception(`Loader.io test ${data.name} can not be created.`);
        }

        return this.get(responseData.id);
    }

    /**
     *
     * @param {string} id
     * @return {Promise<Test>}
     */
    async get(id) {
        const data = await this.client.request(`tests/${id}`, Client.METHOD.GET);
        if (data === undefined) {
            throw new Exception(`Loader.io test ${id} can not be found.`);
        }

        return new Test(this.client, data);
    }

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
}
