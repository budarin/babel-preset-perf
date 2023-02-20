'use strict';

// babel-preset-perf-ignore
function arrayFilterMapHelperWithFilterAndMapThis(array, filterPredicate, filterThis, mapPredicate, mapThis) {
    var i = -1;
    var foundCount = 0;
    var result = [];
    var len = array.length;

    while (++i < len) {
        var item = array[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result.push(mapPredicate.call(mapThis, item, foundCount));
            foundCount++;
        }
    }

    return result;
}

module.exports = { arrayFilterMapHelperWithFilterAndMapThis };
