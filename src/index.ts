// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

import { declarePreset } from '@babel/helper-plugin-utils';

import { validateOptions } from './utils/validateOptions';
import arrayDestructuringPlugin from './babel-plugin-perf-transform-array-destructuring';
import objectExpressionWithSpreadPlugin from './babel-plugin-perf-transform-object-expression-with-spread';
import arrayChainsOfCyclicMethodsPlugin from './babel-plugin-perf-transform-array-chains-of-cyclic-methods';
import transformConstAndLetWithVarPlugin from './babel-plugin-perf-transform-variable-declarations-with-var';

export {
    varTransformations,
    transformationsList,
    arrayTransformations,
    objectTransformations,
    stringTransformations,
    arrayExpressionTransformations,
    arrayChainsMethodsTransformations,
} from './utils/consts';

export default declarePreset((api, options) => {
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
