// @babel-plugin-perf-ignore

const { objectEntriesFilterMapJoinHelper } = require('../../dist/helpers/objectEntriesFilterMapJoinHelper');
const {
    objectEntriesFilterMapJoinHelperWithMapThis,
} = require('../../dist/helpers/objectEntriesFilterMapJoinHelperWithMapThis');
const {
    objectEntriesFilterMapJoinHelperWithFilterThis,
} = require('../../dist/helpers/objectEntriesFilterMapJoinHelperWithFilterThis');
const {
    objectEntriesFilterMapJoinHelperWithFilterAndMapThis,
} = require('../../dist/helpers/objectEntriesFilterMapJoinHelperWithFilterAndMapThis');

describe('Object.entries', () => {
    const o = { i: 1 };
    const obj = { abcd: 1, bcd: 2, cd: 0 };

    test('Object.entries.filter.map.join - empty enties array', () => {
        const r1 = Object.entries({})
            .filter(([key, val], i) => key.length > 1 && val > -1)
            .map(([key, val]) => key.length + val)
            .join('-');

        const r2 = objectEntriesFilterMapJoinHelper(
            {},
            ([key, val], i) => key.length > 1 && val > -1,
            ([key, val]) => key.length + val,
            '-',
        );

        expect(r1).toEqual(r2);
    });

    test('Object.entries.filter.map.join', () => {
        const r1 = Object.entries(obj)
            .filter(([key, val], i) => key.length > 1 && val > -1)
            .map(([key, val]) => key.length + val)
            .join('-');

        const r2 = objectEntriesFilterMapJoinHelper(
            obj,
            ([key, val], i) => key.length > 1 && val > -1,
            ([key, val]) => key.length + val,
            '-',
        );

        expect(r1).toEqual(r2);
    });

    test('Object.entries.filter.map.join with filter and map this', () => {
        const r1 = Object.entries(obj)
            .filter(function ([key, val], i) {
                return key.length > this.i && val > -1;
            }, o)
            .map(function ([key, val]) {
                return key.length + val + this.i;
            }, o)
            .join('-');

        const r2 = objectEntriesFilterMapJoinHelperWithFilterAndMapThis(
            obj,
            function ([key, val], i) {
                return key.length > this.i && val > -1;
            },
            o,
            function ([key, val]) {
                return key.length + val + this.i;
            },
            o,
            '-',
        );

        expect(r1).toEqual(r2);
    });

    test('Object.entries.filter.map.join with filter this', () => {
        const r1 = Object.entries(obj)
            .filter(function ([key, val], i) {
                return key.length > this.i && val > -1;
            }, o)
            .map(([key, val]) => key.length + val)
            .join('-');

        const r2 = objectEntriesFilterMapJoinHelperWithFilterThis(
            obj,
            function ([key, val], i) {
                return key.length > this.i && val > -1;
            },
            o,
            ([key, val]) => key.length + val,
            '-',
        );

        expect(r1).toEqual(r2);
    });

    test('Object.entries.filter.map.join with map this', () => {
        const r1 = Object.entries(obj)
            .filter(([key, val], i) => key.length > 1 && val > -1)
            .map(function ([key, val]) {
                return key.length + val + this.i;
            }, o)
            .join('-');

        const r2 = objectEntriesFilterMapJoinHelperWithMapThis(
            obj,
            ([key, val], i) => key.length > 1 && val > -1,
            function ([key, val]) {
                return key.length + val + this.i;
            },
            o,
            '-',
        );

        expect(r1).toEqual(r2);
    });
});
