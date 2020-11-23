import Application from '../Application.js';
import Client from '../../Client.js';

describe('Application', () => {
    test('.constructor()', () => {
        const client = new Client('xxx');

        const application = new Application(client, {
            app:    'nuff',
            app_id: 'narf',
            status: Application.STATUS.VERIFIED
        });

        expect(application.client).toBe(client);
        expect(application.app_id).toBe('narf');
        expect(application.app).toBe('nuff');
        expect(application.status).toBe(Application.STATUS.VERIFIED);
    });

    describe('.delete()', () => {
        test('success', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue(undefined);

            const application = new Application(client, {
                app:    'nuff',
                app_id: 'narf',
                status: Application.STATUS.VERIFIED
            });

            expect(await application.delete()).toBe(true);
            expect(requestSpy).toHaveBeenCalledWith('apps/narf', Client.METHOD.DELETE);
        });

        test('failed', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockRejectedValue(undefined)

            const application = new Application(client, {
                app:    'nuff',
                app_id: 'narf',
                status: Application.STATUS.VERIFIED
            });

            expect(await application.delete()).toBe(false);
            expect(requestSpy).toHaveBeenCalledWith('apps/narf', Client.METHOD.DELETE);
        });
    });

    describe('.verify()', () => {
        test('success with already verified', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue(undefined);

            const application = new Application(client, {
                app:    'nuff',
                app_id: 'narf',
                status: Application.STATUS.VERIFIED
            });

            expect(await application.verify()).toBe(true);
            expect(requestSpy).not.toHaveBeenCalled();
        });

        test('success without previous verified', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue({message: 'success'});

            const application = new Application(client, {
                app:    'nuff',
                app_id: 'narf',
                status: Application.STATUS.UNVERIFIED
            });

            expect(await application.verify()).toBe(true);
            expect(requestSpy).toHaveBeenCalledWith('apps/narf', Client.METHOD.POST, {body: `method=http`})
        });

        test('failed', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue({message: 'failed'});

            const application = new Application(client, {
                app:    'nuff',
                app_id: 'narf',
                status: Application.STATUS.UNVERIFIED
            });

            expect(await application.verify()).toBe(false);
            expect(requestSpy).toHaveBeenCalledWith('apps/narf', Client.METHOD.POST, {body: `method=http`})
        });
    });
});
