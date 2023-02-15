import * as t from '@babel/types';

import type { Arguments } from '../../utils/arrgumentsType';

import { NodePath, PluginPass } from '@babel/core';
import { generateImport } from '../../utils/generateImport';
import { OBJECT_ENTRIES_MAP } from '../../utils/consts';
import { isValidPredicate } from '../../utils/isValidPredicate';

/**
 * Object.entries(obj).map() -> objectEntriesMapHelper(obj)
 */

export function transformObjectEntriesMap(
    path: NodePath<t.CallExpression>,
    objEntriesArgs: Arguments,
    mapArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(mapArgs, path, plugin, OBJECT_ENTRIES_MAP)) {
        return false;
    }

    const args = [];
    const obj = objEntriesArgs[0] as t.Identifier | t.ObjectExpression;

    let moduleName = 'objectEntriesMapHelper';
    let alias = 'oemh';

    if (mapArgs.length === 2) {
        moduleName += 'WithMapThis';
        alias += 'wmt';
    }

    const helperName = generateImport(plugin, path, moduleName, alias);

    args.push(obj);
    mapArgs.forEach((arg) => args.push(arg));

    path.replaceWith(t.callExpression(t.identifier(helperName), args));

    return true;
}
