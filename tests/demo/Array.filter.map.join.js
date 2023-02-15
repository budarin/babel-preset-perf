//
const arr = [1, 2, 3];

arr.filter((x) => x > 0.5)
    .map((x, i) => x + i)
    .join(' = ');

const obj = {
    i: 1,
    j: 0.5,
};

// with filter this
arr.filter(function (x) {
    return x > this.j;
}, obj)
    .map((x, i) => x + i)
    .join(' ');

// with map this
arr.filter((x) => x > 0.5)
    .map(function (x, i) {
        return x + this.i;
    }, obj)
    .join();

// with filter & map this
function fmjt3() {
    arr.filter(function (x) {
        return x > this.j;
    }, obj)
        .map(function (x, i) {
            return x + this.i;
        }, obj)
        .join(' = ');
}
