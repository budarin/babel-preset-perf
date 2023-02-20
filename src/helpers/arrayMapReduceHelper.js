'use strict';

// babel-preset-perf-ignore
function arrayMapReduceHelper(array, mapPredicate, reducePredicate, initialValue) {
    var i = -1;
    var result = initialValue;
    var len = array.length;

    while (++i < len) {
        result = reducePredicate(result, mapPredicate(array[i], i), i);
    }

    return result;
}

module.exports = { arrayMapReduceHelper };
