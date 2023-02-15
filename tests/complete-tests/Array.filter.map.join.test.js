// @babel-plugin-perf-ignore

describe('filter.map.join', () => {
    const arr = [1, 2, 3];

    test('arr.filter.map.join', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .filter((x) => x > 0.5)
            .map((x, i) => x + i)
            .join('=');

        const r2 = arr
            .filter((x) => x > 0.5)
            .map((x, i) => x + i)
            .join('=');

        expect(r1).toEqual(r2);
    });
    test('arr.filter.map.join  с одним найденным элементом', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .filter((x) => x > 2)
            .map((x, i) => x + i)
            .join('-');

        const r2 = arr
            .filter((x) => x > 2)
            .map((x, i) => x + i)
            .join('-');

        expect(r1).toEqual(r2);
    });
    test('arr.filter.map.join  ничего не найдено', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .filter((x) => x > 5)
            .map((x, i) => x + i)
            .join();

        const r2 = arr
            .filter((x) => x > 5)
            .map((x, i) => x + i)
            .join();

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map.join with map this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .filter(function (x) {
                return x > 0.5;
            })
            .map(function (x, i) {
                return x + this.i;
            }, obj)
            .join();

        const r2 = arr
            .filter(function (x) {
                return x > 0.5;
            })
            .map(function (x, i) {
                return x + this.i;
            }, obj)
            .join();

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map.join with map and filter this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + this.i;
            }, obj)
            .join();

        const r2 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + this.i;
            }, obj)
            .join();

        expect(r1).toEqual(r2);
    });

    test('arr.filter.map.join with filter this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + 1;
            })
            .join();

        const r2 = arr
            .filter(function (x) {
                return x > this.j;
            }, obj)
            .map(function (x, i) {
                return x + 1;
            })
            .join();

        expect(r1).toEqual(r2);
    });
});
