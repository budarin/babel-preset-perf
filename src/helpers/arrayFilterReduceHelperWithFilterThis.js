'use strict';

// @babel-preset-perf-ignore
function arrayFilterReduceHelperWithFilterThis(
    arrayObject,
    filterPredicate,
    filterThis,
    reducePredicate,
    initialValue,
) {
    var i = -1;
    var found = -1;
    var result = initialValue;
    var len = arrayObject.length;

    while (++i < len) {
        var item = arrayObject[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result = reducePredicate(result, item, ++found);
        }
    }

    return result;
}

module.exports = { arrayFilterReduceHelperWithFilterThis };
