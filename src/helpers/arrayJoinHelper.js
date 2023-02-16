'use strict';

// @babel-preset-perf-ignore
function arrayJoinHelper(array, argument) {
    if (Array.isArray(array)) {
        var separator = argument === undefined ? ',' : argument;
        var i = 0;
        var result = array[0];
        var len = array.length;

        while (++i < len) {
            result += separator + array[i];
        }

        return result;
    } else {
        return array.join(argument);
    }
}

module.exports = { arrayJoinHelper };
