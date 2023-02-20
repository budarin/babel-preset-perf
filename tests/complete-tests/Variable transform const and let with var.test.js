describe('Variable transform const and let with var', () => {
    test('test', () => {
        function a() {
            if (a) {
                return 'correct';
            } else {
                // babel-preset-perf-disable-next-line
                let a;
                return 'incorrect';
            }
        }

        function b() {
            if (b) {
                return 'correct';
            } else {
                let b;
                return 'incorrect';
            }
        }

        expect(a()).toEqual(b());
    });
});
