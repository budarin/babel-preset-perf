import * as t from '@babel/types';
import path = require('path');
import { NodePath, PluginPass } from '@babel/core';

import { incStat } from './incStat';
import { IGNORE_MODULE_COMMENT, IGNORE_TRANSPILE_MODULES, PRESET_NAME } from './consts';

export function getProgramVisitor(): {
    enter(this: PluginPass, path: NodePath<t.Program>): void;
} {
    const packageFilesPath = path.sep + PRESET_NAME + path.sep;

    return {
        enter(path): void {
            if (this.filename?.includes(packageFilesPath)) {
                path.skip();
                return;
            }

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
