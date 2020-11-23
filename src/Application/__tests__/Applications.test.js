import Applications from '../Applications.js';
import Client from '../../Client.js';
import Application from '../Application.js';
import Exception from '../../Exception.js';

describe('Applications', () => {
    describe('.create()', () => {
        test('success', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue({
                app:    'nuff',
                app_id: 'narf',
                status: Application.STATUS.VERIFIED
            });

            const applications = new Applications(client);
            const application  = await applications.create('nuff');

            expect(application).toBeInstanceOf(Application);
            expect(application.client).toBe(client);
            expect(application.app).toBe('nuff');
            expect(application.app_id).toBe('narf');
            expect(application.status).toBe(Application.STATUS.VERIFIED);
            expect(requestSpy).toHaveBeenCalledWith('apps', Client.METHOD.POST, {body: 'app=nuff'});
        });

        test('failed', async () => {
            const client = new Client('xxx');
            jest.spyOn(client, 'request').mockResolvedValue(undefined);

            const applications = new Applications(client);
            try {
                await applications.create('nuff');
            }
            catch (error) {
                expect(error).toBeInstanceOf(Exception);
                expect(error.message).toBe('Loader.io app nuff can not be created.');
            }
        });
    });

    describe('.get()', () => {
        test('success', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue({
                app:    'nuff',
                app_id: 'narf',
                status: Application.STATUS.VERIFIED
            });

            const applications = new Applications(client);
            const application  = await applications.get('nuff');

            expect(application).toBeInstanceOf(Application);
            expect(application.client).toBe(client);
            expect(application.app).toBe('nuff');
            expect(application.app_id).toBe('narf');
            expect(application.status).toBe(Application.STATUS.VERIFIED);
            expect(requestSpy).toHaveBeenCalledWith('apps/nuff', Client.METHOD.GET);
        });

        test('failed', async () => {
            const client = new Client('xxx');
            jest.spyOn(client, 'request').mockResolvedValue(undefined);

            const applications = new Applications(client);
            try {
                await applications.get('narf');
            }
            catch (error) {
                expect(error).toBeInstanceOf(Exception);
                expect(error.message).toBe('Loader.io app narf can not be found.');
            }
        });
    });

    describe('.list()', () => {
        test('success', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue([{
                app:    'nuff',
                app_id: 'narf',
                status: Application.STATUS.VERIFIED
            }]);

            const applications = new Applications(client);
            const result       = await applications.list('nuff');

            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(Application);
            expect(result[0].client).toBe(client);
            expect(result[0].app).toBe('nuff');
            expect(result[0].app_id).toBe('narf');
            expect(result[0].status).toBe(Application.STATUS.VERIFIED);
            expect(requestSpy).toHaveBeenCalledWith('apps', Client.METHOD.GET);
        });

        test('success empty', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue(undefined);

            const applications = new Applications(client);
            const result       = await applications.list('nuff');

            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveLength(0);
            expect(requestSpy).toHaveBeenCalledWith('apps', Client.METHOD.GET);
        });
    });
});
