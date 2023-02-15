var { arrayMapJoinHelperWithMapThis: _amjhwmt } = require('babel-preset-perf/helpers/arrayMapJoinHelperWithMapThis');
var { arrayMapJoinHelper: _amjh } = require('babel-preset-perf/helpers/arrayMapJoinHelper');
var arr = [1, 2, 3];
var x = _amjh(
    arr,
    function (x) {
        return x + 1;
    },
    ', ',
);
var x1 = _amjhwmt(
    arr,
    function (x) {
        return x + this.i;
    },
    obj,
    ', ',
);
var x3 = _amjh(arr, String, ', ');