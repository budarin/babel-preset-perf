// conditional expr +
arr.filter(Boolean).length ? 1 : 0;

// logical in conditional expr +
arr.filter(Boolean).length > 0 ? 1 : 0;

// logical expr +
arr && arr.filter(Boolean).length;

// -
arr.filter(Boolean).length;

// if +
if (arr.filter(Boolean).length) {
    console.log('ok');
}

//

// binary exp +
arr.filter(Boolean).length > 0;

// binary exp +
arr.filter(Boolean).length !== 0;

// binary exp +
0 < arr.filter(Boolean).length;

// binary exp +
0 !== arr.filter(Boolean).length;

// binary exp + => !filterLengthHelper(...)
0 === arr.filter(Boolean).length;

//

// binary exp -
arr.filter(Boolean).length > 5;

// binary exp -
arr.filter(Boolean).length !== 1;

// binary exp -
2 < arr.filter(Boolean).length;

// binary exp -
1 !== arr.filter(Boolean).length;

//

// unary exp !! +
!!arr.filter(Boolean).length;

// unary exp !+
!arr.filter(Boolean).length;

// Boolean +
Boolean(arr.filter(Boolean).length);

// with filter this +
const obj = { i: 1 };
if (
    arr.filter(function (x) {
        return x > this.i;
    }, obj).length
) {
    console.log('ok');
}
