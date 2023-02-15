const path = require('path');

describe('join', () => {
    const arr = [1, 2, 3];
    test('arr.join', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.join();
        const r2 = arr.join();

        expect(r1).toEqual(r2);
    });

    test('arr.join(separator)', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = arr.join('-');
        const r2 = arr.join('-');

        expect(r1).toEqual(r2);
    });

    test('join() shold not transform with arguments > 1', () => {
        // @babel-preset-perf-disable-next-line
        const r1 = path.join('dir', 'sample');
        const r2 = path.join('dir', 'sample');

        expect(r1).toEqual(r2);
    });
});
