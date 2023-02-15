describe('Object.entries', () => {
    const obj = { one: 1, two: 2 };

    test('Object.entries(obj).reduce', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = Object.entries(obj).reduce((acc, [key, val], i) => acc + key.length + String(val).length + i, 0);
        const r2 = Object.entries(obj).reduce((acc, [key, val], i) => acc + key.length + String(val).length + i, 0);

        expect(r1).toStrictEqual(r2);
    });

    test('Object.entries({...}).reduce', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = Object.entries({ a: 1, b: 2 }).reduce(
            (acc, [key, val], i) => acc + key.length + String(val).length + i,
            0,
        );

        const r2 = Object.entries({ a: 1, b: 2 }).reduce(
            (acc, [key, val], i) => acc + key.length + String(val).length + i,
            0,
        );

        expect(r1).toStrictEqual(r2);
    });
});
