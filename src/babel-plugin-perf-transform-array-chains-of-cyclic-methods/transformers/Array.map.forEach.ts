import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_MAP_FOREACH } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformMapForEach(
    path: NodePath<t.CallExpression>,
    arrayObject: t.Expression,
    mapArgs: Arguments,
    forEacArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(mapArgs, path, plugin, ARRAY_MAP_FOREACH)) {
        return false;
    }

    if (!isValidPredicate(forEacArgs, path, plugin, ARRAY_MAP_FOREACH)) {
        return false;
    }

    let moduleName = 'arrayMapForEachHelper';
    let alias = 'amfeh';

    if (mapArgs.length === 2 && forEacArgs.length === 1) {
        moduleName += 'WithMapThis';
        alias += 'wmt';
    } else if (mapArgs.length === 1 && forEacArgs.length === 2) {
        moduleName += 'WithForEachThis';
        alias += 'wfet';
    } else if (mapArgs.length === 2 && forEacArgs.length === 2) {
        moduleName += 'WithMapAndForEachThis';
        alias += 'wmfet';
    }

    const importedName = generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(arrayObject);
    mapArgs.forEach((arg) => args.push(arg));
    forEacArgs.forEach((arg) => args.push(arg));

    const mapForEachExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(mapForEachExpr);

    return true;
}
