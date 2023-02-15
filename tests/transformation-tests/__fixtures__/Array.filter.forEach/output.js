var { arrayMapForEachHelper: _amfeh } = require('babel-preset-perf/dist/helpers/arrayMapForEachHelper');
var {
    arrayMapForEachHelperWithMapThis: _amfehwmt,
} = require('babel-preset-perf/dist/helpers/arrayMapForEachHelperWithMapThis');
var {
    arrayMapForEachHelperWithForEachThis: _amfehwfet,
} = require('babel-preset-perf/dist/helpers/arrayMapForEachHelperWithForEachThis');
var {
    arrayMapForEachHelperWithMapAndForEachThis: _amfehwmfet,
} = require('babel-preset-perf/dist/helpers/arrayMapForEachHelperWithMapAndForEachThis');
var arr = [1, 2, 3];
var obj = {
    i: 1,
};
_amfehwmfet(
    arr,
    function (x) {
        return x + this.i;
    },
    obj,
    function (x) {
        r1 = r1 + x + this.i;
    },
    obj,
);
_amfehwfet(
    arr,
    function (x) {
        return x;
    },
    function (x) {
        r1 = r1 + x + this.i;
    },
    obj,
);
_amfehwmt(
    arr,
    function (x) {
        return x + this.i;
    },
    obj,
    function (x) {
        r1 = r1 + x;
    },
);
_amfeh(
    arr,
    (x) => x,
    (x) => {
        r1 = r1 + x;
    },
);