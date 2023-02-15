'use strict';

function arrayFilterForEachHelperWithFilterAndForEachThis(
    array,
    filterPredicate,
    filterThis,
    forEachPredicate,
    forEachThis,
) {
    let i = -1;
    let foundCount = -1;
    const len = array.length;

    while (++i < len) {
        const item = array[i];

        if (filterPredicate.call(filterThis, item, i)) {
            forEachPredicate.call(forEachThis, item, ++foundCount);
        }
    }
}

module.exports = { arrayFilterForEachHelperWithFilterAndForEachThis };
