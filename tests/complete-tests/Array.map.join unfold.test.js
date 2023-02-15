describe('array map.join unfolding', () => {
    const f = (x, i) => x + i;

    test('test1', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(String).join();
        const r2 = [1, 2, 3].map(String).join();

        expect(r1).toEqual(r2);
    });

    test('test2', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map((x) => x).join();
        const r2 = [1, 2, 3].map((x) => x).join();

        expect(r1).toEqual(r2);
    });

    test('test3', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map((x, i) => x + i).join();
        const r2 = [1, 2, 3].map((x, i) => x + i).join();

        expect(r1).toEqual(r2);
    });

    test('test4', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3]
            .map(function (x, i) {
                return x + i;
            })
            .join();
        const r2 = [1, 2, 3]
            .map(function (x, i) {
                return x + i;
            })
            .join();

        expect(r1).toEqual(r2);
    });

    test('test5', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(f).join();
        const r2 = [1, 2, 3].map(f).join();

        expect(r1).toEqual(r2);
    });

    test('test6', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map((x, i, a) => x + i).join();
        const r2 = [1, 2, 3].map((x, i, a) => x + i).join();

        expect(r1).toEqual(r2);
    });

    test('test7', () => {
        const f1 = (x, i, a) => x + i;

        // @babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(f1).join();
        const r2 = [1, 2, 3].map(f1).join();

        expect(r1).toEqual(r2);
    });

    test('test8', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map((x, i, a) => x + a[i]).join();
        const r2 = [1, 2, 3].map((x, i, a) => x + a[i]).join();

        expect(r1).toEqual(r2);
    });

    test('test9', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = () => [1, 2, 3].map(f).join('-');
        const r2 = () => [1, 2, 3].map(f).join('-');

        expect(r1()).toEqual(r2());
    });

    test('test10', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = () => [1, 2, 3].map((x, i, a) => x + i).join('-');
        const r2 = () => [1, 2, 3].map((x, i, a) => x + i).join('-');

        expect(r1()).toEqual(r2());
    });

    test('test11', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = () => [1, 2, 3].map((x, i, a) => x + a[i]).join('-');
        const r2 = () => [1, 2, 3].map((x, i, a) => x + a[i]).join('-');

        expect(r1()).toEqual(r2());
    });
});
