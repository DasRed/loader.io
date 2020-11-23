import Variable from './Variable.js';
import Authentication from './Authentication.js';

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
     * @param {string} [request_type]
     * @param {string} [truncated_url]
     * @param {Object|null} [authentication]
     * @param {Authentication|Object} authentication.type
     * @param {Object.<string, string>} [headers = {}]
     * @param {Object.<string, string>} [request_params = {}]
     * @param {string|null} [raw_post_body = null]
     * @param {string|null} [payload_file_url = null]
     * @param {Variable[]} [variables = []]
     */
    constructor({
                    url,
                    truncated_url,
                    raw_post_body = null,
                    request_type = Url.TYPE.GET,
                    payload_file_url = null,
                    headers = null,
                    request_params = null,
                    variables = null,
                    authentication = null,
                }) {
        this.url              = url;
        this.truncated_url    = truncated_url;
        this.raw_post_body    = raw_post_body;
        this.request_type     = request_type;
        this.payload_file_url = payload_file_url;
        this.headers          = headers;
        this.request_params   = request_params;
        this.variables        = variables == null ? variables : variables.map((variable) => variable instanceof Variable ? variable : new Variable(variable));
        this.authentication   = authentication == null ? authentication : new Authentication(authentication);
    }

    /**
     *
     * @return {{headers: Object<string, string>, variables: *[], request_type: string, raw_post_body: (string|null), request_params: Object<string, string>, truncated_url: string, payload_file_url: (string|null), url: string, authentication: {password: string, type: string, login: string}}}
     */
    toJSON() {
        return {
            url:              this.url,
            truncated_url:    this.truncated_url || undefined,
            raw_post_body:    this.raw_post_body || undefined,
            request_type:     this.request_type,
            payload_file_url: this.payload_file_url || undefined,
            headers:          this.headers || undefined,
            request_params:   this.request_params || undefined,
            variables:        this.variables instanceof Variable ? this.variables.map((variable) => variable.toJSON()): undefined,
            authentication:   this.authentication instanceof Authentication ? this.authentication.toJSON() : undefined,
        };
    }
}
