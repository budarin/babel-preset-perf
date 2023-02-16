'use strict';

// @babel-preset-perf-ignore
function arrayMapReduceHelperWithMapThis(array, mapPredicate, mapThis, reducePredicate, initialValue) {
    var i = -1;
    var result = initialValue;
    var len = array.length;

    while (++i < len) {
        result = reducePredicate(result, mapPredicate.call(mapThis, array[i], i), i);
    }

    return result;
}

module.exports = { arrayMapReduceHelperWithMapThis };
