var {
    arraySliceMapJoinHelperWithMapThis: _asmjhwmt,
} = require('babel-preset-perf/dist/helpers/arraySliceMapJoinHelperWithMapThis');
var { arraySliceMapJoinHelper: _asmjh } = require('babel-preset-perf/dist/helpers/arraySliceMapJoinHelper');
var start = 1;
var end = 3;
var obj = {
    i: 1,
};
var arr = [1, 2, 3, 4, 5];
_asmjh(arr, start, end, (x, i) => x + i, ' ');
_asmjh(arr, undefined, undefined, (x, i) => x + i, ' ');
_asmjh(arr, 1, undefined, (x, i) => x + i, ' ');
_asmjh(arr, -1, undefined, (x, i) => x + i, ' ');
_asmjh(arr, -3, -1, (x, i) => x + i, ' ');
_asmjh(arr, 0, -1, (x, i) => x + i, ' ');
_asmjhwmt(
    arr,
    start,
    end,
    function (x, i) {
        return x + this.i;
    },
    obj,
    ' ',
);