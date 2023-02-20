'use strict';

// babel-preset-perf-ignore
function arrayMapFilterHelperWithMapThis(array, mapPredicate, mapThis, filterPredicate) {
    var i = -1;
    var result = [];
    var len = array.length;

    while (++i < len) {
        var item = mapPredicate.call(mapThis, array[i], i);

        if (filterPredicate(item, i)) {
            result.push(item);
        }
    }

    return result;
}

module.exports = { arrayMapFilterHelperWithMapThis };
