import LoaderIO from '../LoaderIO.js';
import Applications from '../Application/Applications.js';
import Tests from '../Tests/Tests.js';
import Servers from '../Servers.js';
import Client from '../Client.js';

describe('LoaderIO', () => {
    describe('.constructor()', () => {
        test('with values', () => {
            const loaderIO = new LoaderIO({token: 'nuff', server: 'https://exampe.narf', version: 'v7'});

            expect(loaderIO.applications).toBeInstanceOf(Applications);
            expect(loaderIO.tests).toBeInstanceOf(Tests);
            expect(loaderIO.servers).toBeInstanceOf(Servers);

            /** @var {Client} */
            const client = loaderIO.applications.client;
            expect(client).toBeInstanceOf(Client);
            expect(client.token).toBe('nuff');
            expect(client.server).toBe('https://exampe.narf');
            expect(client.version).toBe('v7');

            expect(loaderIO.applications.client).toBe(client);
            expect(loaderIO.tests.client).toBe(client);
            expect(loaderIO.servers.client).toBe(client);
        });

        test('with defaults', () => {
            const loaderIO = new LoaderIO({token: 'nuff'});

            expect(loaderIO.applications).toBeInstanceOf(Applications);
            expect(loaderIO.tests).toBeInstanceOf(Tests);
            expect(loaderIO.servers).toBeInstanceOf(Servers);

            /** @var {Client} */
            const client = loaderIO.applications.client;
            expect(client).toBeInstanceOf(Client);
            expect(client.token).toBe('nuff');
            expect(client.server).toBe('https://api.loader.io');
            expect(client.version).toBe('v2');

            expect(loaderIO.applications.client).toBe(client);
            expect(loaderIO.tests.client).toBe(client);
            expect(loaderIO.servers.client).toBe(client);
        });
    });
});
