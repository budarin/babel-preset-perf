const x = arr.map(function (x) {
    return x + this.i;
}, obj);

const x2 = arr.map(function (x) {
    return x + 1;
});
