describe('Object.values', () => {
    test('Object.values(obj)[]', () => {
        const obj = { one: 1, two: 2 };

        // babel-preset-perf-disable-next-line
        const r1 = Object.values(obj)[0];
        const r2 = Object.values(obj)[0];

        expect(r1).toStrictEqual(r2);
    });

    test('Object.values({...})[]', () => {
        // babel-preset-perf-disable-next-line
        const r1 = Object.values({ one: 1, two: 2 })[0];
        const r2 = Object.values({ one: 1, two: 2 })[0];

        expect(r1).toStrictEqual(r2);
    });
});
