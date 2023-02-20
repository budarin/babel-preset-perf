'use strict';

// babel-preset-perf-ignore
function arrayFilterReduceHelper(array, filterPredicate, reducePredicate, initialValue) {
    var i = -1;
    var found = -1;
    var result = initialValue;
    var len = array.length;

    while (++i < len) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            result = reducePredicate(result, item, ++found);
        }
    }

    return result;
}

module.exports = { arrayFilterReduceHelper };
