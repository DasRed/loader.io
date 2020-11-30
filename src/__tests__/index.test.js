import iLoaderIO, * as iClasses from '../index.js';
import Applications from '../Application/Applications.js';
import Tests from '../Tests/Tests.js';
import Results from '../Tests/Results.js';
import Servers from '../Servers.js';
import LoaderIO from '../LoaderIO.js';

describe('index.js', () => {
    test('exports', () => {
        expect(iLoaderIO).toBe(LoaderIO);
        expect(iClasses.Applications).toBe(Applications);
        expect(iClasses.Tests).toBe(Tests);
        expect(iClasses.Results).toBe(Results);
        expect(iClasses.Servers).toBe(Servers);
    });
})
