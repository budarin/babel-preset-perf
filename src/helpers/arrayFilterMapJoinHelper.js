'use strict';

function arrayFilterMapJoinHelper(arrayObject, filterPredicate, mapPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var foundCount = -1;
    var len = arrayObject.length;

    while (++i < len && result.length === 0) {
        var item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result = String(mapPredicate(item, ++foundCount));
        }
    }

    i--;
    while (++i < len) {
        var item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result = result + separator + String(mapPredicate(item, ++foundCount));
        }
    }

    return result;
}

module.exports = { arrayFilterMapJoinHelper };
