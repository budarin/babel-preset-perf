'use strict';

// @babel-preset-perf-ignore
function arraySliceMapJoinHelperWithMapThis(
    arrayObject,
    start = 0,
    end = arrayObject.length,
    mapPredicate,
    mapThis,
    separator = ',',
) {
    var result = '';

    if (start > -1 && end > -1) {
        result = String(mapPredicate.call(mapThis, arrayObject[start], start));

        var i = start;
        while (++i < end) {
            result = result + separator + String(mapPredicate.call(mapThis, arrayObject[i], i - start));
        }
    } else {
        var len = arrayObject.length;
        var _start = start > -1 ? start : len + start;
        var _end = end >= 0 ? end : len + end;

        result = String(mapPredicate.call(mapThis, arrayObject[_start], _start));

        var i = _start;
        while (++i < _end) {
            result = result + separator + String(mapPredicate.call(mapThis, arrayObject[i], i - _start));
        }
    }

    return result;
}

module.exports = { arraySliceMapJoinHelperWithMapThis };
