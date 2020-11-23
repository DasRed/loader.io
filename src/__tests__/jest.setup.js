beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => void 0);
    jest.spyOn(console, 'debug').mockImplementation(() => void 0);
    jest.spyOn(console, 'info').mockImplementation(() => void 0);
    jest.spyOn(console, 'warn').mockImplementation(() => void 0);
});

afterEach(() => jest.restoreAllMocks());

jest.mock('node-fetch', () => {
    return function fetch(...args) {
        fetch.args = args;

        if (fetch.resolveValue && fetch.rejectValue === undefined) {
            return Promise.resolve(fetch.resolveValue);
        }
        else if (fetch.resolveValue === undefined && fetch.rejectValue) {
            return Promise.reject(fetch.rejectValue);
        }
        else {
            throw new Error('fetch must have a resolveValue or rejectValue');
        }
    };
});

afterEach(() => {
    const fetch        = jest.requireMock('node-fetch');
    fetch.args         = undefined;
    fetch.resolveValue = undefined;
    fetch.rejectValue  = undefined;
});
