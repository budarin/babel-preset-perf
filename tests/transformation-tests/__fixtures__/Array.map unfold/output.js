var _mp = (x) => x + 'Array';
var a = [
    _mp('Int8'),
    _mp('Uint8'),
    _mp('Uint8Clamped'),
    _mp('Int16'),
    _mp('Uint16'),
    _mp('Int32'),
    _mp('Uint32'),
    _mp('Float32'),
    _mp('Float64'),
    _mp('BigInt64'),
    _mp('BigUint64'),
];
var schema = (root) => {
    var _mp2 = (s) => s(root);
    return {
        metadata: {
            union: [
                _mp2(emptyForm),
                _mp2(refForm),
                _mp2(typeForm),
                _mp2(enumForm),
                _mp2(elementsForm),
                _mp2(propertiesForm),
                _mp2(optionalPropertiesForm),
                _mp2(discriminatorForm),
                _mp2(valuesForm),
            ],
        },
    };
};

// with unknow params count -
[1, 2, 3].map(func2);

// without index +
var f = (x) => x;
[f(1), f(2), f(3)];

// with index +
var f1 = (x, i) => x + i;
[f1(1, 0), f1(2, 1), f1(3, 2)];

// with 3 params -
var f11 = (x, i, a) => x + i + a[i];
[1, 2, 3].map(f11);

// with 2 params +
var f111 = (x, i, a) => x + i;
[f111(1, 0), f111(2, 1), f111(3, 2)];

// without index +
var _mp3 = (x) => x + i;
[_mp3(1), _mp3(2), _mp3(3)];

// with index +
var _mp4 = (x, i) => x + i;
[_mp4(1, 0), _mp4(2, 1), _mp4(3, 2)];

// with index +
var _mp5 = function (x, i) {
    return x + i;
};
[_mp5(1, 0), _mp5(2, 1), _mp5(3, 2)];

//
[String(1), String(2), String(3)];
[Number(1), Number(2), Number(3)];
[Boolean(1), Boolean(2), Boolean(3)];