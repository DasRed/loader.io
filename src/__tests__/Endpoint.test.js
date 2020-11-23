import Endpoint from '../Endpoint.js';
import Client from '../Client.js';

describe('Endpoint', () => {
    test('.constructor()', () => {
        const client = new Client('narf');
        const endpoint = new Endpoint(client);

        expect(endpoint.client).toBe(client);
    });
});
