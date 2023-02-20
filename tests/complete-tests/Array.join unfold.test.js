describe('array join unfolding', () => {
    const s0 = 's0',
        s1 = 's1',
        s12 = 's12',
        s13 = -1,
        s14 = false,
        sep = ' | ';

    test('one item', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [1].join();
        const r2 = [1].join();

        expect(r1).toStrictEqual(r2);
    });

    test('number items', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3, 4, 5].join();
        const r2 = [1, 2, 3, 4, 5].join();

        expect(r1).toStrictEqual(r2);
    });

    test('string items', () => {
        // babel-preset-perf-disable-next-line
        const r1 = ["default-src 'none';", "base-uri 'none';", "object-src 'none';"].join(' ');
        const r2 = ["default-src 'none';", "base-uri 'none';", "object-src 'none';"].join(' ');

        expect(r1).toStrictEqual(r2);
    });

    test('mixed items', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [s0 ? 5 : 0, 1, 'two', 'three', true, null, undefined, s1, s12].join('-');
        const r2 = [s0 ? 5 : 0, 1, 'two', 'three', true, null, undefined, s1, s12].join('-');

        expect(r1).toStrictEqual(r2);
    });

    test('identifier items', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [s1, s12, s13, s14].join();
        const r2 = [s1, s12, s13, s14].join();

        expect(r1).toStrictEqual(r2);
    });

    test('separator is identificator', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [s1, s12, s13, s14].join(sep);
        const r2 = [s1, s12, s13, s14].join(sep);

        expect(r1).toStrictEqual(r2);
    });
});
