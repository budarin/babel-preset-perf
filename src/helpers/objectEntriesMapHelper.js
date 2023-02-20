'use strict';

// babel-preset-perf-ignore
function objectEntriesMapHelper(obj, mapPredicate) {
    var i = -1;
    var keys = Object.keys(obj);
    var len = keys.length;
    var result = Array(len);

    while (++i < len) {
        var key = keys[i];
        result[i] = mapPredicate([key, obj[key]], i);
    }

    return result;
}

module.exports = { objectEntriesMapHelper };
