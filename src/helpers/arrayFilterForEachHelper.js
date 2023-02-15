'use strict';

function arrayFilterForEachHelper(array, filterPredicate, forEachPredicate) {
    var i = -1;
    var foundCount = -1;
    var len = array.length;

    while (++i < len) {
        var item = array[i];

        if (filterPredicate(item, i)) {
            forEachPredicate(item, ++foundCount);
        }
    }
}

module.exports = { arrayFilterForEachHelper };
