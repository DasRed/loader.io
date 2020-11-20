export default class Exception extends Error {
    /**
     *
     * @param {string} message
     * @param {Error|Response|Object} [data]
     */
    constructor(message, data = undefined) {
        super(message);

        this.data = data;
    }
}
