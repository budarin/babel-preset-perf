'use strict';

// @babel-preset-perf-ignore
function arrayFilterJoinHelper(arrayObject, filterPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var len = arrayObject.length;

    while (++i < len && result.length === 0) {
        var item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result = result + separator + String(item);
        }
    }
    return result;
}

module.exports = { arrayFilterJoinHelper };
