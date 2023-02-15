// @babel-plugin-perf-ignore

const { arrayFilterMapHelper } = require('../../dist/helpers/arrayFilterMapHelper');
const { arrayFilterMapHelperWithMapThis } = require('../../dist/helpers/arrayFilterMapHelperWithMapThis');
const { arrayFilterMapHelperWithFilterThis } = require('../../dist/helpers/arrayFilterMapHelperWithFilterThis');
const {
    arrayFilterMapHelperWithFilterAndMapThis,
} = require('../../dist/helpers/arrayFilterMapHelperWithFilterAndMapThis');

describe('filter.map', () => {
    const arr = [1, 2, 3];

    test('arr.filter.map', () => {
        const r1 = arr.filter((x) => x > 0.5).map((x, i) => x + i);

        const r2 = arrayFilterMapHelper(
            arr,
            (x) => x > 0.5,
            (x, i) => x + i,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map с одним найденным элементом', () => {
        const r1 = arr.filter((x) => x > 2).map((x, i) => x + i);

        const r2 = arrayFilterMapHelper(
            arr,
            (x) => x > 2,
            (x, i) => x + i,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map - ничего не найдено', () => {
        const r1 = arr.filter((x) => x > 5).map((x, i) => x + i);

        const r2 = arrayFilterMapHelper(
            arr,
            (x) => x > 5,
            (x, i) => x + i,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map with map this', () => {
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
            }, obj);

        const r2 = arrayFilterMapHelperWithMapThis(
            arr,
            function (x) {
                return x > 0.5;
            },
            function (x, i) {
                return x + this.i;
            },
            obj,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map with map and filter this', () => {
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
            }, obj);

        const r2 = arrayFilterMapHelperWithFilterAndMapThis(
            arr,
            function (x) {
                return x > this.j;
            },
            obj,
            function (x, i) {
                return x + this.i;
            },
            obj,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map with filter this', () => {
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
            });

        const r2 = arrayFilterMapHelperWithFilterThis(
            arr,
            function (x) {
                return x > this.j;
            },
            obj,
            function (x, i) {
                return x + 1;
            },
        );

        expect(r1).toEqual(r2);
    });
});
