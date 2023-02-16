'use strict';

// @babel-preset-perf-ignore
function arrayMapFilterHelper(array, mapPredicate, filterPredicate) {
    var i = -1;
    var result = [];
    var len = array.length;

    while (++i < len) {
        var item = mapPredicate(array[i], i);

        if (filterPredicate(item, i)) {
            result.push(item);
        }
    }

    return result;
}

module.exports = { arrayMapFilterHelper };
