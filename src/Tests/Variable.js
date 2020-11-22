export default class Variable {
    /**
     *
     * @param {string} name
     * @param {string} property
     * @param {string} source
     */
    constructor({name, property, source}) {
        this.name     = name;
        this.property = property;
        this.source   = source;
    }
}
