'use strict';

// @babel-preset-perf-ignore
function arrayMapFilterJoinHelperWithMapThis(array, mapPredicate, mapThis, filterPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var len = array.length;

    while (++i < len && result.length === 0) {
        var item = mapPredicate.call(mapThis, array[i], i);

        if (filterPredicate(item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = mapPredicate.call(mapThis, array[i], i);

        if (filterPredicate(item, i)) {
            result = result + separator + String(item);
        }
    }

    return result;
}
module.exports = { arrayMapFilterJoinHelperWithMapThis };
