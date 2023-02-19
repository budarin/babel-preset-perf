// @babel-plugin-perf-ignore

const { arrayMapFilterHelper } = require('../../dist/helpers/arrayMapFilterHelper');
const { arrayMapFilterHelperWithMapThis } = require('../../dist/helpers/arrayMapFilterHelperWithMapThis');
const { arrayMapFilterHelperWithFilterThis } = require('../../dist/helpers/arrayMapFilterHelperWithFilterThis');
const {
    arrayMapFilterHelperWithMapAndFilterThis,
} = require('../../dist/helpers/arrayMapFilterHelperWithMapAndFilterThis');

describe('map.filter', () => {
    const arr = [1, 2, 3];
    const obj = {
        i: 1,
        j: 0,
    };

    test('arr.map.filter - empty array', () => {
        expect([].map((x) => x + 1).filter((x) => x > 0)).toEqual(
            arrayMapFilterHelper(
                [],
                (x) => x + 1,
                (x) => x > 0,
            ),
        );
    });

    test('arr.map.filter', () => {
        expect(arr.map((x) => x + 1).filter((x) => x > 0)).toEqual(
            arrayMapFilterHelper(
                arr,
                (x) => x + 1,
                (x) => x > 0,
            ),
        );
    });

    test('arr.map.filter with map and filter this', () => {
        expect(
            arr
                .map(function (x) {
                    return x + this.i;
                }, obj)
                .filter(function (x) {
                    return x > this.j;
                }, obj),
        ).toEqual(
            arrayMapFilterHelperWithMapAndFilterThis(
                arr,
                function (x) {
                    return x + this.i;
                },
                obj,
                function (x) {
                    return x > this.j;
                },
                obj,
            ),
        );
    });

    test('arr.map.filter with map this', () => {
        expect(
            arr
                .map(function (x) {
                    return x + this.i;
                }, obj)
                .filter(function (x) {
                    return x > 0;
                }),
        ).toEqual(
            arrayMapFilterHelperWithMapThis(
                arr,
                function (x) {
                    return x + this.i;
                },
                obj,
                function (x) {
                    return x > 0;
                },
            ),
        );
    });

    test('arr.map.filter with filter this', () => {
        expect(
            arr
                .map(function (x) {
                    return x + 1;
                })
                .filter(function (x) {
                    return x > this.j;
                }, obj),
        ).toEqual(
            arrayMapFilterHelperWithFilterThis(
                arr,
                function (x) {
                    return x + 1;
                },
                function (x) {
                    return x > this.j;
                },
                obj,
            ),
        );
    });
});
