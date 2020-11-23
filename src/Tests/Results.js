import Endpoint from '../Endpoint.js';
import Exception from '../Exception.js';
import Result from './Result.js';
import Client from '../Client.js';

export default class Results extends Endpoint {
    /**
     *
     * @param {Client} client
     * @param {string} testId
     */
    constructor(client, testId) {
        super(client);

        this.testId = testId;
    }

    /**
     *
     * @param {string} id
     * @return {Promise<Result>}
     */
    async get(id) {
        const data = await this.client.request(`tests/${this.testId}/results/${id}`, Client.METHOD.GET);
        if (data === undefined) {
            throw new Exception(`Loader.io result ${id} can not be found.`);
        }

        return new Result(data);
    }

    /**
     * @return {Promise<Result[]>}
     */
    async list() {
        const data = await this.client.request(`tests/${this.testId}/results`, Client.METHOD.GET);
        if (data === undefined) {
            return [];
        }

        return data.map((entry) => new Result(entry));
    }
}
