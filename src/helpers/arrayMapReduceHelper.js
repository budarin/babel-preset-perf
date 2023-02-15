'use strict';

function arrayMapReduceHelper(arrayObject, mapPredicate, reducePredicate, initialValue) {
    var i = -1;
    var result = initialValue;
    var len = arrayObject.length;

    while (++i < len) {
        result = reducePredicate(result, mapPredicate(arrayObject[i], i), i);
    }

    return result;
}

module.exports = { arrayMapReduceHelper };
