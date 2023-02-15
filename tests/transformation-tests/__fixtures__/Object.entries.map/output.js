var {
    objectEntriesMapHelperWithMapThis: _oemhwmt,
} = require('babel-preset-perf/helpers/objectEntriesMapHelperWithMapThis');
var { objectEntriesMapHelper: _oemh } = require('babel-preset-perf/helpers/objectEntriesMapHelper');
_oemh(smallObj, ([key, val], i) => key.length + String(val).length + i);
var obj = {
    i: 1,
};
_oemhwmt(
    smallObj,
    function ([key, val], i) {
        return key.length + String(val).length + this.i;
    },
    obj,
);