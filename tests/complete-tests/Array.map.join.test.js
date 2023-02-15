describe('map.join', () => {
    const arr = [1, 2, 3];

    test('arr.map.join', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.map((x) => x + 1).join(' ');
        const r2 = arr.map((x) => x + 1).join(' ');

        expect(r1).toEqual(r2);
    });

    test('arr.map.join with map this', () => {
        const otherData = { i: 5 };

        // @babel-preset-perf-disable-next-line
        const r1 = arr
            .map(function (x) {
                return x + this.i;
            }, otherData)
            .join();

        const r2 = arr
            .map(function (x) {
                return x + this.i;
            }, otherData)
            .join();

        expect(r1).toEqual(r2);
    });
});
