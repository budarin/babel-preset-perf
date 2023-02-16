'use strict';

// @babel-preset-perf-ignore
function arrayFilterMapHelperWithMapThis(arrayObject, filterPredicate, mapPredicate, mapThis) {
    var i = -1;
    var foundCount = 0;
    var result = [];
    var len = arrayObject.length;

    while (++i < len) {
        var item = arrayObject[i];

        if (filterPredicate(item, i)) {
            result.push(mapPredicate.call(mapThis, item, foundCount));
            foundCount++;
        }
    }

    return result;
}

module.exports = { arrayFilterMapHelperWithMapThis };
