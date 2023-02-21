import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import type { Arguments } from '../../utils/arrgumentsType';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_SLICE_MAP_JOIN } from '../../utils/consts';

export function transformSliceMapJoin(
    path: NodePath<t.CallExpression>,
    array: t.Expression,
    sliceArgs: Arguments,
    mapArgs: Arguments,
    joinArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(mapArgs, path, plugin, ARRAY_SLICE_MAP_JOIN)) {
        return false;
    }

    let moduleName = 'arraySliceMapJoinHelper';
    let alias = 'asmjh';

    if (mapArgs.length === 2) {
        moduleName += 'WithMapThis';
        alias += 'wmt';
    }

    const importedName = generateImport(plugin, path, moduleName, alias);
    const args = [];

    args.push(array);

    while (sliceArgs.length < 2) {
        sliceArgs.push(t.identifier('undefined'));
    }

    sliceArgs.forEach((arg) => args.push(arg));
    mapArgs.forEach((arg) => args.push(arg));
    joinArgs.forEach((arg) => args.push(arg));

    const trimJoinExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(trimJoinExpr);

    return true;
}
