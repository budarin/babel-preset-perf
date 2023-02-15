var {
    objectEntriesForEachHelperWithForEachThis: _oefehwfet,
} = require('babel-preset-perf/dist/helpers/objectEntriesForEachHelperWithForEachThis');
var { objectEntriesForEachHelper: _oefeh } = require('babel-preset-perf/dist/helpers/objectEntriesForEachHelper');
_oefeh(smallObj, ([key, val], i) => {
    res = key.length + String(val).length + i;
});
var obj = {
    i: 1,
};
_oefehwfet(
    smallObj,
    function ([key, val], i) {
        res = key.length + String(val).length + this.i;
    },
    obj,
);