'use strict';

// babel-preset-perf-ignore
function objectEntriesFilterMapJoinHelper(obj, filterPredicate, mapPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var foundCount = -1;

    var keys = Object.keys(obj);
    var len = keys.length;

    while (++i < len && result.length === 0) {
        var key = keys[i];
        var entry = [key, obj[key]];

        if (filterPredicate(entry, i)) {
            result = String(mapPredicate(entry, ++foundCount));
        }
    }

    i--;
    while (++i < len) {
        var key = keys[i];
        var entry = [key, obj[key]];

        if (filterPredicate(entry, i)) {
            result = result + separator + String(mapPredicate(entry, ++foundCount));
        }
    }

    return result;
}

module.exports = { objectEntriesFilterMapJoinHelper };
