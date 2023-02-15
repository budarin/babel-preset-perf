import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import type { Arguments } from '../../utils/arrgumentsType';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { OBJECT_ENTRIES_FILTER_MAP_JOIN } from '../../utils/consts';

export function transformObjectEntriesFilterMapJoin(
    path: NodePath<t.CallExpression>,
    objEntriesArgs: Arguments,
    fiterArgs: Arguments,
    mapArgs: Arguments,
    joinArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(fiterArgs, path, plugin, OBJECT_ENTRIES_FILTER_MAP_JOIN)) {
        return false;
    }

    if (!isValidPredicate(mapArgs, path, plugin, OBJECT_ENTRIES_FILTER_MAP_JOIN)) {
        return false;
    }

    let moduleName = 'objectEntriesFilterMapJoinHelper';
    let alias = 'oefmjt';

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
    const obj = objEntriesArgs[0] as t.Identifier | t.ObjectExpression;
    const args = [];

    args.push(obj);

    fiterArgs.forEach((arg) => args.push(arg));
    mapArgs.forEach((arg) => args.push(arg));
    joinArgs.forEach((arg) => args.push(arg));

    const trimJoinExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(trimJoinExpr);

    return true;
}
