'use strict';

// @babel-preset-perf-ignore
function arrayMapHelper(array, mapPredicate) {
    var i = -1;
    var len = array.length;
    var result = new Array(len);

    while (++i < len) {
        result[i] = mapPredicate(array[i], i);
    }

    return result;
}

module.exports = { arrayMapHelper };
