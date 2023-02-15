var { arrayFilterMapJoinHelper: _afmjt } = require('babel-preset-perf/dist/helpers/arrayFilterMapJoinHelper');
var {
    arrayFilterMapJoinHelperWithMapThis: _afmjtwmt,
} = require('babel-preset-perf/dist/helpers/arrayFilterMapJoinHelperWithMapThis');
var {
    arrayFilterMapJoinHelperWithFilterThis: _afmjtwft,
} = require('babel-preset-perf/dist/helpers/arrayFilterMapJoinHelperWithFilterThis');
var {
    arrayFilterMapJoinHelperWithFilterAndMapThis: _afmjtwfmt,
} = require('babel-preset-perf/dist/helpers/arrayFilterMapJoinHelperWithFilterAndMapThis');
var obj = {
    i: 1,
    j: 1,
};
function fmjt3() {
    _afmjtwfmt(
        ['  1', '2', '3   '],
        function (x) {
            return x.length > this.j;
        },
        obj,
        function (x, i) {
            return x.padEnd(this.i, ' ');
        },
        obj,
        ' = ',
    );
}
_afmjtwft(
    ['  1', '2', '3   '],
    function (x) {
        return x.length > this.j;
    },
    obj,
    (x, i) => x.padEnd(i, ' '),
    ' ',
);
_afmjtwmt(
    ['  1', '2', '3   '],
    (x) => x.length > 1,
    function (x, i) {
        return x.padEnd(this.i, ' ');
    },
    obj,
);
_afmjt(
    ['  1', '2', '3   '],
    (x) => x.length > 1,
    (x, i) => x.padEnd(i, ' '),
    ' = ',
);