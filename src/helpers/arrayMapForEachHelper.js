'use strict';

function arrayMapForEachHelper(array, mapPredicate, forEacPredicate) {
    var i = -1;
    var len = array.length;

    while (++i < len) {
        forEacPredicate(mapPredicate(array[i], i), i);
    }
}

module.exports = { arrayMapForEachHelper };
