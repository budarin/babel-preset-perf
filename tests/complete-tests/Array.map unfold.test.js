describe('array map unfolding', () => {
    test('test1', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [
            'Int8',
            'Uint8',
            'Uint8Clamped',
            'Int16',
            'Uint16',
            'Int32',
            'Uint32',
            'Float32',
            'Float64',
            'BigInt64',
            'BigUint64',
        ].map((x) => x + 'Array');

        const r2 = [
            'Int8',
            'Uint8',
            'Uint8Clamped',
            'Int16',
            'Uint16',
            'Int32',
            'Uint32',
            'Float32',
            'Float64',
            'BigInt64',
            'BigUint64',
        ].map((x) => x + 'Array');

        expect(r1).toStrictEqual(r2);
    });

    test('test2', () => {
        // babel-preset-perf-disable-next-line
        const f1 = () => ({
            metadata: {
                union: [
                    'Int8',
                    'Uint8',
                    'Uint8Clamped',
                    'Int16',
                    'Uint16',
                    'Int32',
                    'Uint32',
                    'Float32',
                    'Float64',
                    'BigInt64',
                    'BigUint64',
                ].map((x) => x + 'Array'),
            },
        });

        const f2 = () => ({
            metadata: {
                union: [
                    'Int8',
                    'Uint8',
                    'Uint8Clamped',
                    'Int16',
                    'Uint16',
                    'Int32',
                    'Uint32',
                    'Float32',
                    'Float64',
                    'BigInt64',
                    'BigUint64',
                ].map((x) => x + 'Array'),
            },
        });

        expect(f1()).toStrictEqual(f2());
    });

    test('test3', () => {
        const f = (x) => x;

        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(f);
        const r2 = [1, 2, 3].map(f);

        expect(r1).toStrictEqual(r2);
    });

    test('test4', () => {
        const f1 = (x, i) => x + i;

        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(f1);
        const r2 = [1, 2, 3].map(f1);

        expect(r1).toStrictEqual(r2);
    });

    test('test5', () => {
        const f11 = (x, i, a) => x + i + a[i];

        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(f11);
        const r2 = [1, 2, 3].map(f11);

        expect(r1).toStrictEqual(r2);
    });

    test('test6', () => {
        const f = (x, i, a) => x + i;

        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(f);
        const r2 = [1, 2, 3].map(f);

        expect(r1).toStrictEqual(r2);
    });

    test('test7', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map((x) => x);
        const r2 = [1, 2, 3].map((x) => x);

        expect(r1).toStrictEqual(r2);
    });

    test('test8', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map((x, i) => x + i);
        const r2 = [1, 2, 3].map((x, i) => x + i);

        expect(r1).toStrictEqual(r2);
    });

    test('test9', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(function (x, i) {
            return x + i;
        });
        const r2 = [1, 2, 3].map(function (x, i) {
            return x + i;
        });

        expect(r1).toStrictEqual(r2);
    });

    test('test10', () => {
        // babel-preset-perf-disable-next-line
        const r1 = (func2) => [1, 2, 3].map(func2);
        const r2 = (func2) => [1, 2, 3].map(func2);

        expect(r1((x) => x)).toStrictEqual(r2((x) => x));
    });

    test('test11', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(String);
        const r2 = [1, 2, 3].map(String);

        expect(r1).toStrictEqual(r2);
    });

    test('test12', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(Number);
        const r2 = [1, 2, 3].map(Number);

        expect(r1).toStrictEqual(r2);
    });

    test('test13', () => {
        // babel-preset-perf-disable-next-line
        const r1 = [1, 2, 3].map(Boolean);
        const r2 = [1, 2, 3].map(Boolean);

        expect(r1).toStrictEqual(r2);
    });
});
