// @babel-plugin-perf-ignore

describe('array.filter.length as boolean', () => {
    const arr = [1, 2, 3, 4, 5];

    test('arr.filter.length: conditional expr', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter((x) => x > 0.5).length ? 1 : 0;
        const r2 = arr.filter((x) => x > 0.5).length ? 1 : 0;

        expect(r1).toEqual(r2);
    });

    test('arr.filter.length: logical in conditional expr', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter((x) => x > 0.5).length > 0 ? 1 : 0;
        const r2 = arr.filter((x) => x > 0.5).length > 0 ? 1 : 0;

        expect(r1).toEqual(r2);
    });

    test('arr.filter.length: logical expr', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter((x) => x > 0.5).length && 1;
        const r2 = arr.filter((x) => x > 0.5).length && 1;

        expect(r1).toEqual(r2);
    });

    test('arr.filter.length: if expr', () => {
        // babel-preset-perf-disable-next-line
        if (arr.filter((x) => x > 0.5).length) {
            const r1 = true;
        }
        if (arr.filter((x) => x > 0.5).length) {
            const r2 = true;
        }

        expect(r1).toEqual(r2);
    });

    // binary exp +
    test('arr.filter(Boolean).length > 0', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter(Boolean).length > 0;
        const r2 = arr.filter(Boolean).length > 0;

        expect(r1).toEqual(r2);
    });

    // binary exp +
    test('arr.filter(Boolean).length !== 0', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter(Boolean).length !== 0;
        const r2 = arr.filter(Boolean).length !== 0;

        expect(r1).toEqual(r2);
    });

    // binary exp +
    test('arr.filter(Boolean).length === 0', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter(Boolean).length === 0;
        const r2 = arr.filter(Boolean).length === 0;

        expect(r1).toEqual(r2);
    });

    // binary exp +
    test('0 < arr.filter(Boolean).length', () => {
        // babel-preset-perf-disable-next-line
        const r1 = 0 < arr.filter(Boolean).length;
        const r2 = 0 < arr.filter(Boolean).length;

        expect(r1).toEqual(r2);
    });

    // binary exp +
    test('0 !== arr.filter(Boolean).length', () => {
        // babel-preset-perf-disable-next-line
        const r1 = 0 !== arr.filter(Boolean).length;
        const r2 = 0 !== arr.filter(Boolean).length;

        expect(r1).toEqual(r2);
    });

    // binary exp +
    test('0 === arr.filter(Boolean).length', () => {
        // babel-preset-perf-disable-next-line
        const r1 = 0 === arr.filter(Boolean).length;
        const r2 = 0 === arr.filter(Boolean).length;

        expect(r1).toEqual(r2);
    });

    // binary exp + => !filterLengthHelper(...)
    test('0 !== arr.filter(Boolean).length', () => {
        // babel-preset-perf-disable-next-line
        const r1 = 0 == arr.filter(Boolean).length;
        const r2 = 0 == arr.filter(Boolean).length;

        expect(r1).toEqual(r2);
    });

    //

    // binary exp -
    test('arr.filter(Boolean).length > 5', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter(Boolean).length > 5;
        const r2 = arr.filter(Boolean).length > 5;

        expect(r1).toEqual(r2);
    });

    // binary exp -
    test('arr.filter(Boolean).length !== 1', () => {
        // babel-preset-perf-disable-next-line
        const r1 = arr.filter(Boolean).length !== 1;
        const r2 = arr.filter(Boolean).length !== 1;

        expect(r1).toEqual(r2);
    });

    // binary exp -
    test('2 < arr.filter(Boolean).length', () => {
        // babel-preset-perf-disable-next-line
        const r1 = 2 < arr.filter(Boolean).length;
        const r2 = 2 < arr.filter(Boolean).length;

        expect(r1).toEqual(r2);
    });

    // binary exp -
    test('1 !== arr.filter(Boolean).length', () => {
        // babel-preset-perf-disable-next-line
        const r1 = 1 !== arr.filter(Boolean).length;
        const r2 = 1 !== arr.filter(Boolean).length;

        expect(r1).toEqual(r2);
    });

    //

    // unary exp !! +
    test('!!arr.filter(Boolean).length', () => {
        // babel-preset-perf-disable-next-line
        const r1 = !!arr.filter(Boolean).length;
        const r2 = !!arr.filter(Boolean).length;

        expect(r1).toEqual(r2);
    });

    // unary exp !+
    test('!arr.filter(Boolean).length', () => {
        // babel-preset-perf-disable-next-line
        const r1 = !arr.filter(Boolean).length;
        const r2 = !arr.filter(Boolean).length;

        expect(r1).toEqual(r2);
    });

    // Boolean +
    test('Boolean(arr.filter(Boolean).length)', () => {
        // babel-preset-perf-disable-next-line
        const r1 = Boolean(arr.filter(Boolean).length);
        const r2 = Boolean(arr.filter(Boolean).length);

        expect(r1).toEqual(r2);
    });

    test('arr.filter.length with filter this', () => {
        const obj = {
            i: 1,
            j: 0.5,
        };

        // babel-preset-perf-disable-next-line
        const r1 =
            arr.filter(function (x) {
                return x > 0.5;
            }, obj).length && 1;
        const r2 =
            arr.filter(function (x) {
                return x > 0.5;
            }, obj).length && 1;

        expect(r1).toEqual(r2);
    });
});
