describe('map.forEach', () => {
    const arr = [1, 2, 3];
    const obj = { i: 1 };

    test('arr.map.foreach', () => {
        let r1 = 0,
            r2 = 0;

        // babel-preset-perf-disable-next-line
        arr.map((x) => x).forEach((x) => {
            r1 = r1 + x;
        });

        arr.map((x) => x).forEach((x) => {
            r2 = r2 + x;
        });

        expect(r1).toEqual(r2);
    });

    test('arr.map.foreach with forEach this', () => {
        let r1 = 0,
            r2 = 0;

        // babel-preset-perf-disable-next-line
        arr.map(function (x) {
            return x;
        }).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arr.map(function (x) {
            return x;
        }).forEach(function (x) {
            r2 = r2 + x + this.i;
        }, obj);

        expect(r1).toEqual(r2);
    });

    test('arr.map.foreach with map this', () => {
        let r1 = 0,
            r2 = 0;

        // babel-preset-perf-disable-next-line
        arr.map(function (x) {
            return x + this.i;
        }, obj).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arr.map(function (x) {
            return x + this.i;
        }, obj).forEach(function (x) {
            r2 = r2 + x + this.i;
        }, obj);

        expect(r1).toEqual(r2);
    });

    test('arr.map.foreach with map and forEach this', () => {
        let r1 = 0,
            r2 = 0;

        // babel-preset-perf-disable-next-line
        arr.map(function (x) {
            return x + this.i;
        }, obj).forEach(function (x) {
            r1 = r1 + x + this.i;
        }, obj);

        arr.map(function (x) {
            return x + this.i;
        }, obj).forEach(function (x) {
            r2 = r2 + x + this.i;
        }, obj);

        expect(r1).toEqual(r2);
    });
});
