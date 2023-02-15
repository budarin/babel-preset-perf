// @babel-plugin-perf-ignore

const { stringSliceHelper } = require('../../dist/helpers/stringSliceHelper');

describe('String.slice', () => {
    const str = 'string';

    test('with 2 params', () => {
        const r1 = stringSliceHelper(str, 1, 4);
        const r2 = str.slice(1, 4);

        expect(r1).toEqual(r2);
    });

    test('with start', () => {
        const r1 = stringSliceHelper(str, 1);
        const r2 = str.slice(1);

        expect(r1).toEqual(r2);
    });

    test('without params', () => {
        const r1 = stringSliceHelper(str);
        const r2 = str.slice();

        expect(r1).toEqual(r2);
    });

    test('with negative second param', () => {
        const r1 = stringSliceHelper(str, 1, -2);
        const r2 = str.slice(1, -2);

        expect(r1).toEqual(r2);
    });

    test('array slice', () => {
        const r1 = stringSliceHelper([1, 2, 3, 4, 5], 1, 4);
        const r2 = [1, 2, 3, 4, 5].slice(1, 4);

        expect(r1).toEqual(r2);
    });
});
