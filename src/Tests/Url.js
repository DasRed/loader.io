import Variable from './Variable.js';

export default class Url {
    static TYPE = {
        GET:    'GET',
        POST:   'POST',
        PUT:    'PUT',
        PATCH:  'PATCH',
        DELETE: 'DELETE',
    }

    /**
     *
     * @param {string} url
     * @param {string} request_type
     * @param {Object} [credentials]
     * @param {string} credentials.login
     * @param {string} credentials.password
     * @param {Object} [headers]
     * @param {Object} [request_params]
     * @param {string} [raw_post_body]
     * @param {string} [payload_file_url]
     * @param {Variable[]} [variables = undefined]
     */
    constructor({
                    url,
                    request_type = Url.TYPE.GET,
                    credentials = undefined,
                    headers = undefined,
                    request_params = undefined,
                    raw_post_body = undefined,
                    payload_file_url,
                    variables = undefined,
                }) {
        this.url              = url;
        this.request_type     = request_type;
        this.credentials      = credentials;
        this.headers          = headers;
        this.request_params   = request_params;
        this.raw_post_body    = raw_post_body;
        this.payload_file_url = payload_file_url;
        this.variables        = (variables || []).map((variable) => variable instanceof Variable ? variable : new Variable(variable));
    }
}
