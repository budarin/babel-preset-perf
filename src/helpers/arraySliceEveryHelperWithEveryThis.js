'use strict';

function arraySliceEveryHelperWithEveryThis(
    arrayObject,
    start = 0,
    end = arrayObject.length,
    everyPredicate,
    everyThis,
) {
    if (start > -1 && end > -1) {
        var i = -1;
        while (++i < end) {
            if (everyPredicate.call(everyThis, arrayObject[i], i) === false) {
                return false;
            }
        }
    } else {
        var len = arrayObject.length;
        var _start = start > -1 ? start : len + start;
        var _end = end >= 0 ? end : len + end;
        var i = _start;

        while (++i < _end) {
            if (everyPredicate.call(everyThis, arrayObject[i], i - _start) === false) {
                return false;
            }
        }
    }

    return true;
}

module.exports = { arraySliceEveryHelperWithEveryThis };
