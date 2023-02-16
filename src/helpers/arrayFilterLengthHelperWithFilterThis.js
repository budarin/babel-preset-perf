'use strict';

// @babel-preset-perf-ignore
function arrayFilterLengthHelperWithFilterThis(arrayObject, filterPredicate, filterThis) {
    var i = -1;
    var result = 0;
    var len = arrayObject.length;

    while (++i < len) {
        if (filterPredicate.call(filterThis, arrayObject[i], i)) {
            result++;
        }
    }
    return result;
}

module.exports = { arrayFilterLengthHelperWithFilterThis };
