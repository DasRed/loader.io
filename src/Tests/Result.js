export default class Result {
    /**
     *
     * @param {string} result_id
     * @param {string|Date} started_at
     * @param {string} status
     * @param {string} public_results_url
     * @param {number} success
     * @param {number} error
     * @param {number} timeout_error
     * @param {number} network_error
     * @param {number} data_sent
     * @param {number} data_received
     * @param {number} avg_response_time
     * @param {number} avg_error_rate
     */
    constructor({
                    result_id,
                    started_at,
                    status,
                    public_results_url,
                    success,
                    error,
                    timeout_error,
                    network_error,
                    data_sent,
                    data_received,
                    avg_response_time,
                    avg_error_rate
                }) {
        this.result_id          = result_id;
        this.started_at         = started_at instanceof Date ? started_at : new Date(started_at);
        this.status             = status;
        this.public_results_url = public_results_url;
        this.success            = success;
        this.error              = error;
        this.timeout_error      = timeout_error;
        this.network_error      = network_error;
        this.data_sent          = data_sent;
        this.data_received      = data_received;
        this.avg_response_time  = avg_response_time;
        this.avg_error_rate     = avg_error_rate;
    }
}
