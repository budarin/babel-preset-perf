'use strict';

// @babel-preset-perf-ignore
function arraySliceMapJoinHelper(array, start = 0, end = array.length, mapPredicate, separator = ',') {
    var result = '';

    if (start > -1 && end > -1) {
        result = String(mapPredicate(array[start], start));

        var i = start;
        while (++i < end) {
            result = result + separator + String(mapPredicate(array[i], i - start));
        }
    } else {
        var len = array.length;
        var _start = start > -1 ? start : len + start;
        var _end = end >= 0 ? end : len + end;

        result = String(mapPredicate(array[_start], _start));

        var i = _start;
        while (++i < _end) {
            result = result + separator + String(mapPredicate(array[i], i - _start));
        }
    }

    return result;
}

module.exports = { arraySliceMapJoinHelper };
