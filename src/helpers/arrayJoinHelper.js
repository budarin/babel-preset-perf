'use strict';

// @babel-preset-perf-ignore
function arrayJoinHelper(arrayObject, separator = ',') {
    var i = 0;
    var result = arrayObject[0];
    var len = arrayObject.length;

    while (++i < len) {
        result += separator + arrayObject[i];
    }

    return result;
}

module.exports = { arrayJoinHelper };
