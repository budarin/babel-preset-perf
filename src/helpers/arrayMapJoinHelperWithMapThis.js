'use strict';

// babel-preset-perf-ignore
function arrayMapJoinHelperWithMapThis(array, mapPredicate, mapThis, separator = ',') {
    var i = 0;
    var len = array.length;
    var result = mapPredicate.call(mapThis, array[0], 0) || '';

    while (++i < len) {
        result = result + separator + String(mapPredicate.call(mapThis, array[i], i));
    }

    return result;
}

module.exports = { arrayMapJoinHelperWithMapThis };
