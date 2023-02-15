//
const arr = [1, 2, 3];
const obj = {
    i: 1,
};

//
const func3 = (x, i) => x > 0;
const y = arr.filter(func3).join(' ');

//
function func(x) {
    return x + this.i;
}
const x = arr.filter(func, obj).join();

//
function name() {
    function name1() {
        return [...a, ...b]
            .sort()
            .filter((x) => x > 0.5)
            .join();
    }

    return name1();
}
