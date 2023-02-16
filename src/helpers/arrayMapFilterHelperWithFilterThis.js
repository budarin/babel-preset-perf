'use strict';

// @babel-preset-perf-ignore
function arrayMapFilterHelperWithFilterThis(array, mapPredicate, filterPredicate, filterThis) {
    var i = -1;
    var result = [];
    var len = array.length;

    while (++i < len) {
        var item = mapPredicate(array[i], i);

        if (filterPredicate.call(filterThis, item, i)) {
            result.push(item);
        }
    }

    return result;
}

module.exports = { arrayMapFilterHelperWithFilterThis };
