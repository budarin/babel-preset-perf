'use strict';

// @babel-preset-perf-ignore
function objectEntriesReduceHelper(obj, reducePredicate, initialValue) {
    var i = -1;
    var result = initialValue;
    var keys = Object.keys(obj);
    var len = keys.length;

    while (++i < len) {
        var key = keys[i];
        result = reducePredicate(result, [key, obj[key]], i);
    }

    return result;
}

module.exports = { objectEntriesReduceHelper };
