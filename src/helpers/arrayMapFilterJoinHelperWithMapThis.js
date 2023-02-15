'use strict';

function arrayMapFilterJoinHelperWithMapThis(arrayObject, mapPredicate, mapThis, filterPredicate, separator = ',') {
    var i = -1;
    var result = '';
    var len = arrayObject.length;

    while (++i < len && result.length === 0) {
        var item = mapPredicate.call(mapThis, arrayObject[i], i);

        if (filterPredicate(item, i)) {
            result = String(item);
        }
    }

    i--;
    while (++i < len) {
        var item = mapPredicate.call(mapThis, arrayObject[i], i);

        if (filterPredicate(item, i)) {
            result = result + separator + String(item);
        }
    }

    return result;
}
module.exports = { arrayMapFilterJoinHelperWithMapThis };
