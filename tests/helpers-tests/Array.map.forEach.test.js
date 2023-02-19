// @babel-plugin-perf-ignore

const { arrayMapForEachHelper } = require('../../dist/helpers/arrayMapForEachHelper');
const { arrayMapForEachHelperWithMapThis } = require('../../dist/helpers/arrayMapForEachHelperWithMapThis');
const { arrayMapForEachHelperWithForEachThis } = require('../../dist/helpers/arrayMapForEachHelperWithForEachThis');
const {
    arrayMapForEachHelperWithMapAndForEachThis,
} = require('../../dist/helpers/arrayMapForEachHelperWithMapAndForEachThis');

describe('map.forEach', () => {
    const arr = [1, 2, 3];
    const obj = { i: 1 };

    test('arr.map.foreach - empty array', () => {
        let r1 = 0,
            r2 = 0;

        []
            .map((x) => x)
            .forEach((x) => {
                r1 = r1 + x;
            });

        arrayMapForEachHelper(
            [],
            (x) => x,
            (x) => {
                r2 = r2 + x;
            },
        );

        expect(r1).toEqual(r2);
    });

    test('arr.map.foreach', () => {
        let r1 = 0,
            r2 = 0;

        arr.map((x) => x).forEach((x) => {
            r1 = r1 + x;
        });

        arrayMapForEachHelper(
            arr,
            (x) => x,
            (x) => {
                r2 = r2 + x;
            },
        );

        expect(r1).toEqual(r2);
    });

    test('arr.map.foreach with forEach this', () => {
        let r1 = 0,
            r2 = 0;

        arr.map(function (x) {
            return x;
        }).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arrayMapForEachHelperWithForEachThis(
            arr,
            function (x) {
                return x;
            },
            function (x) {
                r2 = r2 + x + this.i;
            },
            obj,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.map.foreach with map this', () => {
        let r1 = 0,
            r2 = 0;

        arr.map(function (x) {
            return x + this.i;
        }, obj).forEach(function (x) {
            r1 = r1 + x;
        });

        arrayMapForEachHelperWithMapThis(
            arr,
            function (x) {
                return x + this.i;
            },
            obj,
            function (x) {
                r2 = r2 + x;
            },
        );

        expect(r1).toEqual(r2);
    });

    test('arr.map.foreach with map and forEach this', () => {
        let r1 = 0,
            r2 = 0;

        arr.map(function (x) {
            return x + this.i;
        }, obj).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arrayMapForEachHelperWithMapAndForEachThis(
            arr,
            function (x) {
                return x + this.i;
            },
            obj,
            function (x) {
                r2 = r2 + x + this.i;
            },
            obj,
        );

        expect(r1).toEqual(r2);
    });
});
