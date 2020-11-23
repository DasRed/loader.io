import Exception from '../Exception.js';

describe('Exception', () => {
    describe('.constructor()', () => {
        test('with values', () => {
            const data = {nuff: 'rofl'};
            const exception = new Exception('narf', data);

            expect(exception.message).toBe('narf');
            expect(exception.data).toBe(data);
        });

        test('with defaults', () => {
            const exception = new Exception('narf');

            expect(exception.message).toBe('narf');
            expect(exception.data).toBeUndefined();
        });
    });
});
