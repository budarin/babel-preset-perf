const arr = [1, 2, 3];
const obj = { i: 1 };

arr.map(function (x) {
    return x + this.i;
}, obj).forEach(function (x) {
    r1 = r1 + x + this.i;
}, obj);

arr.map(function (x) {
    return x;
}).forEach(function (x) {
    r1 = r1 + x + this.i;
}, obj);

arr.map(function (x) {
    return x + this.i;
}, obj).forEach(function (x) {
    r1 = r1 + x;
});

arr.map((x) => x).forEach((x) => {
    r1 = r1 + x;
});
