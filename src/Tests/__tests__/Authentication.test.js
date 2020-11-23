import Authentication from '../Authentication.js';

describe('Authentication', () => {
    test('.constructor()', () => {
        const auth = new Authentication({
            type:     Authentication.TYPE.HTTP_BASIC_AUTH,
            login:    'nuff',
            password: 'narf',
        });

        expect(auth.type).toBe(Authentication.TYPE.HTTP_BASIC_AUTH);
        expect(auth.login).toBe('nuff');
        expect(auth.password).toBe('narf');
    });

    test('.toJSON()', () => {
        const auth = new Authentication({
            type:     Authentication.TYPE.HTTP_BASIC_AUTH,
            login:    'nuff',
            password: 'narf',
        });

        expect(auth.toJSON()).toEqual({
            type:     Authentication.TYPE.HTTP_BASIC_AUTH,
            login:    'nuff',
            password: 'narf',
        });
    });
});
