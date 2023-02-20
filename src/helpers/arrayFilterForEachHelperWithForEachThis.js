'use strict';

// babel-preset-perf-ignore
function arrayFilterForEachHelperWithForEachThis(array, filterPredicate, forEachPredicate, forEachThis) {
    let i = -1;
    let foundCount = -1;
    const len = array.length;

    while (++i < len) {
        const item = array[i];

        if (filterPredicate(item, i)) {
            forEachPredicate.call(forEachThis, item, ++foundCount);
        }
    }
}

module.exports = { arrayFilterForEachHelperWithForEachThis };
