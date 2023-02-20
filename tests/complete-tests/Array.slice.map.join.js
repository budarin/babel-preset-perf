describe('slice.map.join', () => {
    const arr = [1, 2, 3];

    test('arr.slice.map.join', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr
            .slice()
            .map((x) => x + 1)
            .join('-');

        const r2 = arr
            .slice()
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('arr.slice(1).map.join', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr
            .slice(1)
            .map((x) => x + 1)
            .join('-');

        const r2 = arr
            .slice(1)
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('arr.slice(-3).map.join', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr
            .slice(-3)
            .map((x) => x + 1)
            .join('-');

        const r2 = arr
            .slice(-3)
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('arr.slice(1,-1).map.join', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr
            .slice(1, -1)
            .map((x) => x + 1)
            .join('-');

        const r2 = arr
            .slice(1, -1)
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('arr.slice(-3, -1).map.join', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr
            .slice(-3, -1)
            .map((x) => x + 1)
            .join('-');

        const r2 = arr
            .slice(-3, -1)
            .map((x) => x + 1)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('arr.slice.map.join with map this', () => {
        const otherData = { i: 5 };

        // babel-preset-perf-disable-next-line
        const r1 = arr
            .slice()
            .map(function (x) {
                x + this.i;
            }, obj)
            .join('-');

        const r2 = arr
            .slice()
            .map(function (x) {
                x + this.i;
            }, obj)
            .join('-');

        expect(r1).toEqual(r2);
    });
});
