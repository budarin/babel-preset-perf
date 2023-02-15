var { objectValuesFirstItemHelper: _ovfih } = require('babel-preset-perf/helpers/objectValuesFirstItemHelper');
var objs = {
    a: 1,
    b: 2,
};
var v = _ovfih(obj);
var v1 = _ovfih({
    a: 1,
    b: 2,
});