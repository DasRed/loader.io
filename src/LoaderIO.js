import Applications from './Application/Applications.js';
import Tests from './Tests/Tests.js';
import Results from './Results.js';
import Servers from './Servers.js';
import Client from './Client.js';

export default class LoaderIO {
    /**
     *
     * @param {string} token
     * @param {string} server
     * @param {string} version
     */
    constructor(token, server = 'https://api.loader.io', version = 'v2') {
        const client      = new Client(token, server, version);

        this.applications = new Applications(client);
        this.tests        = new Tests(client);
        this.results      = new Results(client);
        this.servers      = new Servers(client);
    }
}
