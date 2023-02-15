import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import type { Arguments } from '../../utils/arrgumentsType';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_FILTER_MAP_JOIN } from '../../utils/consts';

export function transformFilterMapJoin(
    path: NodePath<t.CallExpression>,
    arrayObject: t.Expression,
    fiterArgs: Arguments,
    mapArgs: Arguments,
    joinArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(fiterArgs, path, plugin, ARRAY_FILTER_MAP_JOIN)) {
        return false;
    }

    if (!isValidPredicate(mapArgs, path, plugin, ARRAY_FILTER_MAP_JOIN)) {
        return false;
    }

    let moduleName = 'arrayFilterMapJoinHelper';
    let alias = 'afmjt';

    if (fiterArgs.length === 2 && mapArgs.length === 1) {
        moduleName += 'WithFilterThis';
        alias += 'wft';
    } else if (fiterArgs.length === 1 && mapArgs.length === 2) {
        moduleName += 'WithMapThis';
        alias += 'wmt';
    } else if (fiterArgs.length === 2 && mapArgs.length === 2) {
        moduleName += 'WithFilterAndMapThis';
        alias += 'wfmt';
    }

    const importedName = generateImport(plugin, path, moduleName, alias);
    const args = [];

    args.push(arrayObject);

    fiterArgs.forEach((arg) => args.push(arg));
    mapArgs.forEach((arg) => args.push(arg));
    joinArgs.forEach((arg) => args.push(arg));

    const trimJoinExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(trimJoinExpr);

    return true;
}
