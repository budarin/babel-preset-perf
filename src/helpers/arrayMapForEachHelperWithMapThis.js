'use strict';

function arrayMapForEachHelperWithMapThis(array, mapPredicate, mapThis, forEacPredicate) {
    var i = -1;
    var len = array.length;

    while (++i < len) {
        forEacPredicate(mapPredicate.call(mapThis, array[i], i), i);
    }
}

module.exports = { arrayMapForEachHelperWithMapThis };
