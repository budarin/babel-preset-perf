const arr = [1, 2, 3];

const x2 = arr
    .map(function (x) {
        return x + this.i;
    }, obj)
    .reduce((acc, x) => acc + x, 0);

const x = arr.map(String).reduce((acc, x) => acc + x.length, 0);

const x1 = arr
    .map(function (x) {
        return x + 1;
    })
    .reduce((acc, x) => acc + x, 0);
