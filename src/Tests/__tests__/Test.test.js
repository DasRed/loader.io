import Test from '../Test.js';
import Client from '../../Client.js';
import Url from '../Url.js';
import Results from '../Results.js';

describe('Test', () => {
    test('.results', () => {
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
            ]
        };

        const client = new Client('xxx');
        const test   = new Test(client, data);

        const results = test.results;
        expect(results).toBeInstanceOf(Results);
        expect(results.client).toBe(client);
        expect(results.testId).toBe('rofl');
        expect(results).toBe(test.results);
    });

    describe('.constructor()', () => {
        test('with date string', () => {
            const url  = new Url({url: 'url2'});
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
                    url,
                ]
            };

            const client = new Client('xxx');
            const test   = new Test(client, data);

            expect(test.client).toBe(client);
            expect(test.duration).toBe(42);
            expect(test.timeout).toBe(22);
            expect(test.notes).toBe('narf');
            expect(test.initial).toBe(12);
            expect(test.total).toBe(12012012);
            expect(test.status).toBe(Test.TYPE.PENDING);
            expect(test.test_id).toBe('rofl');
            expect(test.test_type).toBe(Test.TYPE.CLIENTS_PER_TEST);
            expect(test.callback).toBe('callback');
            expect(test.callback_email).toBe('callback_email');
            expect(test.scheduled_at).toBeInstanceOf(Date);
            expect(test.scheduled_at.toJSON()).toBe('2020-11-24T06:30:00.000Z');
            expect(test.domain).toBe('domain');
            expect(test.urls).toBeInstanceOf(Array);
            expect(test.urls).toHaveLength(2);
            expect(test.urls[0]).toBeInstanceOf(Url);
            expect(test.urls[1]).toBe(url);
        });

        test('with date object', () => {
            const url  = new Url({url: 'url2'});
            const date = new Date('2020-11-24T06:30:00.000Z');
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
                scheduled_at:   date,
                domain:         'domain',
                urls:           [
                    {url: 'url1'},
                    url,
                ]
            };

            const client = new Client('xxx');
            const test   = new Test(client, data);

            expect(test.client).toBe(client);
            expect(test.duration).toBe(42);
            expect(test.timeout).toBe(22);
            expect(test.notes).toBe('narf');
            expect(test.initial).toBe(12);
            expect(test.total).toBe(12012012);
            expect(test.status).toBe(Test.TYPE.PENDING);
            expect(test.test_id).toBe('rofl');
            expect(test.test_type).toBe(Test.TYPE.CLIENTS_PER_TEST);
            expect(test.callback).toBe('callback');
            expect(test.callback_email).toBe('callback_email');
            expect(test.scheduled_at).toBe(date);
            expect(test.domain).toBe('domain');
            expect(test.urls).toBeInstanceOf(Array);
            expect(test.urls).toHaveLength(2);
            expect(test.urls[0]).toBeInstanceOf(Url);
            expect(test.urls[1]).toBe(url);
        });
    });

    describe('.run()', () => {
        test('status not running', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue({status: Test.STATUS.RUNNING});

            const test = new Test(client, {
                status:  Test.STATUS.PENDING,
                test_id: 'narf'
            });

            expect(await test.run()).toBe(true);
            expect(requestSpy).toHaveBeenCalledWith('tests/narf/run', Client.METHOD.PUT);
        });

        test('status running', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request');

            const test = new Test(client, {
                status:  Test.STATUS.RUNNING,
                test_id: 'narf'
            });

            expect(await test.run()).toBe(true);
            expect(requestSpy).not.toHaveBeenCalled();
        });
    });

    describe('.stop()', () => {
        test('status not running', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request');

            const test = new Test(client, {
                status:  Test.STATUS.PENDING,
                test_id: 'narf'
            });

            expect(await test.stop()).toBe(true);
            expect(requestSpy).not.toHaveBeenCalled();
        });

        test('status running', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue({status: Test.STATUS.PENDING});

            const test = new Test(client, {
                status:  Test.STATUS.RUNNING,
                test_id: 'narf'
            });

            expect(await test.stop()).toBe(true);
            expect(requestSpy).toHaveBeenCalledWith('tests/narf/stop', Client.METHOD.PUT);
        });
    });

    test('.toJSON()', () => {
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
            ]
        };

        const client = new Client('xxx');
        const test   = new Test(client, data);

        expect(test.toJSON()).toEqual({
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
                {url:             'url1',
                    request_type: Url.TYPE.GET
                },
            ]
        });
    });
});
