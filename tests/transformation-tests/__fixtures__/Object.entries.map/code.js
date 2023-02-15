Object.entries(smallObj).map(([key, val], i) => key.length + String(val).length + i);

const obj = { i: 1 };
Object.entries(smallObj).map(function ([key, val], i) {
    return key.length + String(val).length + this.i;
}, obj);
