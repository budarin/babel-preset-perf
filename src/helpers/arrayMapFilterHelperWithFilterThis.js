'use strict';

function arrayMapFilterHelperWithFilterThis(arrayObject, mapPredicate, filterPredicate, filterThis) {
    var i = -1;
    var result = [];
    var len = arrayObject.length;

    while (++i < len) {
        var item = mapPredicate(arrayObject[i], i);

        if (filterPredicate.call(filterThis, item, i)) {
            result.push(item);
        }
    }

    return result;
}

module.exports = { arrayMapFilterHelperWithFilterThis };
