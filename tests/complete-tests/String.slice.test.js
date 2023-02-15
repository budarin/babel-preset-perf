describe('String.slice', () => {
    const str = 'string';

    test('with 2 params', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = str.slice(1, 4);
        const r2 = str.slice(1, 4);

        expect(r1).toEqual(r2);
    });

    test('with start', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = str.slice(1);
        const r2 = str.slice(1);

        expect(r1).toEqual(r2);
    });

    test('without params', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = str.slice();
        const r2 = str.slice();

        expect(r1).toEqual(r2);
    });

    test('with negative second param', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = str.slice(1, -2);
        const r2 = str.slice(1, -2);

        expect(r1).toEqual(r2);
    });

    test('array slice', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3, 4, 5].slice(1, 4);
        const r2 = [1, 2, 3, 4, 5].slice(1, 4);

        expect(r1).toEqual(r2);
    });
});
