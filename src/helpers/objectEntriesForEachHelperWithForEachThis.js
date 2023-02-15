'use strict';

function objectEntriesForEachHelperWithForEachThis(obj, foreachPredicate, forEachThis) {
    var i = -1;
    var keys = Object.keys(obj);
    var len = keys.length;

    while (++i < len) {
        var key = keys[i];
        foreachPredicate.call(forEachThis, [key, obj[key]], i);
    }
}

module.exports = { objectEntriesForEachHelperWithForEachThis };
