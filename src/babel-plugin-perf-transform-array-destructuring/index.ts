import { declare } from '@babel/helper-plugin-utils';

import { incStat } from '../utils/incStat';
import { validateOptions } from '../utils/validateOptions';
import { getProgramVisitor } from '../utils/getProgramVisitor';
import { transformArrayDestructuring } from './Array destructuring.';
import { ARRAY_DESTRUCTURING_INTO_VARS, pluginsConfig } from '../utils/consts';
import { hasPluginNoTrasformComment } from '../utils/hasPluginNoTrasformComment';

export default declare((api, options: PluginOptions) => {
    api.assertVersion(7);

    validateOptions(options);

    return {
        name: 'babel-plugin-perf-transform-array-expression-with-spread',

        /* eslint-disable */
        manipulateOptions: (_, parserOpts) => {
            parserOpts.plugins.push('jsx');
        },
        /* eslint-enable */

        visitor: {
            Program: getProgramVisitor(),

            ArrayPattern: {
                enter(path): void {
                    if (hasPluginNoTrasformComment(path)) {
                        path.skip();
                        return;
                    }

                    if (pluginsConfig['Array destructuring'] && transformArrayDestructuring(path)) {
                        incStat(this, path, ARRAY_DESTRUCTURING_INTO_VARS);
                        return;
                    }
                },
            },
        },
    };
});
