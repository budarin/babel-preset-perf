// @babel-plugin-perf-ignore

const { objectValuesFirstItemHelper } = require('../../dist/helpers/objectValuesFirstItemHelper');

describe('Object.values', () => {
    test('Object.values(obj)[] - empty object', () => {
        const obj = { one: 1, two: 2 };

        const r1 = objectValuesFirstItemHelper({});
        const r2 = Object.values({})[0];

        expect(r1).toStrictEqual(r2);
    });

    test('Object.values(obj)[]', () => {
        const obj = { one: 1, two: 2 };

        const r1 = objectValuesFirstItemHelper(obj);
        const r2 = Object.values(obj)[0];

        expect(r1).toStrictEqual(r2);
    });

    test('Object.values({...})[]', () => {
        const r1 = objectValuesFirstItemHelper({ one: 1, two: 2 });
        const r2 = Object.values({ one: 1, two: 2 })[0];

        expect(r1).toStrictEqual(r2);
    });
});
