'use strict';

// @babel-preset-perf-ignore
function arrayFilterMapHelperWithFilterThis(arrayObject, filterPredicate, filterThis, mapPredicate) {
    var i = -1;
    var foundCount = 0;
    var result = [];
    var len = arrayObject.length;

    while (++i < len) {
        var item = arrayObject[i];

        if (filterPredicate.call(filterThis, item, i)) {
            result.push(mapPredicate(item, foundCount));
            foundCount++;
        }
    }

    return result;
}

module.exports = { arrayFilterMapHelperWithFilterThis };
