module.exports = {
    env: {
        node: true,
        'jest/globals': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:node/recommended',
    ],
    plugins: ['jest', 'import', 'node'],
    rules: {
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
    },
    overrides: [
        {
            plugins: ['jest', '@typescript-eslint/eslint-plugin', 'import', 'node'],
            files: ['**/*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2022,
                tsconfigRootDir: '.',
                project: 'tsconfig.json',
                createDefaultProgram: true,
            },
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'error',
                'node/no-missing-import': [
                    'error',
                    {
                        tryExtensions: ['.ts', '.js', '.json', '.node'],
                    },
                ],
                'node/no-unpublished-import': 'off',
            },
        },
    ],
};
