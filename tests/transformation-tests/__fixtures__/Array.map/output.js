var { arrayMapHelper: _amh } = require('babel-preset-perf/helpers/arrayMapHelper');
var { arrayMapHelperWithMapThis: _amhwmt } = require('babel-preset-perf/helpers/arrayMapHelperWithMapThis');
var x = _amhwmt(
    arr,
    function (x) {
        return x + this.i;
    },
    obj,
);
var x2 = _amh(arr, function (x) {
    return x + 1;
});