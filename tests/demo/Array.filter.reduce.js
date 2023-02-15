const func2 = require('func2');

const arr = [1, 2, 3];

//
// will not be transformed - more than 2 params
const func1 = (x, i, a) => x > 1;
const y = arr.map(func1).reduce((acc, x) => acc + x, 0);

// +
const arr1 = ['1', '2', '3'];
const x = arr1.filter((x) => x > 1).reduce((acc, x) => acc + x, 0); // Boolean, Number

function func(x) {
    return x > 1;
}

// +
function name() {
    function name1() {
        return [...a, ...b]
            .map((x, i) => x * i)
            .filter(func)
            .reduce((acc, x) => acc + x, 0);
    }

    return name1();
}

// -
const z = arr.filter(func2).reduce((acc, x) => acc + x, 0);

// -
const z1 = arr.filter(func).reduce((acc, x, i, a) => acc + x + i + a[i], 0);

// +
const obj = {
    i: 1,
};
arr.filter(function (x) {
    return x > this.i;
}, obj).reduce((acc, x) => acc + x, 0);
