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

    /**
     *
     * @return {{name: string, property: string, source: string}}
     */
    toJSON() {
        return {
            name:     this.name,
            property: this.property,
            source:   this.source,
        };
    }
}
