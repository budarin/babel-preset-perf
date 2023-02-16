'use strict';

// @babel-preset-perf-ignore
function arrayMapHelperWithMapThis(array, mapPredicate, mapThis) {
    var i = -1;
    var len = array.length;
    var result = new Array(len);

    while (++i < len) {
        result[i] = mapPredicate.call(mapThis, array[i], i);
    }

    return result;
}

module.exports = { arrayMapHelperWithMapThis };
