'use strict';

// babel-preset-perf-ignore
function arrayFilterJoinHelper(array, filterPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var len = array.length;

    while (++i < len && result.length === 0) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            result = result + separator + String(item);
        }
    }
    return result;
}

module.exports = { arrayFilterJoinHelper };
