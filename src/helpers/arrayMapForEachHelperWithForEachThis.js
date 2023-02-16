'use strict';

// @babel-preset-perf-ignore
function arrayMapForEachHelperWithForEachThis(array, mapPredicate, forEacPredicate, forEachThis) {
    var i = -1;
    var len = array.length;

    while (++i < len) {
        forEacPredicate.call(forEachThis, mapPredicate(array[i], i), i);
    }
}

module.exports = { arrayMapForEachHelperWithForEachThis };
