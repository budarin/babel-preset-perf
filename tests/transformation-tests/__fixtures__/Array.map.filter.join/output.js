var { arrayMapFilterJoinHelper: _amfjh } = require('babel-preset-perf/dist/helpers/arrayMapFilterJoinHelper');
var {
    arrayMapFilterJoinHelperWithMapThis: _amfjhwmt,
} = require('babel-preset-perf/dist/helpers/arrayMapFilterJoinHelperWithMapThis');
var {
    arrayMapFilterJoinHelperWithFilterThis: _amfjhwft,
} = require('babel-preset-perf/dist/helpers/arrayMapFilterJoinHelperWithFilterThis');
var {
    arrayMapFilterJoinHelperWithMapAndFilterThis: _amfjhwmft,
} = require('babel-preset-perf/dist/helpers/arrayMapFilterJoinHelperWithMapAndFilterThis');
var x = _amfjhwmft(
    [1, 2, 3],
    function (x) {
        return x + this.i;
    },
    obj,
    function (x) {
        return x > this.i;
    },
    obj,
    ', ',
);
var x2 = _amfjhwft(
    [1, 2, 3],
    function (x) {
        return x + 1;
    },
    function (x) {
        return x > this.i;
    },
    obj,
);
var x1 = _amfjhwmt(
    [1, 2, 3],
    function (x) {
        return x + this.i;
    },
    obj,
    function (x) {
        return x > 1;
    },
    ', ',
);
var x3 = _amfjh(
    [1, 2, 3],
    String,
    function (x) {
        return x > 1;
    },
    ', ',
);