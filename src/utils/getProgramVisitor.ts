import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { incStat } from './incStat';
import { IGNORE_MODULE_COMMENT, IGNORE_TRANSPILE_MODULES } from './consts';

export function getProgramVisitor(): {
    enter(this: PluginPass, path: NodePath<t.Program>): void;
} {
    return {
        enter(path): void {
            const comments = (path.container as t.File).comments;
            if (comments) {
                const ignoreComment = comments.find((comment) => comment.value.includes(IGNORE_MODULE_COMMENT));

                if (ignoreComment) {
                    incStat(this, path, IGNORE_TRANSPILE_MODULES);
                    path.skip();

                    return;
                }
            }
        },
    };
}
