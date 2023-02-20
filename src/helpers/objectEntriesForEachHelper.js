'use strict';

// babel-preset-perf-ignore
function objectEntriesForEachHelper(obj, foreachPredicate) {
    var i = -1;
    var keys = Object.keys(obj);
    var len = keys.length;

    while (++i < len) {
        var key = keys[i];
        foreachPredicate([key, obj[key]], i);
    }
}

module.exports = { objectEntriesForEachHelper };
