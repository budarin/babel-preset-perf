const obj = {
    i: 1,
    j: 1,
};

function fmjt3() {
    ['  1', '2', '3   ']
        .filter(function (x) {
            return x.length > this.j;
        }, obj)
        .map(function (x, i) {
            return x.padEnd(this.i, ' ');
        }, obj)
        .join(' = ');
}

['  1', '2', '3   ']
    .filter(function (x) {
        return x.length > this.j;
    }, obj)
    .map((x, i) => x.padEnd(i, ' '))
    .join(' ');

['  1', '2', '3   ']
    .filter((x) => x.length > 1)
    .map(function (x, i) {
        return x.padEnd(this.i, ' ');
    }, obj)
    .join();

['  1', '2', '3   ']
    .filter((x) => x.length > 1)
    .map((x, i) => x.padEnd(i, ' '))
    .join(' = ');
