var { arrayFilterJoinHelper: _afjh } = require('babel-preset-perf/helpers/arrayFilterJoinHelper');
var {
    arrayFilterJoinHelperWithFilterThis: _afjhwft,
} = require('babel-preset-perf/helpers/arrayFilterJoinHelperWithFilterThis');
var arr = ['  1', '2', '3   '];
var obj = {
    i: 1,
    j: 1,
};
_afjhwft(
    arr,
    function (x) {
        return x.length > this.j;
    },
    obj,
    ' ',
);
_afjh(arr, (x) => x.length > 1, ' = ');