const path = require('path');
const thePreset = require('../../dist').default;
const pluginTester = require('babel-plugin-tester').default;

pluginTester({
    preset: thePreset,
    presetOptions: {
        name: 'fixtures-config',
        target: 'node',
        verbose: false,
        useStatsServer: false,
        unsafeTransformations: true,
    },
    presetName: 'babel-preset-pref',
    fixtures: path.resolve('./tests/transformation-tests/__fixtures__'),
});
