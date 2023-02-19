// @babel-plugin-perf-ignore

const { objectEntriesMapHelper } = require('../../dist/helpers/objectEntriesMapHelper');
const { objectEntriesMapHelperWithMapThis } = require('../../dist/helpers/objectEntriesMapHelperWithMapThis');

describe('Object.entries', () => {
    const obj = { one: 1, two: 2 };

    test('Object.entries(obj).map - empty object', () => {
        const r1 = objectEntriesMapHelper({}, ([key, val], i) => key.length + String(val).length + i);
        const r2 = Object.entries({}).map(([key, val], i) => key.length + String(val).length + i);

        expect(r1).toStrictEqual(r2);
    });

    test('Object.entries(obj).map', () => {
        const r1 = objectEntriesMapHelper(obj, ([key, val], i) => key.length + String(val).length + i);
        const r2 = Object.entries(obj).map(([key, val], i) => key.length + String(val).length + i);

        expect(r1).toStrictEqual(r2);
    });

    test('Object.entries({...}).map', () => {
        const r1 = objectEntriesMapHelper({ one: 1, two: 2 }, ([key, val], i) => key.length + String(val).length + i);
        const r2 = Object.entries({ one: 1, two: 2 }).map(([key, val], i) => key.length + String(val).length + i);

        expect(r1).toStrictEqual(r2);
    });

    test('Object.entries(obj).map with map this', () => {
        const o = { i: 1 };

        const r1 = objectEntriesMapHelperWithMapThis(
            obj,
            function ([key, val], i) {
                return key.length + String(val).length + this.i;
            },
            o,
        );

        const r2 = Object.entries(obj).map(function ([key, val], i) {
            return key.length + String(val).length + this.i;
        }, o);

        expect(r1).toStrictEqual(r2);
    });
});
