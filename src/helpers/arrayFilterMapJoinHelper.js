'use strict';

// @babel-preset-perf-ignore
function arrayFilterMapJoinHelper(array, filterPredicate, mapPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var foundCount = -1;
    var len = array.length;

    while (++i < len && result.length === 0) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            result = String(mapPredicate(item, ++foundCount));
        }
    }

    i--;
    while (++i < len) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            result = result + separator + String(mapPredicate(item, ++foundCount));
        }
    }

    return result;
}

module.exports = { arrayFilterMapJoinHelper };
