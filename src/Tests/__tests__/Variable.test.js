import Variable from '../Variable.js';

describe('Variable', () => {
    test('.constructor()', () => {
        const variable = new Variable({
            name:     'nuff',
            property: 'narf',
            source:   'somewhere'
        });

        expect(variable.name).toBe('nuff');
        expect(variable.property).toBe('narf');
        expect(variable.source).toBe('somewhere');
    });

    test('.toJSON()', () => {
        const variable = new Variable({
            name:     'nuff',
            property: 'narf',
            source:   'somewhere'
        });

        expect(variable.toJSON()).toEqual({
            name:     'nuff',
            property: 'narf',
            source:   'somewhere'
        });
    });
});
