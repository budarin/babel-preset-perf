var { arrayJoinHelper: _ajh } = require('babel-preset-perf/dist/helpers/arrayJoinHelper');
String(1) + ',' + String(2) + ',' + String(3);

// +
var _mp = (x) => x;
_mp(1) + ',' + _mp(2) + ',' + _mp(3);

// +
var _mp2 = (x, i) => x + i;
_mp2(1, 0) + ',' + _mp2(2, 1) + ',' + _mp2(3, 2);

// +
var _mp3 = function (x, i) {
    return x + i;
};
_mp3(1, 0) + ',' + _mp3(2, 1) + ',' + _mp3(3, 2);

// +
var f = (x, i) => x + i;
f(1, 0) + ',' + f(2, 1) + ',' + f(3, 2);

// +
var _mp4 = (x, i, a) => x + i;
_mp4(1, 0) + ',' + _mp4(2, 1) + ',' + _mp4(3, 2);

// +
var f1 = (x, i, a) => x + i;
f(1, 0) + ',' + f(2, 1) + ',' + f(3, 2);

// -
_ajh([1, 2, 3].map((x, i, a) => x + a[i]));

// +
var f2 = () => f(1, 0) + '-' + f(2, 1) + '-' + f(3, 2);

// +
var f3 = () => {
    var _mp5 = (x, i, a) => x + i;
    return _mp5(1, 0) + '-' + _mp5(2, 1) + '-' + _mp5(3, 2);
};

// -
var f4 = () =>
    _ajh(
        [1, 2, 3].map((x, i, a) => x + a[i]),
        '-',
    );