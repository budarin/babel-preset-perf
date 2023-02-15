[1, 2, 3].map(String).join();

// +
[1, 2, 3].map((x) => x).join();

// +
[1, 2, 3].map((x, i) => x + i).join();

// +
[1, 2, 3]
    .map(function (x, i) {
        return x + i;
    })
    .join();

// +
const f = (x, i) => x + i;
[1, 2, 3].map(f).join();

// +
[1, 2, 3].map((x, i, a) => x + i).join();

// +
const f1 = (x, i, a) => x + i;
[1, 2, 3].map(f1).join();

// -
[1, 2, 3].map((x, i, a) => x + a[i]).join();

// +
const f2 = () => [1, 2, 3].map(f).join('-');

// +
const f3 = () => [1, 2, 3].map((x, i, a) => x + i).join('-');

// -
const f4 = () => [1, 2, 3].map((x, i, a) => x + a[i]).join('-');
