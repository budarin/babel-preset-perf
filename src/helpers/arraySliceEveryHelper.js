'use strict';

// @babel-preset-perf-ignore
function arraySliceEveryHelper(arrayObject, start = 0, end = arrayObject.length, everyPredicate) {
    if (start > -1 && end > -1) {
        var i = -1;
        while (++i < end) {
            if (everyPredicate(arrayObject[i], i) === false) {
                return false;
            }
        }
    } else {
        var len = arrayObject.length;
        var _start = start > -1 ? start : len + start;
        var _end = end >= 0 ? end : len + end;
        var i = _start;

        while (++i < _end) {
            if (everyPredicate(arrayObject[i], i - _start) === false) {
                return false;
            }
        }
    }

    return true;
}

module.exports = { arraySliceEveryHelper };
