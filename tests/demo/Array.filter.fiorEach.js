//
const arr = [1, 2, 3];
const o = {};
const obj = {
    i: 1,
};

const func = (x) => x > 0;
const func3 = (x, i) => {
    return x > 1;
};

const y = arr.filter(func).forEach(func3);

const x1 = arr
    .filter(function (x) {
        return x > 1;
    })
    .forEach(function (x) {
        o[i] = x + this.i;
    }, obj);

const x2 = arr
    .filter(function (x) {
        return x > this.i;
    }, obj)
    .forEach(function (x) {
        o[i] = x + this.i;
    }, obj);

const x3 = arr
    .filter(function (x) {
        return x > this.i;
    }, obj)
    .forEach(function (x) {
        o[i] = x;
    });
