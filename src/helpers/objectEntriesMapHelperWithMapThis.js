'use strict';

function objectEntriesMapHelperWithMapThis(obj, mapPredicate, mapThis) {
    var i = -1;
    var keys = Object.keys(obj);
    var len = keys.length;
    var result = Array(len);

    while (++i < len) {
        var key = keys[i];
        result[i] = mapPredicate.call(mapThis, [key, obj[key]], i);
    }

    return result;
}

module.exports = { objectEntriesMapHelperWithMapThis };
