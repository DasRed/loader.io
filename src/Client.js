import fetch from 'node-fetch';
import qs from 'qs';
import Exception from './Exception.js';

export default class Client {
    static METHOD = {
        GET:    'GET',
        POST:   'POST',
        PATCH:  'PATCH',
        PUT:    'PUT',
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
    async request(path, method, {parameters = undefined, body = undefined} = {}) {
        const query   = qs.stringify(parameters, {
            encodeValuesOnly: true,
            arrayFormat:      'brackets',
            addQueryPrefix:   true
        });
        const url     = `${this.server}/${this.version}/${path}${query}`;
        const options = {
            method,
            parameters,
            body:    body != null && body instanceof Object ? JSON.stringify(body) : body,
            headers: {'loaderio-auth': this.token},
        };

        if (body != null && body instanceof Object) {
            options.headers['Content-Type'] = 'application/json';
        }

        try {
            /** @type {Response} */
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    return await response.json();

                case 204:
                    return undefined;

                default:
                    const errorMessage = await response.json();
                    //noinspection ExceptionCaughtLocallyJS
                    throw new Exception(`${errorMessage.errors.join('. ')}. - Loader.io request ${url} failed with response code ${response.status} (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#1xx_informational_response).`, response);
            }
        }
        catch (error) {
            if (error instanceof Exception) {
                throw error;
            }

            throw new Exception(`Loader.io request ${url} failed with error ${error.message}`, error);
        }
    }
}
