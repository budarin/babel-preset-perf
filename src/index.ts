// eslint-disable-next-line @typescript-eslint/ban-ts-comment

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { declarePreset } from '@babel/helper-plugin-utils';

import { validateOptions } from './utils/validateOptions';
import arrayDestructuringPlugin from './babel-plugin-perf-transform-array-destructuring';
import objectExpressionWithSpreadPlugin from './babel-plugin-perf-transform-object-expression-with-spread';
import arrayChainsOfCyclicMethodsPlugin from './babel-plugin-perf-transform-array-chains-of-cyclic-methods';
import transformConstAndLetWithVarPlugin from './babel-plugin-perf-transform-variable-declarations-with-var';

export {
    fullTransformationsList,
    arrayTransformations,
    arrayExpressionTransformations,
    arrayChainsMethodsTransformations,
    objectTransformations,
    stringTransformations,
    varTransformations,
} from './utils/consts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default declarePreset((api, options: PluginOptions) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    api.assertVersion(7);

    validateOptions(options);

    return {
        plugins: [
            [arrayDestructuringPlugin, options],
            [objectExpressionWithSpreadPlugin, options],
            [arrayChainsOfCyclicMethodsPlugin, options],
            [transformConstAndLetWithVarPlugin, options],
        ],
    };
});
