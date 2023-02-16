'use strict';

// @babel-preset-perf-ignore
function arrayFilterMapHelper(array, filterPredicate, mapPredicate) {
    var i = -1;
    var foundCount = 0;
    var result = [];
    var len = array.length;

    while (++i < len) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            result.push(mapPredicate(item, foundCount));
            foundCount++;
        }
    }

    return result;
}

module.exports = { arrayFilterMapHelper };
