import Servers from '../Servers.js';
import Client from '../Client.js';

describe('Servers', () => {
    describe('.list()', () => {
        test('success', async () => {
            const ips        = ['42', '22'];
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue({ip_addresses: ips});

            const servers = await (new Servers(client)).list();

            expect(servers).toBe(ips);
            expect(requestSpy).toHaveBeenCalledWith('servers', Client.METHOD.GET);
        });

        test('failed', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue(undefined);

            const servers = await (new Servers(client)).list();

            expect(servers).toBeInstanceOf(Array);
            expect(servers).toHaveLength(0);
            expect(requestSpy).toHaveBeenCalledWith('servers', Client.METHOD.GET);
        });
    });
});
