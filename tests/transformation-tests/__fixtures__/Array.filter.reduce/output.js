var {
    arrayFilterReduceHelperWithFilterThis: _afrhwft,
} = require('babel-preset-perf/dist/helpers/arrayFilterReduceHelperWithFilterThis');
var { arrayFilterReduceHelper: _afrh } = require('babel-preset-perf/dist/helpers/arrayFilterReduceHelper');
var r = _afrh(
    arr,
    (x) => x > 1,
    (acc, x) => acc + x,
    0,
);
var r1 = _afrhwft(
    arr,
    function (x) {
        return x > this.i;
    },
    obj,
    (acc, x) => {
        return acc + x;
    },
    0,
);