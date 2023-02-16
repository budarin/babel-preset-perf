'use strict';

// @babel-preset-perf-ignore
function arrayMapFilterJoinHelperWithFilterThis(
    arrayObject,
    mapPredicate,
    filterPredicate,
    filterThis,
    separator = ',',
) {
    var i = -1;
    var result = '';
    var len = arrayObject.length;

    while (++i < len && result.length === 0) {
        var item = mapPredicate(arrayObject[i], i);

        if (filterPredicate.call(filterThis, item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = mapPredicate(arrayObject[i], i);

        if (filterPredicate.call(filterThis, item, i)) {
            result = result + separator + String(item);
        }
    }

    return result;
}
module.exports = { arrayMapFilterJoinHelperWithFilterThis };
