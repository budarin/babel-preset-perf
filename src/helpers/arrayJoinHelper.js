'use strict';

// @babel-preset-perf-ignore
function arrayJoinHelper(array, argument) {
    if (Array.isArray(array)) {
        var i = 0;
        var result = array[0] || '';
        var len = array.length;
        var separator = argument === undefined ? ',' : argument;

        while (++i < len) {
            result += separator + array[i];
        }

        return result;
    } else {
        return array.join(argument);
    }
}

module.exports = { arrayJoinHelper };
