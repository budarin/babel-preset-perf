import { NodePath } from '@babel/core';
import { IGNORE_LINE_COMMENT } from './consts';

/*
 * A function that checks if the last comment for the statement is the
 * `babel-preset-perf-disable-next-line` comment.
 */
export function hasPluginNoTrasformComment(path: NodePath): boolean {
    const comments = path.getStatementParent()?.node.leadingComments;

    if (comments) {
        return Boolean(comments.find((comment) => comment.value.includes(IGNORE_LINE_COMMENT)));
    }

    return false;
}
