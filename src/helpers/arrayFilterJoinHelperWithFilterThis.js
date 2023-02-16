'use strict';

// @babel-preset-perf-ignore
function arrayFilterJoinHelperWithFilterThis(array, filterPredicate, filterThis, separator = ',') {
    let i = -1;
    let result = '';
    const len = array.length;

    while (++i < len && result.length === 0) {
        var item = array[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = array[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result = result + separator + String(item);
        }
    }
    return result;
}

module.exports = { arrayFilterJoinHelperWithFilterThis };
