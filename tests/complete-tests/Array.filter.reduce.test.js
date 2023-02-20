describe('filter.reduce', () => {
    const arr = [1, 2, 3];

    test('arr.filter.reduce', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter((x) => x > 1).reduce((acc, x) => acc + x, 0);
        const r2 = arr.filter((x) => x > 1).reduce((acc, x) => acc + x, 0);

        expect(r1).toEqual(r2);
    });

    test('arr.filter.reduce with filter this', () => {
        const obj = { i: 1 };

        // babel-preset-perf-disable-next-line
        const r1 = arr
            .filter(function (x) {
                return x > this.i;
            }, obj)
            .reduce((acc, x) => {
                return acc + x;
            }, 0);

        const r2 = arr
            .filter(function (x) {
                return x > this.i;
            }, obj)
            .reduce((acc, x) => {
                return acc + x;
            }, 0);

        expect(r1).toEqual(r2);
    });
});
