describe('Object.entries', () => {
    const obj = { one: 1, two: 2 };

    test('Object.entries(obj).forEach', () => {
        let r1 = 0,
            r2 = 0;

        // @babel-preset-perf-disable-next-line
        Object.entries(obj).forEach(([key, value], i) => {
            r1 = r1 + key.length + String(value).length + i;
        });

        Object.entries(obj).forEach(([key, value], i) => {
            r2 = r2 + key.length + String(value).length + i;
        });

        expect(r1).toStrictEqual(r2);
    });

    test('Object.entries({...}).forEach', () => {
        let r1 = 0,
            r2 = 0;

        // @babel-preset-perf-disable-next-line
        Object.entries({ one: 1, two: 2 }).forEach(([key, value], i) => {
            r1 = r1 + key.length + String(value).length + i;
        });

        Object.entries({ one: 1, two: 2 }).forEach(([key, value], i) => {
            r2 = r2 + key.length + String(value).length + i;
        });

        expect(r1).toStrictEqual(r2);
    });

    test('Object.entries(obj).forEach with forEach this', () => {
        let r1 = 0,
            r2 = 0;
        const obj1 = { i: 1 };

        // @babel-preset-perf-disable-next-line
        Object.entries(obj).forEach(function ([key, value], i) {
            r1 = r1 + key.length + String(value).length + i + this.i;
        }, obj1);

        Object.entries(obj).forEach(function ([key, value], i) {
            r2 = r2 + key.length + String(value).length + i + this.i;
        }, obj1);

        expect(r1).toStrictEqual(r2);
    });
});
