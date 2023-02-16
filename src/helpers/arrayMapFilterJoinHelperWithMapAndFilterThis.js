'use strict';

// @babel-preset-perf-ignore
function arrayMapFilterJoinHelperWithMapAndFilterThis(
    array,
    mapPredicate,
    mapThis,
    filterPredicate,
    filterThis,
    separator = ',',
) {
    var i = -1;
    var result = '';
    var len = array.length;

    while (++i < len && result.length === 0) {
        var item = mapPredicate.call(mapThis, array[i], i);

        if (filterPredicate.call(filterThis, item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = mapPredicate.call(mapThis, array[i], i);

        if (filterPredicate.call(filterThis, item, i)) {
            result = result + separator + String(item);
        }
    }

    return result;
}
module.exports = { arrayMapFilterJoinHelperWithMapAndFilterThis };
