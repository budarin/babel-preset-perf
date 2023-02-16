'use strict';

// @babel-preset-perf-ignore
function arrayFilterForEachHelperWithFilterThis(array, filterPredicate, filterThis, forEachPredicate) {
    let i = -1;
    let foundCount = -1;
    const len = array.length;

    while (++i < len) {
        const item = array[i];

        if (filterPredicate.call(filterThis, item, i)) {
            forEachPredicate(item, ++foundCount);
        }
    }
}

module.exports = { arrayFilterForEachHelperWithFilterThis };
