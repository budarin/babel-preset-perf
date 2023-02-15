'use strict';

function arrayMapJoinHelperWithMapThis(arrayObject, mapPredicate, mapThis, separator = ',') {
    var i = 0;
    var len = arrayObject.length;
    var result = String(mapPredicate.call(mapThis, arrayObject[0], 0));

    while (++i < len) {
        result = result + separator + String(mapPredicate.call(mapThis, arrayObject[i], i));
    }

    return result;
}

module.exports = { arrayMapJoinHelperWithMapThis };
