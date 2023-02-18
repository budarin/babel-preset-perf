// @babel-plugin-perf-ignore

const { arrayMapFilterJoinHelper } = require('../../dist/helpers/arrayMapFilterJoinHelper');
const { arrayMapFilterJoinHelperWithMapThis } = require('../../dist/helpers/arrayMapFilterJoinHelperWithMapThis');
const { arrayMapFilterJoinHelperWithFilterThis } = require('../../dist/helpers/arrayMapFilterJoinHelperWithFilterThis');
const {
    arrayMapFilterJoinHelperWithMapAndFilterThis,
} = require('../../dist/helpers/arrayMapFilterJoinHelperWithMapAndFilterThis');

describe('map.filter.join', () => {
    const arr = [1, 2, 3];
    const obj = {
        i: 1,
        j: 0,
    };

    test('arr.map.filter.join - empty array', () => {
        expect(
            []
                .map((x) => x + 1)
                .filter((x) => x > 0)
                .join(' '),
        ).toEqual(
            arrayMapFilterJoinHelper(
                [],
                (x) => x + 1,
                (x) => x > 0,
                ' ',
            ),
        );
    });

    test('arr.map.filter.join', () => {
        expect(
            arr
                .map((x) => x + 1)
                .filter((x) => x > 0)
                .join(' '),
        ).toEqual(
            arrayMapFilterJoinHelper(
                arr,
                (x) => x + 1,
                (x) => x > 0,
                ' ',
            ),
        );
    });

    test('arr.map.filter.join with filter this argument', () => {
        function f1() {
            return arr
                .map((x) => x + 1)
                .filter(function (x) {
                    return x > this.j;
                }, obj)
                .join();
        }

        function f2() {
            return arrayMapFilterJoinHelperWithFilterThis(
                arr,
                function (x) {
                    return x + 1;
                },
                function (x) {
                    return x > this.j;
                },
                obj,
            );
        }

        expect(f1()).toEqual(f2());
    });

    test('arr.map.filter.join with map this argument', () => {
        function f1() {
            return arr
                .map(function (x) {
                    return x + this.i;
                }, obj)
                .filter(function (x) {
                    return x > 0;
                })
                .join();
        }

        function f2() {
            return arrayMapFilterJoinHelperWithMapThis(
                arr,
                function (x) {
                    return x + this.i;
                },
                obj,
                function (x) {
                    return x > 0;
                },
            );
        }

        expect(f1()).toEqual(f2());
    });

    test('arr.map.filter.join with map and filter this argument', () => {
        function f1() {
            return arr
                .map(function (x) {
                    return x + this.i;
                }, obj)
                .filter(function (x) {
                    return x > this.j;
                }, obj)
                .join();
        }

        function f2() {
            return arrayMapFilterJoinHelperWithMapAndFilterThis(
                arr,
                function (x) {
                    return x + this.i;
                },
                obj,
                function (x) {
                    return x > this.j;
                },
                obj,
            );
        }

        expect(f1()).toEqual(f2());
    });
});
