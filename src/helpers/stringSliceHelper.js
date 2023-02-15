'use strict';

function stringSliceHelper(strObject, start, end) {
    if (typeof strObject === 'string') {
        return strObject.substring(start || 0, end ? (end < 0 ? strObject.length + end : end) : end);
    } else {
        return strObject.slice(start, end);
    }
}

module.exports = { stringSliceHelper };
