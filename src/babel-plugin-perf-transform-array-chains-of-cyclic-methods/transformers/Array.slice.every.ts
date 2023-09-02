import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import type { Arguments } from '../../utils/arrgumentsType';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_SLICE_EVERY } from '../../utils/consts';

export function transformSliceEvery(
    path: NodePath<t.CallExpression>,
    array: t.Expression,
    sliceArgs: Arguments,
    everyArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(everyArgs, path, plugin, ARRAY_SLICE_EVERY)) {
        return false;
    }

    let moduleName = 'arraySliceEveryHelper';
    let alias = 'aseh';

    if (everyArgs.length === 2) {
        moduleName += 'WithEveryThis';
        alias += 'wet';
    }

    const importedName = generateImport(plugin, path, moduleName, alias);
    const args = [];

    args.push(array);

    while (sliceArgs.length < 2) {
        sliceArgs.push(t.identifier('undefined'));
    }

    sliceArgs.forEach((arg) => args.push(arg));
    everyArgs.forEach((arg) => args.push(arg));

    const trimJoinExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(trimJoinExpr);

    return true;
}
