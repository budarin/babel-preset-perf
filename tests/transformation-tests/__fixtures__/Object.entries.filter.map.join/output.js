var {
    objectEntriesFilterMapJoinHelperWithFilterAndMapThis: _oefmjtwfmt,
} = require('babel-preset-perf/helpers/objectEntriesFilterMapJoinHelperWithFilterAndMapThis');
var {
    objectEntriesFilterMapJoinHelperWithMapThis: _oefmjtwmt,
} = require('babel-preset-perf/helpers/objectEntriesFilterMapJoinHelperWithMapThis');
var {
    objectEntriesFilterMapJoinHelperWithFilterThis: _oefmjtwft,
} = require('babel-preset-perf/helpers/objectEntriesFilterMapJoinHelperWithFilterThis');
var {
    objectEntriesFilterMapJoinHelper: _oefmjt,
} = require('babel-preset-perf/helpers/objectEntriesFilterMapJoinHelper');
_oefmjt(
    obj,
    ([key, val], i) => key.length > 1 && val > -1,
    ([key, val]) => key.length + val,
    '-',
);
var o = {
    i: 1,
};
var obj = {
    abcd: 1,
    bcd: 2,
    cd: 0,
};

// filter
_oefmjtwft(
    obj,
    function ([key, val], i) {
        return key.length > this.i && val > -1;
    },
    o,
    ([key, val]) => key.length + val,
    '-',
);

// map
_oefmjtwmt(
    obj,
    ([key, val], i) => key.length > 1 && val > -1,
    function ([key, val]) {
        return key.length + val + this.i;
    },
    o,
    '-',
);

// filter & map
_oefmjtwfmt(
    obj,
    function ([key, val], i) {
        return key.length > this.i && val > -1;
    },
    o,
    function ([key, val]) {
        return key.length + val + this.i;
    },
    o,
    '-',
);