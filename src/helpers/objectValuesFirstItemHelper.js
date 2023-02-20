'use strict';

// babel-preset-perf-ignore
function objectValuesFirstItemHelper(obj) {
    for (var key in obj) {
        return obj[key];
    }

    return;
}

module.exports = { objectValuesFirstItemHelper };
