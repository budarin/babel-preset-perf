// @babel-plugin-perf-ignore

const { arrayFilterLengthHelper } = require('../../dist/helpers/arrayFilterLengthHelper');
const { arrayFilterLengthHelperWithFilterThis } = require('../../dist/helpers/arrayFilterLengthHelperWithFilterThis');

describe('array.filter.length', () => {
    const arr = [1, 2, 3];
    const obj = {
        i: 1,
        j: 0.5,
    };

    test('arr.filter.length', () => {
        const r1 = arrayFilterLengthHelper(arr, (x) => x > 0.5);
        const r2 = arr.filter((x) => x > 0.5).length;

        expect(r1).toEqual(r2);
    });

    test('arr.filter.length with filter this', () => {
        const r1 = arrayFilterLengthHelperWithFilterThis(
            arr,
            function (x) {
                return x > this.j;
            },
            obj,
        );

        const r2 = arr.filter(function (x) {
            return x > this.j;
        }, obj).length;

        expect(r1).toEqual(r2);
    });
});
