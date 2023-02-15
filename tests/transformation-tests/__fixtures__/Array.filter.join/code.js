const arr = ['  1', '2', '3   '];
const obj = {
    i: 1,
    j: 1,
};

arr.filter(function (x) {
    return x.length > this.j;
}, obj).join(' ');

arr.filter((x) => x.length > 1).join(' = ');
