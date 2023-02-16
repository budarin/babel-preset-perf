'use strict';

// @babel-preset-perf-ignore
function arrayFilterLengthHelper(arrayObject, filterPredicate) {
    var i = -1;
    var result = 0;
    var len = arrayObject.length;

    while (++i < len) {
        if (filterPredicate(arrayObject[i], i)) {
            result++;
        }
    }
    return result;
}

module.exports = { arrayFilterLengthHelper };
