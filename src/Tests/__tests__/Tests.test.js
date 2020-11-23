import Tests from '../Tests.js';
import Client from '../../Client.js';
import Test from '../Test.js';
import Url from '../Url.js';
import Exception from '../../Exception.js';

describe('Tests', () => {
    describe('.create()', () => {
        test('success', async () => {
            const data = {
                name:           'nuff',
                duration:       42,
                timeout:        22,
                notes:          'narf',
                initial:        12,
                total:          12012012,
                status:         Test.TYPE.PENDING,
                test_id:        'rofl',
                test_type:      Test.TYPE.CLIENTS_PER_TEST,
                callback:       'callback',
                callback_email: 'callback_email',
                scheduled_at:   '2020-11-24T06:30:00.000Z',
                domain:         'domain',
                urls:           [
                    {url: 'url1'},
                    new Url({url: 'url2'}),
                ],
            };

            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue({
                message: 'success',
                test_id: 'rofl',
            });

            const test = new Test(client, data);

            const tests  = new Tests(client);
            const getSpy = jest.spyOn(tests, 'get').mockResolvedValue(test);

            expect(await tests.create(data)).toBe(test);
            expect(requestSpy).toHaveBeenCalledWith('tests', Client.METHOD.POST, {
                body: {
                    error_threshold: 50, ...data,
                    urls:            [
                        {url: 'url1'},
                        {
                            url:              'url2',
                            truncated_url:    undefined,
                            raw_post_body:    undefined,
                            request_type:     Url.TYPE.GET,
                            payload_file_url: undefined,
                            headers:          undefined,
                            request_params:   undefined,
                            variables:        undefined,
                            authentication:   undefined,
                        },
                    ],
                }
            });
            expect(getSpy).toHaveBeenCalledWith('rofl');
        });

        test('failed', async () => {
            const data = {
                name:           'nuff',
                duration:       42,
                timeout:        22,
                notes:          'narf',
                initial:        12,
                total:          12012012,
                status:         Test.TYPE.PENDING,
                test_id:        'rofl',
                test_type:      Test.TYPE.CLIENTS_PER_TEST,
                callback:       'callback',
                callback_email: 'callback_email',
                scheduled_at:   '2020-11-24T06:30:00.000Z',
                domain:         'domain',
                urls:           [
                    {url: 'url1'},
                    new Url({url: 'url2'}),
                ],
            };

            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue(undefined);

            const tests  = new Tests(client);
            const getSpy = jest.spyOn(tests, 'get');

            try {
                await tests.create(data)
                fail('This should not be reachable');
            }
            catch (exception) {
                expect(exception).toBeInstanceOf(Exception);
                expect(exception.message).toBe('Loader.io test nuff can not be created.');
            }
            expect(requestSpy).toHaveBeenCalledWith('tests', Client.METHOD.POST, {
                body: {
                    error_threshold: 50, ...data,
                    urls:            [
                        {url: 'url1'},
                        {
                            url:              'url2',
                            truncated_url:    undefined,
                            raw_post_body:    undefined,
                            request_type:     Url.TYPE.GET,
                            payload_file_url: undefined,
                            headers:          undefined,
                            request_params:   undefined,
                            variables:        undefined,
                            authentication:   undefined,
                        },
                    ],
                }
            });
            expect(getSpy).not.toHaveBeenCalled();
        });
    });

    describe('.get()', () => {
        test('success', async () => {
            const data = {
                name:           'nuff',
                duration:       42,
                timeout:        22,
                notes:          'narf',
                initial:        12,
                total:          12012012,
                status:         Test.TYPE.PENDING,
                test_id:        'rofl',
                test_type:      Test.TYPE.CLIENTS_PER_TEST,
                callback:       'callback',
                callback_email: 'callback_email',
                scheduled_at:   '2020-11-24T06:30:00.000Z',
                domain:         'domain',
                urls:           []
            };

            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue(data);

            const test = await (new Tests(client)).get('rofl');

            expect(test).toBeInstanceOf(Test);
            expect(test.toJSON()).toEqual(data);
            expect(requestSpy).toHaveBeenCalledWith('tests/rofl', Client.METHOD.GET);
        });

        test('failed', async () => {
            const client = new Client('xxx');
            jest.spyOn(client, 'request').mockResolvedValue(undefined);

            try {
                await (new Tests(client)).get('rofl');
                fail('This should not be reachable');
            }
            catch (exception) {
                expect(exception).toBeInstanceOf(Exception);
                expect(exception.message).toBe('Loader.io test rofl can not be found.');
            }
        });
    });

    describe('.list()', () => {
        test('success', async () => {
            const data = {
                name:           'nuff',
                duration:       42,
                timeout:        22,
                notes:          'narf',
                initial:        12,
                total:          12012012,
                status:         Test.TYPE.PENDING,
                test_id:        'rofl',
                test_type:      Test.TYPE.CLIENTS_PER_TEST,
                callback:       'callback',
                callback_email: 'callback_email',
                scheduled_at:   '2020-11-24T06:30:00.000Z',
                domain:         'domain',
                urls:           []
            };

            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue([data]);

            const tests = await (new Tests(client)).list();

            expect(tests).toBeInstanceOf(Array);
            expect(tests).toHaveLength(1);
            expect(tests[0]).toBeInstanceOf(Test);
            expect(tests[0].toJSON()).toEqual(data);
            expect(requestSpy).toHaveBeenCalledWith('tests', Client.METHOD.GET);
        });

        test('failed', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue(undefined);

            const tests = await (new Tests(client)).list();

            expect(tests).toBeInstanceOf(Array);
            expect(tests).toHaveLength(0);
            expect(requestSpy).toHaveBeenCalledWith('tests', Client.METHOD.GET);
        });
    });
});
