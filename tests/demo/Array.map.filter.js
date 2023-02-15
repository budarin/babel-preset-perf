const func2 = require('func2');

//
const arr = [1, 2, 3];
const obj = {
    i: 1,
};

// will not be transformed - more than 2 params
const func1 = (x, i, a) => x + i - a[0];
const func3 = (x, i) => x > 0;
const y = arr.map(func1).filter(func3);

// will be transformed
const x = arr.map(String).filter(function (x) {
    return x > this.i;
}, obj);

//
function func(x) {
    return x + 1;
}

// will be transformed
function name() {
    function name1() {
        return [...a, ...b]
            .map(function (x) {
                return x + this.i;
            }, obj)
            .filter((x) => x > 0.5)
            .map(func);
    }

    return name1();
}

// will not be transformed
const z = arr.map(func2).filter((x) => x > 0.5);

arr.map(function (x) {
    return x + this.i;
}, obj).filter(function (x) {
    return x > this.i;
}, obj);
