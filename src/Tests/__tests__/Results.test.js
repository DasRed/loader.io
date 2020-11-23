import Results from '../Results.js';
import Client from '../../Client.js';
import Result from '../Result.js';
import Exception from '../../Exception.js';

describe('Results', () => {
    test('.constructor()', () => {
        const client  = new Client('xxx');
        const results = new Results(client, 'nuff');

        expect(results.client).toBe(client);
        expect(results.testId).toBe('nuff');
    });

    describe('.get()', () => {
        test('success', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue({
                result_id:          'roflcopter',
                started_at:         '2020-11-24T06:30:00.000Z',
                status:             'narf',
                public_results_url: 'rofl',
                success:            42,
                error:              22,
                timeout_error:      12,
                network_error:      12012012,
                data_sent:          19012014,
                data_received:      1,
                avg_response_time:  2,
                avg_error_rate:     3
            });

            const result = await (new Results(client, 'nuff')).get('roflcopter');

            expect(result).toBeInstanceOf(Result);
            expect(result.result_id).toBe('roflcopter');
            expect(result.started_at).toBeInstanceOf(Date);
            expect(result.started_at.toJSON()).toBe('2020-11-24T06:30:00.000Z');
            expect(result.status).toBe('narf');
            expect(result.public_results_url).toBe('rofl');
            expect(result.success).toBe(42);
            expect(result.error).toBe(22);
            expect(result.timeout_error).toBe(12);
            expect(result.network_error).toBe(12012012);
            expect(result.data_sent).toBe(19012014);
            expect(result.data_received).toBe(1);
            expect(result.avg_response_time).toBe(2);
            expect(result.avg_error_rate).toBe(3);
            expect(requestSpy).toHaveBeenCalledWith('tests/nuff/results/roflcopter', Client.METHOD.GET);
        });

        test('failed', async () => {
            const client = new Client('xxx');
            jest.spyOn(client, 'request').mockResolvedValue(undefined);

            try {
                await (new Results(client, 'nuff')).get('roflcopter');
                fail('This should not be reachable');
            }
            catch (error) {
                expect(error).toBeInstanceOf(Exception);
                expect(error.message).toBe('Loader.io result roflcopter can not be found.');
            }
        });
    });

    describe('.list()', () => {
        test('success', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue([{
                result_id:          'roflcopter',
                started_at:         '2020-11-24T06:30:00.000Z',
                status:             'narf',
                public_results_url: 'rofl',
                success:            42,
                error:              22,
                timeout_error:      12,
                network_error:      12012012,
                data_sent:          19012014,
                data_received:      1,
                avg_response_time:  2,
                avg_error_rate:     3
            }]);

            const results = await (new Results(client, 'nuff')).list();

            expect(results).toBeInstanceOf(Array);
            expect(results).toHaveLength(1);
            expect(results[0]).toBeInstanceOf(Result)
            expect(results[0].result_id).toBe('roflcopter');
            expect(results[0].started_at).toBeInstanceOf(Date);
            expect(results[0].started_at.toJSON()).toBe('2020-11-24T06:30:00.000Z');
            expect(results[0].status).toBe('narf');
            expect(results[0].public_results_url).toBe('rofl');
            expect(results[0].success).toBe(42);
            expect(results[0].error).toBe(22);
            expect(results[0].timeout_error).toBe(12);
            expect(results[0].network_error).toBe(12012012);
            expect(results[0].data_sent).toBe(19012014);
            expect(results[0].data_received).toBe(1);
            expect(results[0].avg_response_time).toBe(2);
            expect(results[0].avg_error_rate).toBe(3);
            expect(requestSpy).toHaveBeenCalledWith('tests/nuff/results', Client.METHOD.GET);
        });

        test('failed', async () => {
            const client     = new Client('xxx');
            const requestSpy = jest.spyOn(client, 'request').mockResolvedValue(undefined);

            const results = await (new Results(client, 'nuff')).list();

            expect(results).toBeInstanceOf(Array);
            expect(results).toHaveLength(0);
            expect(requestSpy).toHaveBeenCalledWith('tests/nuff/results', Client.METHOD.GET);
        });
    });
});
