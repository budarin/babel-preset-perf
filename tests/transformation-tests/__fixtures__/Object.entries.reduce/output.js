var { objectEntriesReduceHelper: _oerh } = require('babel-preset-perf/dist/helpers/objectEntriesReduceHelper');
_oerh(obj, (acc, [key, val], i) => acc + key.length + String(val).length + i, 0);
_oerh(
    {
        a: 1,
        b: 2,
    },
    (acc, [key, val], i) => acc + key.length + String(val).length + i,
    0,
);