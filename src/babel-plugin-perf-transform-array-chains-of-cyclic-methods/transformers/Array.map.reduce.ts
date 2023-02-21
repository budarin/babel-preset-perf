import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_MAP_REDUCE } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformMapReduce(
    path: NodePath<t.CallExpression>,
    array: t.Expression,
    mapArgs: Arguments,
    reduceArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(mapArgs, path, plugin, ARRAY_MAP_REDUCE, 3)) {
        return false;
    }

    if (!isValidPredicate(reduceArgs, path, plugin, ARRAY_MAP_REDUCE, 3)) {
        return false;
    }

    const moduleName = 'arrayMapReduceHelper';
    const alias = 'amrh';

    const importedName =
        mapArgs.length > 1
            ? generateImport(plugin, path, `${moduleName}WithMapThis`, `${alias}wmt`)
            : generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(array);
    mapArgs.forEach((arg) => args.push(arg));
    reduceArgs.forEach((arg) => args.push(arg));

    const mapReduceExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(mapReduceExpr);

    return true;
}
