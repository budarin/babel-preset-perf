// @babel-plugin-perf-ignore

const { arrayFilterMapJoinHelper } = require('../../dist/helpers/arrayFilterMapJoinHelper');
const { arrayFilterMapJoinHelperWithMapThis } = require('../../dist/helpers/arrayFilterMapJoinHelperWithMapThis');
const { arrayFilterMapJoinHelperWithFilterThis } = require('../../dist/helpers/arrayFilterMapJoinHelperWithFilterThis');
const {
    arrayFilterMapJoinHelperWithFilterAndMapThis,
} = require('../../dist/helpers/arrayFilterMapJoinHelperWithFilterAndMapThis');

describe('filter.map.join', () => {
    const arr = [1, 2, 3];

    test('arr.filter.map.join - empty array', () => {
        const r1 = []
            .filter((x) => x > 0.5)
            .map((x, i) => x + i)
            .join(' - ');

        const r2 = arrayFilterMapJoinHelper(
            [],
            (x) => x > 0.5,
            (x, i) => x + i,
            ' - ',
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map.join', () => {
        const r1 = arr
            .filter((x) => x > 0.5)
            .map((x, i) => x + i)
            .join(' - ');

        const r2 = arrayFilterMapJoinHelper(
            arr,
            (x) => x > 0.5,
            (x, i) => x + i,
            ' - ',
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map.join с одним найденным элементом', () => {
        const r1 = arr
            .filter((x) => x > 2)
            .map((x, i) => x + i)
            .join();

        const r2 = arrayFilterMapJoinHelper(
            arr,
            (x) => x > 2,
            (x, i) => x + i,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map.join - ничего не найдено', () => {
        const r1 = arr
            .filter((x) => x > 5)
            .map((x, i) => x + i)
            .join();

        const r2 = arrayFilterMapJoinHelper(
            arr,
            (x) => x > 5,
            (x, i) => x + i,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map.join with map this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        const r1 = arr
            .filter(function (x) {
                return x > 0.5;
            })
            .map(function (x, i) {
                return x + this.i;
            }, obj)
            .join(' - ');

        const r2 = arrayFilterMapJoinHelperWithMapThis(
            arr,
            function (x) {
                return x > 0.5;
            },
            function (x, i) {
                return x + this.i;
            },
            obj,
            ' - ',
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map.join with map and filter this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        const r1 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + this.i;
            }, obj)
            .join(' - ');

        const r2 = arrayFilterMapJoinHelperWithFilterAndMapThis(
            arr,
            function (x) {
                return x > this.j;
            },
            obj,
            function (x, i) {
                return x + this.i;
            },
            obj,
            ' - ',
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map.join with filter this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        const r1 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + 1;
            })
            .join(' - ');

        const r2 = arrayFilterMapJoinHelperWithFilterThis(
            arr,
            function (x) {
                return x > this.j;
            },
            obj,
            function (x, i) {
                return x + 1;
            },
            ' - ',
        );

        expect(r1).toEqual(r2);
    });
});
