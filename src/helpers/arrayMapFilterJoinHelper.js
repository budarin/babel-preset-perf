'use strict';

// babel-preset-perf-ignore
function arrayMapFilterJoinHelper(array, mapPredicate, filterPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var len = array.length;

    while (++i < len && result.length === 0) {
        var item = mapPredicate(array[i], i);

        if (filterPredicate(item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = mapPredicate(array[i], i);

        if (filterPredicate(item, i)) {
            result = result + separator + String(item);
        }
    }

    return result;
}
module.exports = { arrayMapFilterJoinHelper };
