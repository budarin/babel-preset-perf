import * as t from '@babel/types';

import type { Arguments } from '../../utils/arrgumentsType';

import { NodePath, PluginPass } from '@babel/core';
import { generateImport } from '../../utils/generateImport';
import { OBJECT_ENTRIES_FOREACH } from '../../utils/consts';
import { isValidPredicate } from '../../utils/isValidPredicate';

/**
 * Object.keys(obj).forEach() -> objectKeysForEachHelper(obj, sep)
 */

export function transformObjectEntriesForEach(
    path: NodePath<t.CallExpression>,
    objEntriesArgs: Arguments,
    forEachArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(forEachArgs, path, plugin, OBJECT_ENTRIES_FOREACH)) {
        return false;
    }

    const args = [];
    const obj = objEntriesArgs[0] as t.Identifier | t.ObjectExpression;

    let moduleName = 'objectEntriesForEachHelper';
    let alias = 'oefeh';

    if (forEachArgs.length === 2) {
        moduleName += 'WithForEachThis';
        alias += 'wfet';
    }

    const helperName = generateImport(plugin, path, moduleName, alias);

    args.push(obj);
    forEachArgs.forEach((arg) => args.push(arg));

    path.replaceWith(t.callExpression(t.identifier(helperName), args));

    return true;
}
