describe('filter', () => {
    const arr = [1, 2, 3];

    test('simple test', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.filter((x) => x > 0).join('-');
        const r2 = arr.filter((x) => x > 0).join('-');

        expect(r1).toEqual(r2);
    });

    test('test with well known predicate', () => {
        // @babel-preset-perf-disable-next-line
        let r1 = arr.filter(Boolean).join('-');
        let r2 = arr.filter(Boolean).join('-');

        expect(r1).toEqual(r2);
    });

    test('test with filter this', () => {
        const obj = { i: 0.5 };

        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .filter(function (x) {
                return x > this.i;
            }, obj)
            .join('-');

        const r2 = arr
            .filter(function (x) {
                return x > this.i;
            }, obj)
            .join('-');

        expect(r1).toEqual(r2);
    });
});
