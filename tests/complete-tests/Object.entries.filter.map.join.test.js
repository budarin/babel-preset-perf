describe('Object.entries', () => {
    const o = { i: 1 };
    const obj = { abcd: 1, bcd: 2, cd: 0 };

    test('Object.entries.filter.map.join', () => {
        // babel-preset-perf-disable-next-line
        const r1 = Object.entries(obj)
            .filter(([key, val], i) => key.length > 1 && val > -1)
            .map(([key, val]) => key.length + val)
            .join('-');

        const r2 = Object.entries(obj)
            .filter(([key, val], i) => key.length > 1 && val > -1)
            .map(([key, val]) => key.length + val)
            .join('-');

        expect(r1).toEqual(r2);
    });

    test('Object.entries.filter.map.join with filter and map this', () => {
        // babel-preset-perf-disable-next-line
        const r1 = Object.entries(obj)
            .filter(function ([key, val], i) {
                return key.length > this.i && val > -1;
            }, o)
            .map(function ([key, val]) {
                return key.length + val + this.i;
            }, o)
            .join('-');

        const r2 = Object.entries(obj)
            .filter(function ([key, val], i) {
                return key.length > this.i && val > -1;
            }, o)
            .map(function ([key, val]) {
                return key.length + val + this.i;
            }, o)
            .join('-');

        expect(r1).toEqual(r2);
    });
    test('Object.entries.filter.map.join with filter this', () => {
        // babel-preset-perf-disable-next-line
        const r1 = Object.entries(obj)
            .filter(function ([key, val], i) {
                return key.length > this.i && val > -1;
            }, o)
            .map(([key, val]) => key.length + val)
            .join('-');

        const r2 = Object.entries(obj)
            .filter(function ([key, val], i) {
                return key.length > this.i && val > -1;
            }, o)
            .map(([key, val]) => key.length + val)
            .join('-');

        expect(r1).toEqual(r2);
    });
    test('Object.entries.filter.map.join with map this', () => {
        // babel-preset-perf-disable-next-line
        const r1 = Object.entries(obj)
            .filter(([key, val], i) => key.length > 1 && val > -1)
            .map(function ([key, val]) {
                return key.length + val + this.i;
            }, o)
            .join('-');

        const r2 = Object.entries(obj)
            .filter(([key, val], i) => key.length > 1 && val > -1)
            .map(function ([key, val]) {
                return key.length + val + this.i;
            }, o)
            .join('-');

        expect(r1).toEqual(r2);
    });
});
