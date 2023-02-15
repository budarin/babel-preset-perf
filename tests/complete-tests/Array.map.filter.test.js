describe('map.filter', () => {
    const arr = [1, 2, 3];
    const obj = {
        i: 1,
        j: 0,
    };

    test('simple test', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.map((x) => x + 1).filter((x) => x > 0);
        const r2 = arr.map((x) => x + 1).filter((x) => x > 0);

        expect(r1).toEqual(r2);
    });

    test('with well know predicate', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.map((x) => x + 1).filter(Boolean);
        const r2 = arr.map((x) => x + 1).filter(Boolean);

        expect(r1).toEqual(r2);
    });

    test('arr.map.filter with map this', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .map(function (x) {
                return x + this.i;
            }, obj)
            .filter(function (x) {
                return x > 0;
            });

        const r2 = arr
            .map(function (x) {
                return x + this.i;
            }, obj)
            .filter(function (x) {
                return x > 0;
            });

        expect(r1).toEqual(r2);
    });

    test('arr.map.filter with filter this', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .map(function (x) {
                return x + 1;
            })
            .filter(function (x) {
                return x > this.j;
            }, obj);

        const r2 = arr
            .map(function (x) {
                return x + 1;
            })
            .filter(function (x) {
                return x > this.j;
            }, obj);

        expect(r1).toEqual(r2);
    });

    test('arr.map.filter with map and filter this', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .map(function (x) {
                return x + this.i;
            }, obj)
            .filter(function (x) {
                return x > this.j;
            }, obj);

        const r2 = arr
            .map(function (x) {
                return x + this.i;
            }, obj)
            .filter(function (x) {
                return x > this.j;
            }, obj);

        expect(r1).toEqual(r2);
    });
});
