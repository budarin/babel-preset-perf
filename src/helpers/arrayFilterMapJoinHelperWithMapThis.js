'use strict';

// babel-preset-perf-ignore
function arrayFilterMapJoinHelperWithMapThis(array, filterPredicate, mapPredicate, mapThis, separator = ',') {
    var i = -1;
    var result = '';
    var foundCount = -1;
    var len = array.length;

    while (++i < len && result.length === 0) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            result = String(mapPredicate.call(mapThis, item, ++foundCount));
        }
    }

    i--;
    while (++i < len) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            result = result + separator + String(mapPredicate.call(mapThis, item, ++foundCount));
        }
    }

    return result;
}

module.exports = { arrayFilterMapJoinHelperWithMapThis };
