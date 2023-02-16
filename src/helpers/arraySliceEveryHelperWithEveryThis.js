'use strict';

// @babel-preset-perf-ignore
function arraySliceEveryHelperWithEveryThis(array, start = 0, end = array.length, everyPredicate, everyThis) {
    if (start > -1 && end > -1) {
        var i = -1;
        while (++i < end) {
            if (everyPredicate.call(everyThis, array[i], i) === false) {
                return false;
            }
        }
    } else {
        var len = array.length;
        var _start = start > -1 ? start : len + start;
        var _end = end >= 0 ? end : len + end;
        var i = _start;

        while (++i < _end) {
            if (everyPredicate.call(everyThis, array[i], i - _start) === false) {
                return false;
            }
        }
    }

    return true;
}

module.exports = { arraySliceEveryHelperWithEveryThis };
