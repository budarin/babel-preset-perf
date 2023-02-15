// @babel-plugin-perf-ignore

const { arraySliceMapJoinHelper } = require('../../dist/helpers/arraySliceMapJoinHelper');
const { arraySliceMapJoinHelperWithMapThis } = require('../../dist/helpers/arraySliceMapJoinHelperWithMapThis');

describe('slice.map.join', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const obj = { i: 1 };

    test('slice.map.join', () => {
        const r1 = arraySliceMapJoinHelper(arr, undefined, undefined, (x) => x + 1, '-');

        const r2 = arr
            .slice()
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('slice(1).map.join', () => {
        const r1 = arraySliceMapJoinHelper(arr, 1, undefined, (x) => x + 1, '-');

        const r2 = arr
            .slice(1)
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('slice(1,3).map.join', () => {
        const r1 = arraySliceMapJoinHelper(arr, 1, 3, (x) => x + 1, '-');

        const r2 = arr
            .slice(1, 3)
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('arr.slice(-3).map.join', () => {
        const r1 = arraySliceMapJoinHelper(arr, -3, undefined, (x) => x + 1, '-');

        const r2 = arr
            .slice(-3)
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('arr.slice(1,-1).map.join', () => {
        const r1 = arraySliceMapJoinHelper(arr, 1, -1, (x) => x + 1, '-');

        const r2 = arr
            .slice(1, -1)
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('arr.slice(-3, -1).map.join', () => {
        const r1 = arraySliceMapJoinHelper(arr, -3, -1, (x) => x + 1, '-');

        const r2 = arr
            .slice(-3, -1)
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('slice.map.join with map this', () => {
        const r1 = arraySliceMapJoinHelperWithMapThis(
            arr,
            undefined,
            undefined,
            function (x) {
                return x + this.i;
            },
            obj,
            '-',
        );

        const r2 = arr
            .slice()
            .map(function (x) {
                return x + this.i;
            }, obj)
            .join('-');

        expect(r1).toEqual(r2);
    });
});
