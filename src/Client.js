import {fetch} from 'whatwg-fetch';
import qs from 'qs';
import Exception from './Exception.js';

export default class Client {
    static METHOD = {
        GET:    'GET',
        POST:   'POST',
        PATCH:  'PATCH',
        PUT:  'PUT',
        DELETE: 'DELETE',
    };

    /**
     *
     * @param {string} token
     * @param {string} server
     * @param {string} version
     */
    constructor(token, server = 'https://api.loader.io', version = 'v2') {
        this.token   = token;
        this.server  = server;
        this.version = version;
    }

    /**
     *
     * @return {Promise<*>}
     */
    async request(path, method, {parameters, body} = {}) {
        const query = qs.stringify(parameters, {
            encodeValuesOnly: true,
            arrayFormat:      'brackets',
            addQueryPrefix:   true
        });
        const url   = `${this.server}/${this.version}/${path}${query}`;

        try {
            /** @type {Response} */
            const response = await fetch(url, {
                method,
                body,
                headers: {'loaderio-auth': this.token},
            });

            switch (response.status) {
                case 200:
                    return await response.json();

                case 204:
                    return undefined;

                default:
                    //noinspection ExceptionCaughtLocallyJS
                    throw new Exception(`Loader.io request ${url} failed with response code ${response.status} (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#1xx_informational_response).`, response);
            }
        }
        catch (error) {
            if (error instanceof Exception) {
                throw error;
            }

            throw new Exception(`Loader.io request ${url} failed with error ${error}`, error);
        }
    }
}
