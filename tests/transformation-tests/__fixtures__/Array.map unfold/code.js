const a = [
    'Int8',
    'Uint8',
    'Uint8Clamped',
    'Int16',
    'Uint16',
    'Int32',
    'Uint32',
    'Float32',
    'Float64',
    'BigInt64',
    'BigUint64',
].map((x) => x + 'Array');

const schema = (root) => ({
    metadata: {
        union: [
            emptyForm,
            refForm,
            typeForm,
            enumForm,
            elementsForm,
            propertiesForm,
            optionalPropertiesForm,
            discriminatorForm,
            valuesForm,
        ].map((s) => s(root)),
    },
});

// with unknow params count -
[1, 2, 3].map(func2);

// without index +
const f = (x) => x;
[1, 2, 3].map(f);

// with index +
const f1 = (x, i) => x + i;
[1, 2, 3].map(f1);

// with 3 params -
const f11 = (x, i, a) => x + i + a[i];
[1, 2, 3].map(f11);

// with 2 params +
const f111 = (x, i, a) => x + i;
[1, 2, 3].map(f111);

// without index +
[1, 2, 3].map((x) => x + i);

// with index +
[1, 2, 3].map((x, i) => x + i);

// with index +
[1, 2, 3].map(function (x, i) {
    return x + i;
});

//
[1, 2, 3].map(String);
[1, 2, 3].map(Number);
[1, 2, 3].map(Boolean);
