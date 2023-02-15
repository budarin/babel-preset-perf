import * as t from '@babel/types';
import { NodePath } from '@babel/core';

import { EQUAL, GREATER, LOWER, NOT_EQUAL } from './consts';

/**
 * It checks if the given path is a binary expression with one of the given operators and one of the
 * given operands
 * @param path - NodePath<t.Node>
 * @param {string[]} binaryOps - the list of binary operators that you want to check for
 * @param {number} operand - number - the number to check against
 * @returns A function that takes a path and returns a boolean
 */

export function isOneOfLogicalOpatorsWithOperand(
    path: NodePath<t.Node>,
    binaryOps: string[],
    operand: number,
): boolean {
    if (t.isBinaryExpression(path) === false) {
        return false;
    }

    const p = path as NodePath<t.BinaryExpression>;

    if (binaryOps.includes(p.node.operator) === false) {
        return false;
    }

    if (
        binaryOps.includes(GREATER) &&
        p.node.operator === GREATER &&
        t.isNumericLiteral(p.node.right) &&
        p.node.right.value === operand
    ) {
        return true;
    }

    if (
        binaryOps.includes(LOWER) &&
        p.node.operator === LOWER &&
        t.isNumericLiteral(p.node.left) &&
        p.node.left.value === operand
    ) {
        return true;
    }

    if (
        binaryOps.includes(NOT_EQUAL) &&
        p.node.operator === NOT_EQUAL &&
        ((t.isNumericLiteral(p.node.left) && p.node.left.value === operand) ||
            (t.isNumericLiteral(p.node.right) && p.node.right.value === operand))
    ) {
        return true;
    }

    if (
        binaryOps.includes(EQUAL) &&
        p.node.operator === EQUAL &&
        ((t.isNumericLiteral(p.node.left) && p.node.left.value === operand) ||
            (t.isNumericLiteral(p.node.right) && p.node.right.value === operand))
    ) {
        return true;
    }

    return false;
}
