var { arrayFilterLengthHelper: _aflh } = require('babel-preset-perf/dist/helpers/arrayFilterLengthHelper');
// conditional expr +
arr.some(Boolean) ? 1 : 0;

// logical in conditional expr +
arr.some(Boolean) ? 1 : 0;

// logical expr +
arr && arr.some(Boolean);

// -
_aflh(arr, Boolean);

// if +
if (arr.some(Boolean)) {
    console.log('ok');
}

//

// binary exp +
arr.some(Boolean);

// binary exp +
arr.some(Boolean);

// binary exp +
arr.some(Boolean);

// binary exp +
arr.some(Boolean);

// binary exp + => !filterLengthHelper(...)
!arr.some(Boolean);

//

// binary exp -
_aflh(arr, Boolean) > 5;

// binary exp -
_aflh(arr, Boolean) !== 1;

// binary exp -
2 < _aflh(arr, Boolean);

// binary exp -
1 !== _aflh(arr, Boolean);

//

// unary exp !! +
arr.some(Boolean);

// unary exp !+
!arr.some(Boolean);

// Boolean +
arr.some(Boolean);

// with filter this +
var obj = {
    i: 1,
};
if (
    arr.some(function (x) {
        return x > this.i;
    }, obj)
) {
    console.log('ok');
}