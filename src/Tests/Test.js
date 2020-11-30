import Endpoint from '../Endpoint.js';
import Url from './Url.js';
import Results from './Results.js';
import Client from '../Client.js';

export default class Test extends Endpoint {
    static STATUS = {
        PENDING:  'pending',
        RUNNING:  'running',
        COMPLETE: 'complete',
    };

    static TYPE = {
        CLIENTS_PER_TEST:     'per-test',
        CLIENTS_PER_SECOND:   'per-second',
        MAINTAIN_CLIENT_LOAD: 'maintain-load',
    };

    /**
     * @var {Results}
     */
    #results;

    /**
     *
     * @return {Results}
     */
    get results() {
        if (this.#results === undefined) {
            this.#results = new Results(this.client, this.test_id);
        }

        return this.#results;
    }

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
     * @param {string} callback
     * @param {string} callback_email
     * @param {string|Date} scheduled_at
     * @param {string} notes
     * @param {string[]} tag_names
     */
    constructor(client,
                {
                    name,
                    duration,
                    timeout,
                    notes,
                    tag_names,
                    initial,
                    total,
                    status,
                    test_id,
                    test_type,
                    callback,
                    callback_email,
                    scheduled_at,
                    domain,
                    urls,
                }
    ) {
        super(client);

        // API delivers different type values as used for creation
        switch (test_type) {
            case 'Clients per second':
            case Test.TYPE.CLIENTS_PER_SECOND:
                test_type = Test.TYPE.CLIENTS_PER_SECOND;
                break;

            case 'Cycling':
            case Test.TYPE.MAINTAIN_CLIENT_LOAD:
                test_type = Test.TYPE.MAINTAIN_CLIENT_LOAD;
                break;

            case 'Non-Cycling':
            case Test.TYPE.CLIENTS_PER_TEST:
            default:
                test_type = Test.TYPE.CLIENTS_PER_TEST;
                break;
        }

        this.name           = name;
        this.duration       = duration;
        this.timeout        = timeout;
        this.notes          = notes;
        this.tag_names      = tag_names; // missing in get and list of API
        this.initial        = initial;
        this.total          = total;
        this.status         = status;
        this.test_id        = test_id;
        this.test_type      = test_type;
        this.callback       = callback;
        this.callback_email = callback_email;
        this.scheduled_at   = scheduled_at instanceof Date ? scheduled_at : new Date(scheduled_at);
        this.domain         = domain;
        this.urls           = (urls || []).map((url) => url instanceof Url ? url : new Url(url));
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

    /**
     *
     * @return {{notes: string, initial: number, scheduled_at: string, timeout: number, test_type: string, duration: number, total: number, callback_email: string, urls: *[], domain: string, name: string, callback: string, status: string, test_id: string}}
     */
    toJSON() {
        return {
            name:           this.name,
            duration:       this.duration,
            timeout:        this.timeout,
            notes:          this.notes,
            initial:        this.initial,
            total:          this.total,
            status:         this.status,
            test_id:        this.test_id,
            test_type:      this.test_type,
            callback:       this.callback,
            callback_email: this.callback_email,
            scheduled_at:   this.scheduled_at.toJSON(),
            domain:         this.domain,
            urls:           this.urls.map((url) => url.toJSON()),
        };
    }
}
