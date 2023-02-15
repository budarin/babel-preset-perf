//
const arr = [1, 2, 3];
const obj = {
    i: 1,
};

// will not be transformed - more than 2 params
const func3 = (x, i, a) => {
    x = x + 1;
};
const y = arr.map((x) => x).forEach(func3);

const o = {};

// will be transformed
const x1 = arr
    .map(function (x) {
        return x;
    })
    .forEach(function (x) {
        o[i] = x + this.i;
    }, obj);

const x2 = arr
    .map(function (x) {
        return x + this.i;
    }, obj)
    .forEach(function (x) {
        o[i] = x + this.i;
    }, obj);

const x3 = arr
    .map(function (x) {
        return x + this.i;
    }, obj)
    .forEach(function (x) {
        o[i] = x;
    });
