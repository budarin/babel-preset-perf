'use strict';

// @babel-preset-perf-ignore
function arrayFilterJoinHelperWithFilterThis(arrayObject, filterPredicate, filterThis, separator = ',') {
    let i = -1;
    let result = '';
    const len = arrayObject.length;

    while (++i < len && result.length === 0) {
        var item = arrayObject[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = arrayObject[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result = result + separator + String(item);
        }
    }
    return result;
}

module.exports = { arrayFilterJoinHelperWithFilterThis };
