import * as t from '@babel/types';
import { NodePath } from '@babel/core';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformJoinUnfoldArray(
    path: NodePath<t.CallExpression>,
    elements: (t.Expression | null)[],
    joinArgs: Arguments,
): boolean {
    let separator = ',';
    const newElements = [] as t.Expression[];

    if (joinArgs.length > 1) {
        return false;
    }

    if (joinArgs.length === 1 && t.isStringLiteral(joinArgs[0]) === false) {
        let i = 0;
        const separatorExpr = joinArgs[0] as t.Expression;

        while (elements[i] === null) i++;

        let newExpr = elements[i]!;
        i++;

        for (; i < elements.length; i++) {
            const item = elements[i];

            if (item === null || t.isNullLiteral(item) || (t.isIdentifier(item) && item.name === 'undefined')) {
                newExpr = t.binaryExpression('+', newExpr, separatorExpr);
                newExpr = t.binaryExpression('+', newExpr, t.stringLiteral(''));
            } else {
                newExpr = t.binaryExpression('+', newExpr, separatorExpr);
                newExpr = t.binaryExpression('+', newExpr, item);
            }
        }

        path.replaceWith(newExpr);

        return true;
    }

    if (joinArgs.length === 1 && t.isStringLiteral(joinArgs[0])) {
        separator = joinArgs[0].value;
    }

    const separatorExpr = t.stringLiteral(separator);

    let hasAccumulator = false;
    let strAccumulator = '';

    for (let i = 0; i < elements.length; i++) {
        const item = elements[i];
        if (item === null || t.isNullLiteral(item) || (t.isIdentifier(item) && item.name === 'undefined')) {
            if (hasAccumulator) {
                strAccumulator = strAccumulator + separator;
            } else {
                hasAccumulator = true;
            }
        } else {
            if (t.isStringLiteral(item) || t.isNumericLiteral(item) || t.isBooleanLiteral(item)) {
                if (hasAccumulator) {
                    strAccumulator = strAccumulator + separator + String(item.value);
                } else {
                    strAccumulator = String(item.value);
                    hasAccumulator = true;
                }
            } else {
                if (hasAccumulator) {
                    newElements.push(t.stringLiteral(strAccumulator));
                    strAccumulator = '';
                    hasAccumulator = false;
                }
                newElements.push(item);
            }
        }
    }

    if (hasAccumulator) {
        newElements.push(t.stringLiteral(strAccumulator));
    }

    let newExpr = newElements[0];

    for (let i = 1; i < newElements.length; i++) {
        const item = newElements[i];
        newExpr = t.binaryExpression('+', newExpr, separatorExpr);
        newExpr = t.binaryExpression('+', newExpr, item);
    }

    path.replaceWith(newExpr);

    return true;
}
