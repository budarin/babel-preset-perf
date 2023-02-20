import * as t from '@babel/types';
import { declare } from '@babel/helper-plugin-utils';

import { incStat } from '../utils/incStat';
import { getProgramVisitor } from '../utils/getProgramVisitor';
import { pluginsConfig, TRANSFORM_LET_CONST_WITH_VAR, VAR } from '../utils/consts';
import { hasPluginNoTrasformComment } from '../utils/hasPluginNoTrasformComment';

export default declare((api) => {
    api.assertVersion(7);

    return {
        name: 'babel-plugin-perf-transform-variable-declarations-with-var',
        visitor: {
            Program: getProgramVisitor(),

            VariableDeclaration: {
                exit(path): void {
                    if (hasPluginNoTrasformComment(path)) {
                        return;
                    }

                    if (pluginsConfig['Variable transform const and let with var']) {
                        let bindings = [] as string[];
                        let scope = path.scope.parent;

                        while (scope) {
                            const keys = Object.keys(scope.bindings);
                            if (keys.length) {
                                bindings = [...bindings, ...keys];
                            }
                            scope = scope.parent;
                        }

                        path.node.declarations.forEach((vd) => {
                            const name = (vd.id as t.Identifier).name;
                            if (bindings.includes(name)) {
                                path.scope.rename(name, path.scope.generateUidIdentifier(name).name);
                            }
                        });

                        if (path.node.kind !== VAR) {
                            path.node.kind = VAR;
                            incStat(this, path, TRANSFORM_LET_CONST_WITH_VAR);
                        }
                    }
                },
            },
        },
    };
});
