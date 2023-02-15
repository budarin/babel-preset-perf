var { arrayMapReduceHelper: _amrh } = require('babel-preset-perf/dist/helpers/arrayMapReduceHelper');
var {
    arrayMapReduceHelperWithMapThis: _amrhwmt,
} = require('babel-preset-perf/dist/helpers/arrayMapReduceHelperWithMapThis');
var arr = [1, 2, 3];
var x2 = _amrhwmt(
    arr,
    function (x) {
        return x + this.i;
    },
    obj,
    (acc, x) => acc + x,
    0,
);
var x = _amrh(arr, String, (acc, x) => acc + x.length, 0);
var x1 = _amrh(
    arr,
    function (x) {
        return x + 1;
    },
    (acc, x) => acc + x,
    0,
);