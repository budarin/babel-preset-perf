var { arrayMapFilterHelper: _amfh } = require('babel-preset-perf/dist/helpers/arrayMapFilterHelper');
var {
    arrayMapFilterHelperWithMapThis: _amfhwmt,
} = require('babel-preset-perf/dist/helpers/arrayMapFilterHelperWithMapThis');
var {
    arrayMapFilterHelperWithFilterThis: _amfhwft,
} = require('babel-preset-perf/dist/helpers/arrayMapFilterHelperWithFilterThis');
var {
    arrayMapFilterHelperWithMapAndFilterThis: _amfhwfmt,
} = require('babel-preset-perf/dist/helpers/arrayMapFilterHelperWithMapAndFilterThis');
var x = _amfhwfmt(
    [1, 2, 3],
    function (x) {
        return x + this.i;
    },
    obj,
    function (x) {
        return x > this.i;
    },
    obj,
);
var x2 = _amfhwft(
    [1, 2, 3],
    function (x) {
        return x + 1;
    },
    function (x) {
        return x > this.i;
    },
    obj,
);
var x1 = _amfhwmt(
    [1, 2, 3],
    function (x) {
        return x + this.i;
    },
    obj,
    function (x) {
        return x > 1;
    },
);
var x3 = _amfh([1, 2, 3], String, function (x) {
    return x > 1;
});