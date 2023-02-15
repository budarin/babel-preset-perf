describe('filter.forEach', () => {
    const arr = [1, 2, 3];
    const obj = { i: 1 };

    test('arr.filter.foreach', () => {
        let r1 = 0,
            r2 = 0;

        // @babel-preset-perf-disable-next-line
        arr.filter((x) => x > 1).forEach((x) => {
            r1 = r1 + x;
        });

        arr.filter((x) => x > 1).forEach((x) => {
            r2 = r2 + x;
        });

        expect(r1).toEqual(r2);
    });

    test('arr.filter.foreach with forEach this', () => {
        let r1 = 0,
            r2 = 0;

        // @babel-preset-perf-disable-next-line
        arr.filter(function (x) {
            return x > 1;
        }).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arr.filter(function (x) {
            return x > 1;
        }).forEach(function (x) {
            r2 = r2 + x + this.i;
        }, obj);

        expect(r1).toEqual(r2);
    });

    test('arr.filter.foreach with map this', () => {
        let r1 = 0,
            r2 = 0;

        // @babel-preset-perf-disable-next-line
        arr.filter(function (x) {
            return x > this.i;
        }, obj).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arr.filter(function (x) {
            return x > this.i;
        }, obj).forEach(function (x) {
            r2 = r2 + x + this.i;
        }, obj);

        expect(r1).toEqual(r2);
    });

    test('arr.filter.foreach with map and forEach this', () => {
        let r1 = 0,
            r2 = 0;

        // @babel-preset-perf-disable-next-line
        arr.filter(function (x) {
            return x > this.i;
        }, obj).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arr.filter(function (x) {
            return x > this.i;
        }, obj).forEach(function (x) {
            r2 = r2 + x + this.i;
        }, obj);

        expect(r1).toEqual(r2);
    });
});
