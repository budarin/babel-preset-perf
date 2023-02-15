import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_MAP_FILTER } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformMapFilter(
    path: NodePath<t.CallExpression>,
    arrayObject: t.Expression,
    mapArgs: Arguments,
    filterArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(mapArgs, path, plugin, ARRAY_MAP_FILTER)) {
        return false;
    }

    if (!isValidPredicate(filterArgs, path, plugin, ARRAY_MAP_FILTER)) {
        return false;
    }

    let moduleName = 'arrayMapFilterHelper';
    let alias = 'amfh';

    if (filterArgs.length === 2 && mapArgs.length === 1) {
        moduleName += 'WithFilterThis';
        alias += 'wft';
    } else if (filterArgs.length === 1 && mapArgs.length === 2) {
        moduleName += 'WithMapThis';
        alias += 'wmt';
    } else if (filterArgs.length === 2 && mapArgs.length === 2) {
        moduleName += 'WithMapAndFilterThis';
        alias += 'wfmt';
    }

    const importedName = generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(arrayObject);
    mapArgs.forEach((arg) => args.push(arg));
    filterArgs.forEach((arg) => args.push(arg));

    const mapFilterExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(mapFilterExpr);

    return true;
}
