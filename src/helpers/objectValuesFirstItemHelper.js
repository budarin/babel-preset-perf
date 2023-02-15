'use strict';

function objectValuesFirstItemHelper(obj) {
    for (var key in obj) {
        return obj[key];
    }

    return;
}

module.exports = { objectValuesFirstItemHelper };
