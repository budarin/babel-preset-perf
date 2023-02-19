// @babel-plugin-perf-ignore

const { arrayMapHelper } = require('../../dist/helpers/arrayMapHelper');
const { arrayMapHelperWithMapThis } = require('../../dist/helpers/arrayMapHelperWithMapThis');

describe('map', () => {
    const arr = [1, 2, 3];

    test('arr.map - empty array', () => {
        expect([].map((x) => x + 1)).toEqual(arrayMapHelper([], (x) => x + 1));
    });

    test('arr.map', () => {
        expect(arr.map((x) => x + 1)).toEqual(arrayMapHelper(arr, (x) => x + 1));
    });

    test('arr.map with this', () => {
        const obj = { i: 1 };

        expect(
            arr.map(function (x) {
                return x + this.i;
            }, obj),
        ).toEqual(
            arrayMapHelperWithMapThis(
                arr,
                function (x) {
                    return x + this.i;
                },
                obj,
            ),
        );
    });

    test('arr.map with well known predicate', () => {
        expect(arr.map(Number)).toEqual(arrayMapHelper(arr, Number));
    });
});
