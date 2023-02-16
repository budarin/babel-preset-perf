'use strict';

// @babel-preset-perf-ignore
function arrayFilterLengthHelper(array, filterPredicate) {
    var i = -1;
    var result = 0;
    var len = array.length;

    while (++i < len) {
        if (filterPredicate(array[i], i)) {
            result++;
        }
    }
    return result;
}

module.exports = { arrayFilterLengthHelper };
