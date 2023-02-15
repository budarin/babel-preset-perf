const func2 = require('func2');

//
const arr = [1, 2, 3];
const obj = {
    i: 1,
};

// will not be transformed - more than 2 params
const func1 = (x, i, a) => x + i - a[0];
const func3 = (x, i) => x > 0;
const y = arr.map(func1).filter(func3).join(' ');

// will be transformed
const x = arr
    .map(String)
    .filter(function (x) {
        return x > this.i;
    }, obj)
    .join();

//
function func(x) {
    return x + this.i;
}

// will be transformed
function name() {
    function name1() {
        return [...a, ...b]
            .sort()
            .map(func, obj)
            .filter((x) => x > 0.5)
            .join();
    }

    return name1();
}

// will not be transformed
const z = arr
    .map(func2)
    .filter((x) => x > 0.5)
    .join();

arr.map(function (x) {
    return x + this.i;
}, obj)
    .filter(function (x) {
        return x > this.i;
    }, obj)
    .join();
