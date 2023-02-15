describe('Array ', () => {
    const array = [1, 2, , 4, 5];
    test('destructuring with identifiedr', () => {
        // @babel-preset-perf-disable-next-line
        const [a, b, c = 1, ...rest] = array,
            v = 1;

        const [a1, b1, c1 = 1, ...rest1] = array,
            v1 = 1;

        expect(a).toStrictEqual(a1);
        expect(b).toStrictEqual(b1);
        expect(c).toStrictEqual(c1);
        expect(c).toStrictEqual(1);
        expect(v).toStrictEqual(v1);
        expect(rest).toStrictEqual(rest1);
    });

    test('destructuring with call expression', () => {
        const ff = () => array;

        // @babel-preset-perf-disable-next-line
        const [a, b, c = 1, ...rest] = ff(),
            v = 1;

        const [a1, b1, c1 = 1, ...rest1] = ff(),
            v1 = 1;

        expect(a).toStrictEqual(a1);
        expect(b).toStrictEqual(b1);
        expect(c).toStrictEqual(c1);
        expect(c).toStrictEqual(1);
        expect(v).toStrictEqual(v1);
        expect(rest).toStrictEqual(rest1);
    });
});
