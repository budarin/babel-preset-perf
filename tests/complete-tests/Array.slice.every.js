describe('slice.map.join', () => {
    const arr = [1, 2, 34, 5, 6];
    const obj = { I: 1 };

    test('slice.every', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.slice().every((x) => x > 0);
        const r2 = arr.slice().every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(1).every', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.slice(1).every((x) => x > 0);
        const r2 = arr.slice(1).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(1,3).every', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.slice(1, 3).every((x) => x > 0);
        const r2 = arr.slice(1, 3).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(-3).every', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.slice(-3).every((x) => x > 0);
        const r2 = arr.slice(-3).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(0,-1).every', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.slice(0, -1).every((x) => x > 0);
        const r2 = arr.slice(0, -1).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice(-3,-1).every', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.slice(-3, -1).every((x) => x > 0);
        const r2 = arr.slice(-3, -1).every((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('slice.every with every this', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.slice().every(function (x) {
            return x > this.i;
        }, obj);

        const r2 = arr.slice().every(function (x) {
            return x > this.i;
        }, obj);

        expect(r1).toEqual(r2);
    });
});
