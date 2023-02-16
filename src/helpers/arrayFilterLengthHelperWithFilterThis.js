'use strict';

// @babel-preset-perf-ignore
function arrayFilterLengthHelperWithFilterThis(array, filterPredicate, filterThis) {
    var i = -1;
    var result = 0;
    var len = array.length;

    while (++i < len) {
        if (filterPredicate.call(filterThis, array[i], i)) {
            result++;
        }
    }
    return result;
}

module.exports = { arrayFilterLengthHelperWithFilterThis };
