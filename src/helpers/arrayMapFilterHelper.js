'use strict';

function arrayMapFilterHelper(arrayObject, mapPredicate, filterPredicate) {
    var i = -1;
    var result = [];
    var len = arrayObject.length;

    while (++i < len) {
        var item = mapPredicate(arrayObject[i], i);

        if (filterPredicate(item, i)) {
            result.push(item);
        }
    }

    return result;
}

module.exports = { arrayMapFilterHelper };
