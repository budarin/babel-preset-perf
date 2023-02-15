import * as t from '@babel/types';

import type { Arguments } from '../../utils/arrgumentsType';

import { NodePath, PluginPass } from '@babel/core';
import { generateImport } from '../../utils/generateImport';
import { OBJECT_ENTRIES_REDUCE } from '../../utils/consts';
import { isValidPredicate } from '../../utils/isValidPredicate';

/**
 * Object.entries(obj).reduce() -> objectEntriesReduceHelper(obj, sep)
 */

export function transformObjectEntriesReduce(
    path: NodePath<t.CallExpression>,
    objEntriesArgs: Arguments,
    reduceArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(reduceArgs, path, plugin, OBJECT_ENTRIES_REDUCE, 3)) {
        return false;
    }

    const args = [];
    const obj = objEntriesArgs[0] as t.Identifier | t.ObjectExpression;
    const helperName = generateImport(plugin, path, 'objectEntriesReduceHelper', 'oerh');

    args.push(obj);
    reduceArgs.forEach((arg) => args.push(arg));

    path.replaceWith(t.callExpression(t.identifier(helperName), args));

    return true;
}
