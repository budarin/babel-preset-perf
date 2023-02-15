import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_MAP_FILTER_JOIN } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformMapFilterJoin(
    path: NodePath<t.CallExpression>,
    arraObject: t.Expression,
    mapArgs: Arguments,
    filterArgs: Arguments,
    joinArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(filterArgs, path, plugin, ARRAY_MAP_FILTER_JOIN)) {
        return false;
    }

    if (!isValidPredicate(mapArgs, path, plugin, ARRAY_MAP_FILTER_JOIN)) {
        return false;
    }

    let moduleName = 'arrayMapFilterJoinHelper';
    let alias = 'amfjh';

    if (filterArgs.length === 2 && mapArgs.length === 1) {
        moduleName += 'WithFilterThis';
        alias += 'wft';
    } else if (filterArgs.length === 1 && mapArgs.length === 2) {
        moduleName += 'WithMapThis';
        alias += 'wmt';
    } else if (filterArgs.length === 2 && mapArgs.length === 2) {
        moduleName += 'WithMapAndFilterThis';
        alias += 'wmft';
    }

    const importedName = generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(arraObject);
    mapArgs.forEach((arg) => args.push(arg));
    filterArgs.forEach((arg) => args.push(arg));
    joinArgs.forEach((arg) => args.push(arg));

    const mapFilterJoinExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(mapFilterJoinExpr);

    return true;
}
