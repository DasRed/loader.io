import Client from '../Client.js';

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
    //
    //describe('.request()', () => {
    //    test('with parameters, request body is Object, response status 200', () => {
    //        fail('todo');
    //    });
    //
    //    test('with parameters, request body is not Object, response status 204', () => {
    //        fail('todo');
    //    });
    //
    //    test('with response status is not 200 or 204', () => {
    //        fail('todo');
    //    });
    //
    //    test('with error, which is not an instance of Exception', () => {
    //        fail('todo');
    //    });
    //});
});
