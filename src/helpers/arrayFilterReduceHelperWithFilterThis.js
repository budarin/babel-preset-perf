'use strict';

// babel-preset-perf-ignore
function arrayFilterReduceHelperWithFilterThis(array, filterPredicate, filterThis, reducePredicate, initialValue) {
    var i = -1;
    var found = -1;
    var result = initialValue;
    var len = array.length;

    while (++i < len) {
        var item = array[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result = reducePredicate(result, item, ++found);
        }
    }

    return result;
}

module.exports = { arrayFilterReduceHelperWithFilterThis };
