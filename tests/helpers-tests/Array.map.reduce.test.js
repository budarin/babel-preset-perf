// @babel-plugin-perf-ignore

const { arrayMapReduceHelper } = require('../../dist/helpers/arrayMapReduceHelper');
const { arrayMapReduceHelperWithMapThis } = require('../../dist/helpers/arrayMapReduceHelperWithMapThis');

describe('map.reduce - empty array', () => {
    const arr = [1, 2, 3];

    test('arr.map.reduce', () => {
        const r1 = [].map((x) => x + 1).reduce((acc, x) => acc + x, 0);

        const r2 = arrayMapReduceHelper(
            [],
            (x) => x + 1,
            (acc, x) => acc + x,
            0,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.map.reduce', () => {
        const r1 = arr.map((x) => x + 1).reduce((acc, x) => acc + x, 0);

        const r2 = arrayMapReduceHelper(
            arr,
            (x) => x + 1,
            (acc, x) => acc + x,
            0,
        );

        expect(r1).toEqual(r2);
    });

    test('arr.map.reduce with map this', () => {
        const obj = { i: 1 };

        const r1 = arr
            .map(function (x) {
                return x + this.i;
            }, obj)
            .reduce((acc, x) => acc + x, 0);

        const r2 = arrayMapReduceHelperWithMapThis(
            arr,
            function (x) {
                return x + this.i;
            },
            obj,
            (acc, x) => acc + x,
            0,
        );

        expect(r1).toEqual(r2);
    });
});
