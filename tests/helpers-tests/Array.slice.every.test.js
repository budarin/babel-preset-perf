// @babel-plugin-perf-ignore

const { arraySliceEveryHelper } = require('../../dist/helpers/arraySliceEveryHelper');
const { arraySliceEveryHelperWithEveryThis } = require('../../dist/helpers/arraySliceEveryHelperWithEveryThis');

describe('slice.every', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const obj = { i: 1 };

    test('slice.every - empty array', () => {
        const r1 = arraySliceEveryHelper([], undefined, undefined, (x) => x > 0);
        const r2 = [].slice().every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice.every', () => {
        const r1 = arraySliceEveryHelper(arr, undefined, undefined, (x) => x > 0);
        const r2 = arr.slice().every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(1).every', () => {
        const r1 = arraySliceEveryHelper(arr, 1, undefined, (x) => x > 0);
        const r2 = arr.slice(1).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(1,3).every', () => {
        const r1 = arraySliceEveryHelper(arr, 1, 3, (x) => x > 0);
        const r2 = arr.slice(1, 3).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(-3).every', () => {
        const r1 = arraySliceEveryHelper(arr, -3, undefined, (x) => x > 0);
        const r2 = arr.slice(-3).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(0,-1).every', () => {
        const r1 = arraySliceEveryHelper(arr, 0, -1, (x) => x > 0);
        const r2 = arr.slice(0, -1).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(-3,-1).every', () => {
        const r1 = arraySliceEveryHelper(arr, -3, -1, (x) => x > 0);
        const r2 = arr.slice(-3, -1).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice.every with every this', () => {
        const r1 = arraySliceEveryHelperWithEveryThis(
            arr,
            undefined,
            undefined,
            function (x) {
                return x > this.i;
            },
            obj,
        );

        const r2 = arr.slice().every(function (x) {
            return x > this.i;
        }, obj);

        expect(r1).toEqual(r2);
    });
});
