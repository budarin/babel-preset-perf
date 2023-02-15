import { declare } from '@babel/helper-plugin-utils';

import { incStat } from '../utils/incStat';
import { validateOptions } from '../utils/validateOptions';
import { getProgramVisitor } from '../utils/getProgramVisitor';
import { OBJECT_EXPRESSION_WITH_SPREAD, pluginsConfig } from '../utils/consts';
import { hasPluginNoTrasformComment } from '../utils/hasPluginNoTrasformComment';
import { transformObjectExpressionWithSpread } from './Object expression with spread';

export default declare((api, options: PluginOptions) => {
    api.assertVersion(7);

    validateOptions(options);

    return {
        name: 'babel-plugin-perf-transform-object-expression-with-spread',

        /* eslint-disable */
        manipulateOptions: (_, parserOpts) => {
            parserOpts.plugins.push('jsx');
        },
        /* eslint-enable */

        visitor: {
            Program: getProgramVisitor(),

            ObjectExpression: {
                enter(path): void {
                    if (hasPluginNoTrasformComment(path)) {
                        return;
                    }

                    if (pluginsConfig['Object expression with spread'] && transformObjectExpressionWithSpread(path)) {
                        incStat(this, path, OBJECT_EXPRESSION_WITH_SPREAD);
                        return;
                    }
                },
            },
        },
    };
});
