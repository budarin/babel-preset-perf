const nums = [1, 2, 3];

nums.slice().every((x, i) => x > 1);
nums.slice(start).every((x, i) => x > 1);
nums.slice(start, end).every((x, i) => x > 1);
nums.slice(-3).every((x, i) => x > 1);
nums.slice(start, -1).every((x, i) => x > 1);
nums.slice(-5, -1).every((x, i) => x > 1);

const obj = { i: 1 };
nums.slice(start, end).every(function (x, i) {
    return x > this.i;
}, obj);
