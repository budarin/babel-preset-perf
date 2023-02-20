describe('Object.entries', () => {
    const obj = { one: 1, two: 2 };

    test('Object.entries(obj).map', () => {
        // babel-preset-perf-disable-next-line
        const r1 = Object.entries(obj).map(([key, val], i) => key.length + String(val).length + i);
        const r2 = Object.entries(obj).map(([key, val], i) => key.length + String(val).length + i);

        expect(r1).toStrictEqual(r2);
    });

    test('Object.entries({...}).map', () => {
        // babel-preset-perf-disable-next-line
        const r1 = Object.entries({ one: 1, two: 2 }).map(([key, val], i) => key.length + String(val).length + i);
        const r2 = Object.entries({ one: 1, two: 2 }).map(([key, val], i) => key.length + String(val).length + i);

        expect(r1).toStrictEqual(r2);
    });

    test('Object.entries(obj).map with map this', () => {
        const o = { i: 1 };

        // babel-preset-perf-disable-next-line
        const r1 = Object.entries(obj).map(function ([key, val], i) {
            return key.length + String(val).length + this.i;
        }, o);

        const r2 = Object.entries(obj).map(function ([key, val], i) {
            return key.length + String(val).length + this.i;
        }, o);

        expect(r1).toStrictEqual(r2);
    });
});
