nums.slice().every((x, i) => x > 1);
nums.slice(1).every((x, i) => x > 1);
nums.slice(1, end).every((x, i) => x > 1);
nums.slice(-3).every((x, i) => x > 1);
nums.slice(1, -1).every((x, i) => x > 1);
nums.slice(-5, -1).every((x, i) => x > 1);

const obj = { i: 1 };
nums.slice(start, end).every(function (x, i) {
    return x > this.i;
}, obj);
