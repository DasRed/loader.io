import Url from '../Url.js';
import Variable from '../Variable.js';
import Authentication from '../Authentication.js';

describe('Url', () => {
    describe('.constructor()', () => {
        test('with Objects', () => {
            const variable = new Variable({
                name:     'vn2',
                property: 'vp2',
                source:   'vs2'
            });

            const authentication = new Authentication({
                type:     Authentication.TYPE.HTTP_BASIC_AUTH,
                login:    'loginNarf',
                password: 'passwordNarf'
            });

            const url = new Url({
                url:              'nuff',
                truncated_url:    'narf',
                raw_post_body:    'rofl',
                request_type:     Url.TYPE.POST,
                payload_file_url: 'roflcopter',
                headers:          {'Content-Type': 'application/json'},
                request_params:   {v1: 'vv1'},
                variables:        [
                    {
                        name:     'vn1',
                        property: 'vp1',
                        source:   'vs1'
                    },
                    variable
                ],
                authentication,
            });

            expect(url.url).toBe('nuff');
            expect(url.truncated_url).toBe('narf');
            expect(url.raw_post_body).toBe('rofl');
            expect(url.request_type).toBe(Url.TYPE.POST);
            expect(url.payload_file_url).toBe('roflcopter');
            expect(url.headers).toBeInstanceOf(Object);
            expect(url.headers['Content-Type']).toBe('application/json');
            expect(url.request_params).toBeInstanceOf(Object);
            expect(url.request_params.v1).toBe('vv1');
            expect(url.variables).toBeInstanceOf(Array);
            expect(url.variables).toHaveLength(2);
            expect(url.variables[0]).toBeInstanceOf(Variable);
            expect(url.variables[0].name).toBe('vn1');
            expect(url.variables[0].property).toBe('vp1');
            expect(url.variables[0].source).toBe('vs1');
            expect(url.variables[1]).toBe(variable);
            expect(url.authentication).toBe(authentication);
        });

        test('with plain objects', () => {
            const variable = new Variable({
                name:     'vn2',
                property: 'vp2',
                source:   'vs2'
            });

            const url = new Url({
                url:              'nuff',
                truncated_url:    'narf',
                raw_post_body:    'rofl',
                request_type:     Url.TYPE.POST,
                payload_file_url: 'roflcopter',
                headers:          {'Content-Type': 'application/json'},
                request_params:   {v1: 'vv1'},
                variables:        [
                    {
                        name:     'vn1',
                        property: 'vp1',
                        source:   'vs1'
                    },
                    variable
                ],
                authentication:   {
                    type:     Authentication.TYPE.HTTP_BASIC_AUTH,
                    login:    'loginNarf',
                    password: 'passwordNarf'
                },
            });

            expect(url.url).toBe('nuff');
            expect(url.truncated_url).toBe('narf');
            expect(url.raw_post_body).toBe('rofl');
            expect(url.request_type).toBe(Url.TYPE.POST);
            expect(url.payload_file_url).toBe('roflcopter');
            expect(url.headers).toBeInstanceOf(Object);
            expect(url.headers['Content-Type']).toBe('application/json');
            expect(url.request_params).toBeInstanceOf(Object);
            expect(url.request_params.v1).toBe('vv1');
            expect(url.variables).toBeInstanceOf(Array);
            expect(url.variables).toHaveLength(2);
            expect(url.variables[0]).toBeInstanceOf(Variable);
            expect(url.variables[0].name).toBe('vn1');
            expect(url.variables[0].property).toBe('vp1');
            expect(url.variables[0].source).toBe('vs1');
            expect(url.variables[1]).toBe(variable);
            expect(url.authentication).toBeInstanceOf(Authentication);
            expect(url.authentication.type).toBe(Authentication.TYPE.HTTP_BASIC_AUTH);
            expect(url.authentication.login).toBe('loginNarf');
            expect(url.authentication.password).toBe('passwordNarf');
        });

        test('with defaults', () => {
            const url = new Url({url: 'nuff'});

            expect(url.url).toBe('nuff');
            expect(url.truncated_url).toBeNull();
            expect(url.raw_post_body).toBeNull();
            expect(url.request_type).toBe(Url.TYPE.GET);
            expect(url.payload_file_url).toBeNull();
            expect(url.headers).toBeNull();
            expect(url.request_params).toBeNull();
            expect(url.variables).toBeNull();
            expect(url.authentication).toBeNull();
        });
    });

    describe('.toJSON()', () => {
        test('with values', () => {
            const variable = new Variable({
                name:     'vn2',
                property: 'vp2',
                source:   'vs2'
            });

            const url = new Url({
                url:              'nuff',
                truncated_url:    'narf',
                raw_post_body:    'rofl',
                request_type:     Url.TYPE.POST,
                payload_file_url: 'roflcopter',
                headers:          {'Content-Type': 'application/json'},
                request_params:   {v1: 'vv1'},
                variables:        [
                    {
                        name:     'vn1',
                        property: 'vp1',
                        source:   'vs1'
                    },
                    variable
                ],
                authentication:   {
                    type:     Authentication.TYPE.HTTP_BASIC_AUTH,
                    login:    'loginNarf',
                    password: 'passwordNarf'
                },
            });

            expect(url.toJSON()).toEqual({
                url:              'nuff',
                truncated_url:    'narf',
                raw_post_body:    'rofl',
                request_type:     Url.TYPE.POST,
                payload_file_url: 'roflcopter',
                headers:          {'Content-Type': 'application/json'},
                request_params:   {v1: 'vv1'},
                variables:        [
                    {
                        name:     'vn1',
                        property: 'vp1',
                        source:   'vs1'
                    },
                    {
                        name:     'vn2',
                        property: 'vp2',
                        source:   'vs2'
                    }
                ],
                authentication:   {
                    type:     Authentication.TYPE.HTTP_BASIC_AUTH,
                    login:    'loginNarf',
                    password: 'passwordNarf'
                },
            });
        });

        test('with defaults', () => {
            const url = new Url({url: 'nuff'});

            expect(url.toJSON()).toEqual({
                url:              'nuff',
                truncated_url:    undefined,
                raw_post_body:    undefined,
                request_type:     Url.TYPE.GET,
                payload_file_url: undefined,
                headers:          undefined,
                request_params:   undefined,
                variables:        undefined,
                authentication:   undefined,
            });
        });
    });
});
