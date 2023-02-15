import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { generateImport } from '../../utils/generateImport';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformStringSlice(
    path: NodePath<t.CallExpression>,
    strObject: t.Expression,
    sliceArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (sliceArgs.length > 2) {
        return false;
    }
    const importedName = generateImport(plugin, path, 'stringSliceHelper', 'ssh');
    const args = [];

    args.push(strObject);
    sliceArgs.forEach((arg) => args.push(arg));

    const trimJoinExpr = t.callExpression(t.identifier(importedName), args);
    path.replaceWith(trimJoinExpr);

    return true;
}
