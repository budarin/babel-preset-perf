'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getProgramVisitor = void 0;
const path = require('path');
const incStat_1 = require('./incStat');
const consts_1 = require('./consts');
function getProgramVisitor() {
    const { sep } = path;
    const packageFilesPath = sep + consts_1.PRESET_NAME + sep;
    return {
        enter(path) {
            if (this.filename?.includes(`node_modules${sep}${packageFilesPath}`)) {
                path.skip();
                return;
            }
            const comments = path.container.comments;
            if (comments) {
                const ignoreComment = comments.find((comment) =>
                    comment.value.includes(consts_1.IGNORE_MODULE_COMMENT),
                );
                if (ignoreComment) {
                    (0, incStat_1.incStat)(this, path, consts_1.IGNORE_TRANSPILE_MODULES);
                    path.skip();
                    return;
                }
            }
        },
    };
}
exports.getProgramVisitor = getProgramVisitor;
