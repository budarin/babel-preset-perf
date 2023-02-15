// @babel-plugin-perf-ignore

const { arrayFilterJoinHelper } = require('../../dist/helpers/arrayFilterJoinHelper');
const { arrayFilterJoinHelperWithFilterThis } = require('../../dist/helpers/arrayFilterJoinHelperWithFilterThis');

describe('filter.join', () => {
    const arr = [1, 2, 3];
    const obj = { i: 0 };

    test('arr.filter.join', () => {
        const r1 = arr.filter((x) => x > 0.5).join('=');
        const r2 = arrayFilterJoinHelper(arr, (x) => x > 0.5, '=');

        expect(r1).toEqual(r2);
    });

    test('arr.filter.join with well known predicate', () => {
        const r1 = arr.filter(Boolean).join('=');
        const r2 = arrayFilterJoinHelper(arr, Boolean, '=');

        expect(r1).toEqual(r2);
    });

    test('arr.filter.join с одним найденным элементом', () => {
        const r1 = arr.filter((x) => x > 2).join('=');
        const r2 = arrayFilterJoinHelper(arr, (x) => x > 2, '=');

        expect(r1).toEqual(r2);
    });

    test('arr.filter.join - ничего не найдено', () => {
        const r1 = arr.filter((x) => x > 5).join('=');
        const r2 = arrayFilterJoinHelper(arr, (x) => x > 5, '=');

        expect(r1).toEqual(r2);
    });

    test('arr.filter.join with fiter this', () => {
        const r1 = arr
            .filter(function (x) {
                return x > 0.5;
            }, this)
            .join('=');

        const r2 = arrayFilterJoinHelper(arr, (x) => x > 0.5, '=');

        expect(r1).toEqual(r2);
    });

    test('arr.filter.join with filter this', () => {
        const r1 = arr
            .filter(function (x) {
                return x > this.i;
            }, obj)
            .join('=');

        const r2 = arrayFilterJoinHelperWithFilterThis(
            arr,
            function (x) {
                return x > this.i;
            },
            obj,
            '=',
        );

        expect(r1).toEqual(r2);
    });
});
