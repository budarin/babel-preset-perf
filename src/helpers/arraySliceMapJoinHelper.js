'use strict';

function arraySliceMapJoinHelper(arrayObject, start = 0, end = arrayObject.length, mapPredicate, separator = ',') {
    var result = '';

    if (start > -1 && end > -1) {
        result = String(mapPredicate(arrayObject[start], start));

        var i = start;
        while (++i < end) {
            result = result + separator + String(mapPredicate(arrayObject[i], i - start));
        }
    } else {
        var len = arrayObject.length;
        var _start = start > -1 ? start : len + start;
        var _end = end >= 0 ? end : len + end;

        result = String(mapPredicate(arrayObject[_start], _start));

        var i = _start;
        while (++i < _end) {
            result = result + separator + String(mapPredicate(arrayObject[i], i - _start));
        }
    }

    return result;
}

module.exports = { arraySliceMapJoinHelper };
