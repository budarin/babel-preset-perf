'use strict';

// @babel-preset-perf-ignore
function arrayMapHelper(arrayObject, mapPredicate) {
    var i = -1;
    var len = arrayObject.length;
    var result = new Array(len);

    while (++i < len) {
        result[i] = mapPredicate(arrayObject[i], i);
    }

    return result;
}

module.exports = { arrayMapHelper };
