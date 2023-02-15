'use strict';

function objectEntriesFilterMapJoinHelperWithFilterAndMapThis(
    obj,
    filterPredicate,
    filterThis,
    mapPredicate,
    mapThis,
    separator = ',',
) {
    var i = -1;
    var result = '';
    var foundCount = -1;

    var keys = Object.keys(obj);
    var len = keys.length;

    while (++i < len && result.length === 0) {
        var key = keys[i];
        var entry = [key, obj[key]];

        if (filterPredicate.call(filterThis, entry, i)) {
            result = String(mapPredicate.call(mapThis, entry, ++foundCount));
        }
    }

    i--;
    while (++i < len) {
        var key = keys[i];
        var entry = [key, obj[key]];

        if (filterPredicate.call(filterThis, entry, i)) {
            result = result + separator + String(mapPredicate.call(mapThis, entry, ++foundCount));
        }
    }

    return result;
}

module.exports = { objectEntriesFilterMapJoinHelperWithFilterAndMapThis };
