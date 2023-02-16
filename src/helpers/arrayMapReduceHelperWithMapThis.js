'use strict';

// @babel-preset-perf-ignore
function arrayMapReduceHelperWithMapThis(arrayObject, mapPredicate, mapThis, reducePredicate, initialValue) {
    var i = -1;
    var result = initialValue;
    var len = arrayObject.length;

    while (++i < len) {
        result = reducePredicate(result, mapPredicate.call(mapThis, arrayObject[i], i), i);
    }

    return result;
}

module.exports = { arrayMapReduceHelperWithMapThis };
