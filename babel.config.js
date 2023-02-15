const { devDependencies } = require('./package.json');

const isTesting = process.env.NODE_ENV === 'test';

module.exports = {
    comments: true,
    presets: [
        [
            './dist/index',
            {
                target: 'node',
                name: 'demo-config',
                verbose: !isTesting,
                unsafeTransformations: true,
                useStatsServer: false,
            },
        ],

        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',

                targets: {
                    node: 'current',
                },

                corejs: {
                    version: devDependencies['core-js'],
                },
            },
        ],
        '@babel/typescript',
    ],
};
