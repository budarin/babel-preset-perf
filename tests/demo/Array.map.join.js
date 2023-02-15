const func2 = require('func2');

//
const arr = [1, 2, 3];

// will not be transformed - more than 2 params
const func1 = (x, i, a) => x + i - a[0];
const y = arr.map(func1).join('|');

// will be transformed
const x = arr.map(String).join(); // Boolean, Number

function func(x) {
    return x + 1;
}

// will be transformed
function name() {
    function name1() {
        return [...a, ...b]
            .map((x, i) => x * i)
            .map(func)
            .join('--');
    }

    return name1();
}

// will not be transformed
const z = arr.map(func2).join();

const obj = {
    i: 1,
};
arr.map(function (x) {
    return x + this.i;
}, obj).join();
