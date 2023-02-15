arr.filter((x) => x > 0.5).length;

const obj = { i: 1 };
arr.filter(function (x) {
    return x > this.j;
}, obj).length;
