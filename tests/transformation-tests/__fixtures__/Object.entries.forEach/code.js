Object.entries(smallObj).forEach(([key, val], i) => {
    res = key.length + String(val).length + i;
});

const obj = { i: 1 };
Object.entries(smallObj).forEach(function ([key, val], i) {
    res = key.length + String(val).length + this.i;
}, obj);
