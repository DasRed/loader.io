import Endpoint from '../Endpoint.js';
import Url from './Url.js';
import Client from '../Client.js';

export default class Test extends Endpoint {
    static STATUS = {
        PENDING:  'pending',
        RUNNING:  'running',
        COMPLETE: 'complete',
    };

    static TYPE   = {
        CLIENTS_PER_TEST:     'Non-Cycling',
        CLIENTS_PER_SECOND:   'Clients per second',
        MAINTAIN_CLIENT_LOAD: 'Cycling',
    };

    /**
     *
     * @param {Client} client
     * @param {string} test_id
     * @param {string} name
     * @param {string} domain
     * @param {string} status
     * @param {string} test_type
     * @param {Url[]} urls
     * @param {number} duration
     * @param {number} initial
     * @param {number} total
     * @param {number} timeout
     * @param errorThreshold
     * @param {string} error_threshold
     * @param {string} callback
     * @param {string} callback_email
     * @param {string} scheduled_at
     * @param {string} notes
     */
    constructor(client,
                {
                    name,
                    duration,
                    timeout,
                    notes,
                    initial,
                    total,
                    status,
                    test_id,
                    test_type,
                    callback,
                    callback_email,
                    scheduled_at,
                    domain,

                    error_threshold,
                    urls,
                }
    ) {
        super(client);

        this.test_id         = test_id;
        this.name            = name;
        this.domain          = domain;
        this.status          = status;
        this.test_type       = test_type;
        this.duration        = duration;
        this.initial         = initial;
        this.total           = total;
        this.timeout         = timeout;
        this.error_threshold = error_threshold;
        this.callback        = callback;
        this.callback_email  = callback_email;
        this.scheduled_at    = scheduled_at;
        this.notes           = notes;
        this.urls            = (urls || []).map((url) => url instanceof Url ? url : new Url(url));
    }

    /**
     *
     * @return {Promise<boolean>}
     */
    async delete() {
        try {
            // TODO validate if this is possible
            await this.client.request(`tests/${this.test_id}`, Client.METHOD.DELETE);
        }
        catch {
            return false;
        }

        return true;
    }

    /**
     *
     * @return {Promise<boolean>}
     */
    async run() {
        if (this.status !== Test.STATUS.RUNNING) {
            const responseData = await this.client.request(`tests/${this.test_id}/run`, Client.METHOD.PUT);
            this.status        = responseData.status;
        }

        return this.status === Test.STATUS.RUNNING;
    }

    /**
     *
     * @return {Promise<boolean>}
     */
    async stop() {
        if (this.status === Test.STATUS.RUNNING) {
            const responseData = await this.client.request(`tests/${this.test_id}/stop`, Client.METHOD.PUT);
            this.status        = responseData.status;
        }

        return this.status !== Test.STATUS.RUNNING;
    }
}
