describe('Object', () => {
    test('objectExpressionWithSpread', () => {
        const b = { one: 1, two: 2 };
        const c = [{ three: 3 }];
        const f = { f: 'f' };
        const obj = { me: 1 };

        // babel-preset-perf-disable-next-line
        const r1 = { a: { ...obj, a: 1, c: 2, ...b, d: 3 }, ...c, f };
        const r2 = { a: { ...obj, a: 1, c: 2, ...b, d: 3 }, ...c, f };

        expect(r1).toStrictEqual(r2);
    });
});
