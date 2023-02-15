var { stringSliceHelper: _ssh } = require('babel-preset-perf/dist/helpers/stringSliceHelper');
_ssh('String', 1, 5);
_ssh('String', 1);
_ssh('String');
_ssh([1, 2, 3], 4, 8);
