'use strict';

function arrayMapJoinHelper(arrayObject, mapPredicate, separator = ',') {
    var i = 0;
    var len = arrayObject.length;
    var result = String(mapPredicate(arrayObject[0], 0));

    while (++i < len) {
        result = result + separator + String(mapPredicate(arrayObject[i], i));
    }

    return result;
}

module.exports = { arrayMapJoinHelper };
