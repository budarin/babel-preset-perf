describe('map.filter.join', () => {
    const arr = [1, 2, 3];
    const obj = {
        i: 1,
        j: 0,
    };

    test('arr.map.filter.join ', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .map((x) => x + 1)
            .filter((x) => x > 0)
            .join(' ');

        const r2 = arr
            .map((x) => x + 1)
            .filter((x) => x > 0)
            .join(' ');

        expect(r1).toEqual(r2);
    });

    test('arr.map.filter.join with filter this argument', () => {
        function f1() {
            // @babel-preset-perf-disable-next-line
            return arr
                .map((x) => x + 1)
                .filter(function (x) {
                    return x > this.j;
                }, obj)
                .join();
        }

        function f2() {
            return arr
                .map((x) => x + 1)
                .filter(function (x) {
                    return x > this.j;
                }, obj)
                .join();
        }

        expect(f1()).toEqual(f2());
    });

    test('arr.map.filter.join with map this argument', () => {
        function f1() {
            // @babel-preset-perf-disable-next-line
            return arr
                .map(function (x) {
                    return x + this.i;
                }, obj)
                .filter(function (x) {
                    return x > 0;
                })
                .join();
        }

        function f2() {
            return arr
                .map(function (x) {
                    return x + this.i;
                }, obj)
                .filter(function (x) {
                    return x > 0;
                })
                .join();
        }

        expect(f1()).toEqual(f2());
    });

    test('arr.map.filter.join with map and filter this argument', () => {
        function f1() {
            // @babel-preset-perf-disable-next-line
            return arr
                .map(function (x) {
                    return x + this.i;
                }, obj)
                .filter(function (x) {
                    return x > this.j;
                }, obj)
                .join();
        }

        function f2() {
            return arr
                .map(function (x) {
                    return x + this.i;
                }, obj)
                .filter(function (x) {
                    return x > this.j;
                }, obj)
                .join();
        }

        expect(f1()).toEqual(f2());
    });
});
