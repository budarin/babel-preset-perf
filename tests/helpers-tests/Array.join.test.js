// @babel-plugin-perf-ignore

const { arrayJoinHelper } = require('../../dist/helpers/arrayJoinHelper');

describe('join', () => {
    const arr = [1, 2, 3];
    test('arr.join() - empty array', () => {
        expect([].join(' ')).toEqual(arrayJoinHelper([], ' '));
    });

    test('arr.join()', () => {
        expect(arr.join(' ')).toEqual(arrayJoinHelper(arr, ' '));
    });
});
