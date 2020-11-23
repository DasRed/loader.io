import Result from '../Result.js';

describe('Result', () => {
    test('.constructor() with date string', () => {
        const result = new Result({
            result_id:          'nuff',
            started_at:         '2020-11-24T06:30:00.000Z',
            status:             'narf',
            public_results_url: 'rofl',
            success:            100,
            error:              42,
            timeout_error:      22,
            network_error:      12,
            data_sent:          16012012,
            data_received:      19012012,
            avg_response_time:  24,
            avg_error_rate:     99
        });

        expect(result.result_id).toBe('nuff');
        expect(result.started_at).toBeInstanceOf(Date);
        expect(result.started_at.toJSON()).toBe('2020-11-24T06:30:00.000Z');
        expect(result.status).toBe('narf');
        expect(result.public_results_url).toBe('rofl');
        expect(result.success).toBe(100);
        expect(result.error).toBe(42);
        expect(result.timeout_error).toBe(22);
        expect(result.network_error).toBe(12);
        expect(result.data_sent).toBe(16012012);
        expect(result.data_received).toBe(19012012);
        expect(result.avg_response_time).toBe(24);
        expect(result.avg_error_rate).toBe(99);
    });

    test('.constructor() with date object', () => {
        const date = new Date('2020-11-24T06:30:00.000Z');
        const result = new Result({
            result_id:          'nuff',
            started_at:         date,
            status:             'narf',
            public_results_url: 'rofl',
            success:            100,
            error:              42,
            timeout_error:      22,
            network_error:      12,
            data_sent:          16012012,
            data_received:      19012012,
            avg_response_time:  24,
            avg_error_rate:     99
        });

        expect(result.result_id).toBe('nuff');
        expect(result.started_at).toBe(date);
        expect(result.status).toBe('narf');
        expect(result.public_results_url).toBe('rofl');
        expect(result.success).toBe(100);
        expect(result.error).toBe(42);
        expect(result.timeout_error).toBe(22);
        expect(result.network_error).toBe(12);
        expect(result.data_sent).toBe(16012012);
        expect(result.data_received).toBe(19012012);
        expect(result.avg_response_time).toBe(24);
        expect(result.avg_error_rate).toBe(99);
    });
});
