// @babel-plugin-perf-ignore

describe('filter.map', () => {
    const arr = [1, 2, 3];

    test('arr.filter.map', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter((x) => x > 0.5).map((x, i) => x + i);
        const r2 = arr.filter((x) => x > 0.5).map((x, i) => x + i);

        expect(r1).toEqual(r2);
    });
    test('arr.filter.map  с одним найденным элементом', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter((x) => x > 2).map((x, i) => x + i);
        const r2 = arr.filter((x) => x > 2).map((x, i) => x + i);

        expect(r1).toEqual(r2);
    });
    test('arr.filter.map  ничего не найдено', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter((x) => x > 5).map((x, i) => x + i);
        const r2 = arr.filter((x) => x > 5).map((x, i) => x + i);

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map with map this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        // babel-preset-perf-disable-next-line
        const r1 = arr
            .filter(function (x) {
                return x > 0.5;
            })
            .map(function (x, i) {
                return x + this.i;
            }, obj);

        const r2 = arr
            .filter(function (x) {
                return x > 0.5;
            })
            .map(function (x, i) {
                return x + this.i;
            }, obj);

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map with map and filter this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        // babel-preset-perf-disable-next-line
        const r1 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + this.i;
            }, obj);

        const r2 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + this.i;
            }, obj);

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map with filter this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        // babel-preset-perf-disable-next-line
        const r1 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + 1;
            });

        const r2 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + 1;
            });

        expect(r1).toEqual(r2);
    });
});
