const x = [1, 2, 3]
    .map(function (x) {
        return x + this.i;
    }, obj)
    .filter(function (x) {
        return x > this.i;
    }, obj);

const x2 = [1, 2, 3]
    .map(function (x) {
        return x + 1;
    })
    .filter(function (x) {
        return x > this.i;
    }, obj);

const x1 = [1, 2, 3]
    .map(function (x) {
        return x + this.i;
    }, obj)
    .filter(function (x) {
        return x > 1;
    });

const x3 = [1, 2, 3].map(String).filter(function (x) {
    return x > 1;
});
