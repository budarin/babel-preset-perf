var { arrayJoinHelper: _ajh } = require('babel-preset-perf/dist/helpers/arrayJoinHelper');
var path = require('path');
_ajh(arr);
_ajh(arr, ' - ');
path.join(__dirname, '/path');