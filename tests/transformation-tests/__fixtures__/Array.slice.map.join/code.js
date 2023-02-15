const start = 1;
const end = 3;
const obj = { i: 1 };
const arr = [1, 2, 3, 4, 5];

arr.slice(start, end)
    .map((x, i) => x + i)
    .join(' ');

arr.slice()
    .map((x, i) => x + i)
    .join(' ');

arr.slice(1)
    .map((x, i) => x + i)
    .join(' ');

arr.slice(-1)
    .map((x, i) => x + i)
    .join(' ');

arr.slice(-3, -1)
    .map((x, i) => x + i)
    .join(' ');

arr.slice(0, -1)
    .map((x, i) => x + i)
    .join(' ');

arr.slice(start, end)
    .map(function (x, i) {
        return x + this.i;
    }, obj)
    .join(' ');
