import { declare } from '@babel/helper-plugin-utils';

import { incStat } from '../utils/incStat';
import { getProgramVisitor } from '../utils/getProgramVisitor';
import { pluginsConfig, TRANSFORM_LET_CONST_WITH_VAR } from '../utils/consts';
import { hasPluginNoTrasformComment } from '../utils/hasPluginNoTrasformComment';

export default declare((api) => {
    api.assertVersion(7);

    return {
        name: 'babel-plugin-perf-transform-variable-declarations-with-var',
        visitor: {
            Program: getProgramVisitor(),

            VariableDeclaration: {
                enter(path): void {
                    if (hasPluginNoTrasformComment(path)) {
                        return;
                    }
                },

                exit(path): void {
                    if (pluginsConfig['Variable transform const and let with var']) {
                        if (path.node.kind !== 'var') {
                            path.node.kind = 'var';

                            incStat(this, path, TRANSFORM_LET_CONST_WITH_VAR);
                        }
                    }
                },
            },
        },
    };
});
