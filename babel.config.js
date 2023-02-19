const { devDependencies } = require('./package.json');

module.exports = {
    presets: [
        [
            './dist/index',
            {
                target: 'node',
                unsafeTransformations: true,
                // useStatsServer: false,
                useStatsServer: {
                    host: '127.0.0.1',
                    port: 3000,
                },
            },
        ],

        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                targets: { node: 'current' },
                corejs: { version: devDependencies['core-js'] },
            },
        ],

        '@babel/preset-typescript',
    ],

    plugins: [],
};
