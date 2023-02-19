const { arrayFilterForEachHelper } = require('../../dist/helpers/arrayFilterForEachHelper');
const { arrayFilterForEachHelperWithFilterThis } = require('../../dist/helpers/arrayFilterForEachHelperWithFilterThis');
const {
    arrayFilterForEachHelperWithForEachThis,
} = require('../../dist/helpers/arrayFilterForEachHelperWithForEachThis');
const {
    arrayFilterForEachHelperWithFilterAndForEachThis,
} = require('../../dist/helpers/arrayFilterForEachHelperWithFilterAndForEachThis');

describe('filter.forEach', () => {
    const arr = [1, 2, 3];
    const obj = { i: 1 };

    test('arr.filter.foreach - empty array', () => {
        let r1 = 0,
            r2 = 0;

        []
            .filter((x) => x > 1)
            .forEach((x) => {
                r1 = r1 + x;
            });

        arrayFilterForEachHelper(
            [],
            (x) => x > 1,
            (x) => {
                r2 = r2 + x;
            },
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.foreach', () => {
        let r1 = 0,
            r2 = 0;

        arr.filter((x) => x > 1).forEach((x) => {
            r1 = r1 + x;
        });

        arrayFilterForEachHelper(
            arr,
            (x) => x > 1,
            (x) => {
                r2 = r2 + x;
            },
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.foreach with forEach this', () => {
        let r1 = 0,
            r2 = 0;

        arr.filter(function (x) {
            return x > 1;
        }).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arrayFilterForEachHelperWithForEachThis(
            arr,
            function (x) {
                return x > 1;
            },
            function (x) {
                r2 = r2 + x + this.i;
            },
            obj,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.foreach with filter this', () => {
        let r1 = 0,
            r2 = 0;

        arr.filter(function (x) {
            return x > this.i;
        }, obj).forEach(function (x) {
            r1 = r1 + x;
        });

        arrayFilterForEachHelperWithFilterThis(
            arr,
            function (x) {
                return x > this.i;
            },
            obj,
            function (x) {
                r2 = r2 + x;
            },
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.foreach with filter and forEach this', () => {
        let r1 = 0,
            r2 = 0;

        arr.filter(function (x) {
            return x > this.i;
        }, obj).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arrayFilterForEachHelperWithFilterAndForEachThis(
            arr,
            function (x) {
                return x > this.i;
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
