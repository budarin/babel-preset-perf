'use strict';

function arrayMapForEachHelperWithMapAndForEachThis(array, mapPredicate, mapThis, forEacPredicate, forEachThis) {
    var i = -1;
    var len = array.length;

    while (++i < len) {
        forEacPredicate.call(forEachThis, mapPredicate.call(mapThis, array[i], i), i);
    }
}

module.exports = { arrayMapForEachHelperWithMapAndForEachThis };
