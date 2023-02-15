// @babel-plugin-perf-ignore

const { arrayFilterReduceHelper } = require('../../dist/helpers/arrayFilterReduceHelper');
const { arrayFilterReduceHelperWithFilterThis } = require('../../dist/helpers/arrayFilterReduceHelperWithFilterThis');

describe('map.reduce', () => {
    const arr = [1, 2, 3];

    test('arr.filter.reduce', () => {
        const r1 = arr.filter((x) => x > 1).reduce((acc, x) => acc + x, 0);
        const r2 = arrayFilterReduceHelper(
            arr,
            (x) => x > 1,
            (acc, x) => acc + x,
            0,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.reduce with filter this', () => {
        const obj = { i: 1 };

        const r1 = arr
            .filter(function (x) {
                return x > this.i;
            }, obj)
            .reduce((acc, x) => acc + x, 0);
        const r2 = arrayFilterReduceHelperWithFilterThis(
            arr,
            function (x) {
                return x > this.i;
            },
            obj,
            (acc, x) => acc + x,
            0,
        );

        expect(r1).toEqual(r2);
    });
});
