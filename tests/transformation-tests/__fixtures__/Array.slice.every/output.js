var {
    arraySliceEveryHelperWithEveryThis: _asehwet,
} = require('babel-preset-perf/helpers/arraySliceEveryHelperWithEveryThis');
var { arraySliceEveryHelper: _aseh } = require('babel-preset-perf/helpers/arraySliceEveryHelper');
_aseh(nums, undefined, undefined, (x, i) => x > 1);
_aseh(nums, 1, undefined, (x, i) => x > 1);
_aseh(nums, 1, end, (x, i) => x > 1);
_aseh(nums, -3, undefined, (x, i) => x > 1);
_aseh(nums, 1, -1, (x, i) => x > 1);
_aseh(nums, -5, -1, (x, i) => x > 1);
var obj = {
    i: 1,
};
_asehwet(
    nums,
    start,
    end,
    function (x, i) {
        return x > this.i;
    },
    obj,
);