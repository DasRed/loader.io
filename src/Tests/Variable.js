export default class Variable {
    static SOURCE = {
        HEADER: 'header'
    };

    /**
     *
     * @param {string} name
     * @param {string} property
     * @param {string} [source = Variable.SOURCE.HEADER]
     */
    constructor({
                    name,
                    property,
                    source = Variable.SOURCE.HEADER
                }) {
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
