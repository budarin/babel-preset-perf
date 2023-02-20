// @babel-plugin-perf-ignore

describe('array.filter.length', () => {
    const arr = [1, 2, 3];

    test('arr.filter.length', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter((x) => x > 0.5).length;
        const r2 = arr.filter((x) => x > 0.5).length;

        expect(r1).toEqual(r2);
    });

    test('arr.filter.length with filter this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        // babel-preset-perf-disable-next-line
        const r1 = arr.filter(function (x) {
            return x > this.j;
        }, obj).length;

        const r2 = arr.filter(function (x) {
            return x > this.j;
        }, obj).length;

        expect(r1).toEqual(r2);
    });
});
