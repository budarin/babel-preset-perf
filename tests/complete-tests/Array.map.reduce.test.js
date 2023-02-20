describe('map.reduce', () => {
    const arr = [1, 2, 3];

    test('arr.map.reduce', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.map((x) => x + 1).reduce((acc, x) => acc + x, 0);
        const r2 = arr.map((x) => x + 1).reduce((acc, x) => acc + x, 0);

        expect(r1).toEqual(r2);
    });

    test('arr.map.reduce with map this', () => {
        const obj = { i: 1 };

        // babel-preset-perf-disable-next-line
        const r1 = arr
            .map(function (x) {
                return x + this.i;
            }, obj)
            .reduce((acc, x) => {
                return acc + x;
            }, 0);

        const r2 = arr
            .map(function (x) {
                return x + this.i;
            }, obj)
            .reduce((acc, x) => {
                return acc + x;
            }, 0);

        expect(r1).toEqual(r2);
    });
});
