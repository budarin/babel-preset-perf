'use strict';

// @babel-preset-perf-ignore
function arrayMapHelperWithMapThis(arrayObject, mapPredicate, mapThis) {
    var i = -1;
    var len = arrayObject.length;
    var result = new Array(len);

    while (++i < len) {
        result[i] = mapPredicate.call(mapThis, arrayObject[i], i);
    }

    return result;
}

module.exports = { arrayMapHelperWithMapThis };
