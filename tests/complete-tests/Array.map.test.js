describe('map', () => {
    const arr = [1, 2, 3];

    test('simple test', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.map((x) => x + 1);
        const r2 = arr.map((x) => x + 1);

        expect(r1).toEqual(r2);
    });

    test('test with well known predicate', () => {
        // babel-preset-perf-disable-next-line
        let r1 = arr.map(String);
        let r2 = arr.map(String);

        expect(r1).toEqual(r2);

        // babel-preset-perf-disable-next-line
        r1 = arr.map(Number);
        r2 = arr.map(Number);

        expect(r1).toEqual(r2);
    });

    test('test with map this', () => {
        const otherData = { i: 5 };

        // babel-preset-perf-disable-next-line
        const r1 = arr.map(function (x) {
            return x + this.i;
        }, otherData);

        const r2 = arr.map(function (x) {
            return x + this.i;
        }, otherData);

        expect(r1).toEqual(r2);
    });

    test('complex test', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.sort().map((x) => x + 1);
        const r2 = arr.sort().map((x) => x + 1);

        expect(r1).toEqual(r2);
    });
});
