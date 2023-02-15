// @babel-plugin-perf-ignore

const { objectEntriesReduceHelper } = require('../../dist/helpers/objectEntriesReduceHelper');

describe('Object.entries', () => {
    const obj = { one: 1, two: 2 };

    test('Object.entries(obj).reduce', () => {
        const r1 = objectEntriesReduceHelper(obj, (acc, [key, val], i) => acc + key.length + String(val).length + i, 0);
        const r2 = Object.entries(obj).reduce((acc, [key, val], i) => acc + key.length + String(val).length + i, 0);

        expect(r1).toStrictEqual(r2);
    });

    test('Object.entries({...}).reduce', () => {
        const r1 = objectEntriesReduceHelper(
            { one: 1, two: 2 },
            (acc, [key, val], i) => acc + key.length + String(val).length + i,
            0,
        );
        const r2 = Object.entries({ one: 1, two: 2 }).reduce(
            (acc, [key, val], i) => acc + key.length + String(val).length + i,
            0,
        );

        expect(r1).toStrictEqual(r2);
    });
});
