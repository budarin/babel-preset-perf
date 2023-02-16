'use strict';

// @babel-preset-perf-ignore
function arrayMapFilterHelperWithMapThis(arrayObject, mapPredicate, mapThis, filterPredicate) {
    var i = -1;
    var result = [];
    var len = arrayObject.length;

    while (++i < len) {
        var item = mapPredicate.call(mapThis, arrayObject[i], i);

        if (filterPredicate(item, i)) {
            result.push(item);
        }
    }

    return result;
}

module.exports = { arrayMapFilterHelperWithMapThis };
