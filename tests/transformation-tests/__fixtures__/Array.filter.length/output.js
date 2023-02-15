var {
    arrayFilterLengthHelperWithFilterThis: _aflhwft,
} = require('babel-preset-perf/dist/helpers/arrayFilterLengthHelperWithFilterThis');
var { arrayFilterLengthHelper: _aflh } = require('babel-preset-perf/dist/helpers/arrayFilterLengthHelper');
_aflh(arr, (x) => x > 0.5);
var obj = {
    i: 1,
};
_aflhwft(
    arr,
    function (x) {
        return x > this.j;
    },
    obj,
);