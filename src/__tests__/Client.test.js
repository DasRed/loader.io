import Client from '../Client.js';
import fetch from 'node-fetch';
import Exception from '../Exception.js';

describe('Client', () => {
    describe('.constructor()', () => {
        test('with values', () => {
            const client = new Client('nuff', 'https://exampe.narf', 'v7');

            expect(client.token).toBe('nuff');
            expect(client.server).toBe('https://exampe.narf');
            expect(client.version).toBe('v7');
        });

        test('with defaults', () => {
            const client = new Client('nuff');

            expect(client.token).toBe('nuff');
            expect(client.server).toBe('https://api.loader.io');
            expect(client.version).toBe('v2');
        });
    });

    describe('.request()', () => {
        test('with parameters, request body is Object, response status 200', async () => {
            const data         = {};
            fetch.resolveValue = {
                status: 200,
                async json() {
                    return data;
                }
            };

            const client = new Client('nuff');

            expect(await client.request('narf', Client.METHOD.GET, {
                parameters: {
                    p1: 'p1',
                    p2: 'p2'
                },
                body:       {rofl: 'copter'}
            })).toBe(data);

            expect(fetch.args).toBeInstanceOf(Array);
            expect(fetch.args).toHaveLength(2);
            expect(fetch.args[0]).toBe('https://api.loader.io/v2/narf?p1=p1&p2=p2')
            expect(fetch.args[1]).toEqual({
                method:     Client.METHOD.GET,
                parameters: {
                    p1: 'p1',
                    p2: 'p2'
                },
                body:       JSON.stringify({rofl: 'copter'}),
                headers:    {
                    'loaderio-auth': 'nuff',
                    'Content-Type':  'application/json'
                },
            });
        });

        test('with parameters, request body is not Object, response status 204', async () => {
            fetch.resolveValue = {
                status: 204,
                async json() {
                    fail('This should not be reachable');
                }
            };

            const client = new Client('nuff');

            expect(await client.request('narf', Client.METHOD.GET, {
                parameters: {
                    p1: 'p1',
                    p2: 'p2'
                },
                body:       'narf'
            })).toBeUndefined();

            expect(fetch.args).toBeInstanceOf(Array);
            expect(fetch.args).toHaveLength(2);
            expect(fetch.args[0]).toBe('https://api.loader.io/v2/narf?p1=p1&p2=p2')
            expect(fetch.args[1]).toEqual({
                method:     Client.METHOD.GET,
                parameters: {
                    p1: 'p1',
                    p2: 'p2'
                },
                body:       'narf',
                headers:    {'loaderio-auth': 'nuff'},
            });
        });

        test('with response status is not 200 or 204', async () => {
            const response = {
                status: 404,
                async json() {
                    return {errors: ['nuff', 'narf']};
                }
            };

            fetch.resolveValue = response;
            const client       = new Client('nuff');

            try {
                await client.request('narf', Client.METHOD.GET);
            }
            catch (exception) {
                expect(exception).toBeInstanceOf(Exception);
                expect(exception.message).toBe('nuff. narf. - Loader.io request https://api.loader.io/v2/narf failed with response code 404 (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#1xx_informational_response).');
                expect(exception.data).toBe(response);
            }
        });

        test('with error, which is not an instance of Exception', async () => {
            const error = new Error('rofl');

            fetch.rejectValue = error;
            const client      = new Client('nuff');

            try {
                await client.request('narf', Client.METHOD.GET);
            }
            catch (exception) {
                expect(exception).toBeInstanceOf(Exception);
                expect(exception.message).toBe('Loader.io request https://api.loader.io/v2/narf failed with error rofl');
                expect(exception.data).toBe(error);
            }
        });
    });
});
