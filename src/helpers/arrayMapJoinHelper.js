'use strict';

// @babel-preset-perf-ignore
function arrayMapJoinHelper(array, mapPredicate, separator = ',') {
    var i = 0;
    var len = array.length;
    var result = String(mapPredicate(array[0], 0));

    while (++i < len) {
        result = result + separator + String(mapPredicate(array[i], i));
    }

    return result;
}

module.exports = { arrayMapJoinHelper };
