const arr = [1, 2, 3];

const x = arr
    .map(function (x) {
        return x + 1;
    })
    .join(', ');

const x1 = arr
    .map(function (x) {
        return x + this.i;
    }, obj)
    .join(', ');

const x3 = arr.map(String).join(', ');
