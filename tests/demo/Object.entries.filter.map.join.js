Object.entries(obj)
    .filter(([key, val], i) => key.length > 1 && val > -1)
    .map(([key, val]) => key.length + val)
    .join('-');

const o = { i: 1 };
const obj = { abcd: 1, bcd: 2, cd: 0 };

// filter
Object.entries(obj)
    .filter(function ([key, val], i) {
        return key.length > this.i && val > -1;
    }, o)
    .map(([key, val]) => key.length + val)
    .join('-');

// map
Object.entries(obj)
    .filter(([key, val], i) => key.length > 1 && val > -1)
    .map(function ([key, val]) {
        return key.length + val + this.i;
    }, o)
    .join('-');

// filter & map
Object.entries(obj)
    .filter(function ([key, val], i) {
        return key.length > this.i && val > -1;
    }, o)
    .map(function ([key, val]) {
        return key.length + val + this.i;
    }, o)
    .join('-');
