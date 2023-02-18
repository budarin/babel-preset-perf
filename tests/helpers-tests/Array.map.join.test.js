// @babel-plugin-perf-ignore

const { arrayMapJoinHelper } = require('../../dist/helpers/arrayMapJoinHelper');
const { arrayMapJoinHelperWithMapThis } = require('../../dist/helpers/arrayMapJoinHelperWithMapThis');

describe('map.join', () => {
    const arr = [1, 2, 3];

    test('arr.map.join - empty array', () => {
        expect([].map((x) => x + 1).join(' ')).toEqual(arrayMapJoinHelper([], (x) => x + 1, ' '));
    });

    test('arr.map.join', () => {
        expect(arr.map((x) => x + 1).join(' ')).toEqual(arrayMapJoinHelper(arr, (x) => x + 1, ' '));
    });

    test('arr.map.join with map this', () => {
        const otherData = { i: 5 };

        const r1 = arrayMapJoinHelperWithMapThis(
            arr,
            function (x) {
                return x + this.i;
            },
            otherData,
        );

        const r2 = arr
            .map(function (x) {
                return x + this.i;
            }, otherData)
            .join();

        expect(r1).toEqual(r2);
    });

    test('arr.map with well known predicate', () => {
        expect(arr.map(Number).join()).toEqual(arrayMapJoinHelper(arr, Number));
    });
});
