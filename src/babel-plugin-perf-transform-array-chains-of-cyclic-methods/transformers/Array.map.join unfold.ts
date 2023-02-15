import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';
import { isValidPredicate } from '../../utils/isValidPredicate';
import { ARRAY_MAP_JOIN_UNFOLD } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformMapJoinUnfoldArray(
    path: NodePath<t.CallExpression>,
    elements: (t.Expression | null)[],
    mapArgs: Arguments,
    joinArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (mapArgs.length > 1) {
        return false;
    }

    let mapArgsCount = 1;
    let predicate: t.Identifier;
    let func: NodePath<t.Function> | null = null;

    if (!isValidPredicate(mapArgs, path, plugin, ARRAY_MAP_JOIN_UNFOLD)) {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    mapArgsCount = path.data.paramsCount;

    if (t.isIdentifier(mapArgs[0])) {
        predicate = mapArgs[0];
    } else {
        predicate = path.scope.generateUidIdentifier('mp');

        func = path.getFunctionParent();

        if (!func || (func && !t.isArrowFunctionExpression(func))) {
            const statement = path.getStatementParent() || path.findParent((parent) => t.isExpressionStatement(parent));

            if (statement) {
                statement.insertBefore(
                    t.variableDeclaration('const', [t.variableDeclarator(predicate, mapArgs[0] as t.Expression)]),
                );
            }
        }
    }

    if (joinArgs.length > 1) {
        return false;
    }

    const newElements = [] as t.Expression[];
    const separatorExpr = (joinArgs[0] as t.StringLiteral | t.Identifier) || t.stringLiteral(',');

    for (let i = 0; i < elements.length; i++) {
        const item = elements[i] || t.stringLiteral('');
        const args = mapArgsCount === 1 ? [item] : [item, t.numericLiteral(i)];
        newElements.push(t.callExpression(predicate, args));
    }

    let newExpr = newElements[0];

    for (let i = 1; i < newElements.length; i++) {
        const item = newElements[i];
        newExpr = t.binaryExpression('+', newExpr, separatorExpr);
        newExpr = t.binaryExpression('+', newExpr, item);
    }

    path.replaceWith(newExpr);

    if (func && t.isArrowFunctionExpression(func)) {
        const body = func.get('body');

        if (!t.isBlockStatement(body.node)) {
            body.replaceWith(t.blockStatement([t.returnStatement(body.node)]));
        }

        body.unshiftContainer(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            'body',
            t.variableDeclaration('const', [t.variableDeclarator(predicate, mapArgs[0] as t.Expression)]),
        );
    }

    return true;
}
