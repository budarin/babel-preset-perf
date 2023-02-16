'use strict';

// @babel-preset-perf-ignore
function arrayFilterMapJoinHelperWithFilterThis(array, filterPredicate, filterThis, mapPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var foundCount = -1;
    var len = array.length;

    while (++i < len && result.length === 0) {
        var item = array[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result = String(mapPredicate(item, ++foundCount));
        }
    }

    i--;
    while (++i < len) {
        var item = array[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result = result + separator + String(mapPredicate(item, ++foundCount));
        }
    }

    return result;
}

module.exports = { arrayFilterMapJoinHelperWithFilterThis };
