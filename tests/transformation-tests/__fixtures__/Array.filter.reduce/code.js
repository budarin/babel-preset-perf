const r = arr.filter((x) => x > 1).reduce((acc, x) => acc + x, 0);

const r1 = arr
    .filter(function (x) {
        return x > this.i;
    }, obj)
    .reduce((acc, x) => {
        return acc + x;
    }, 0);
