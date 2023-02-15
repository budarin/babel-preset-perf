var { arrayFilterMapHelper: _afmt } = require('babel-preset-perf/helpers/arrayFilterMapHelper');
var {
    arrayFilterMapHelperWithMapThis: _afmtwmt,
} = require('babel-preset-perf/helpers/arrayFilterMapHelperWithMapThis');
var {
    arrayFilterMapHelperWithFilterThis: _afmtwft,
} = require('babel-preset-perf/helpers/arrayFilterMapHelperWithFilterThis');
var {
    arrayFilterMapHelperWithFilterAndMapThis: _afmtwfmt,
} = require('babel-preset-perf/helpers/arrayFilterMapHelperWithFilterAndMapThis');
var obj = {
    i: 1,
    j: 1,
};
function fmjt3() {
    _afmtwfmt(
        ['  1', '2', '3   '],
        function (x) {
            return x.length > this.j;
        },
        obj,
        function (x, i) {
            return x.padEnd(this.i, ' ');
        },
        obj,
    );
}
_afmtwft(
    ['  1', '2', '3   '],
    function (x) {
        return x.length > this.j;
    },
    obj,
    (x, i) => x.padEnd(i, ' '),
);
_afmtwmt(
    ['  1', '2', '3   '],
    (x) => x.length > 1,
    function (x, i) {
        return x.padEnd(this.i, ' ');
    },
    obj,
);
_afmt(
    ['  1', '2', '3   '],
    (x) => x.length > 1,
    (x, i) => x.padEnd(i, ' '),
);