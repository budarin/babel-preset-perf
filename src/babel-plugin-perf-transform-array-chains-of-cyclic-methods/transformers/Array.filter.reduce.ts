import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_FILTER_REDUCE } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformFilterReduce(
    path: NodePath<t.CallExpression>,
    array: t.Expression,
    filterArgs: Arguments,
    reduceArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(filterArgs, path, plugin, ARRAY_FILTER_REDUCE)) {
        return false;
    }

    if (!isValidPredicate(reduceArgs, path, plugin, ARRAY_FILTER_REDUCE, 3)) {
        return false;
    }

    const moduleName = 'arrayFilterReduceHelper';
    const alias = 'afrh';

    const importedName =
        filterArgs.length > 1
            ? generateImport(plugin, path, `${moduleName}WithFilterThis`, `${alias}wft`)
            : generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(array);
    filterArgs.forEach((arg) => args.push(arg));
    reduceArgs.forEach((arg) => args.push(arg));

    const mapReduceExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(mapReduceExpr);

    return true;
}
