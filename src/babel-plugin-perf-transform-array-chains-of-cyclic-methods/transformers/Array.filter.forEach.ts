import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_FILTER_FOREACH } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformFilterForEach(
    path: NodePath<t.CallExpression>,
    arrayObject: t.Expression,
    filterArgs: Arguments,
    forEacArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(filterArgs, path, plugin, ARRAY_FILTER_FOREACH)) {
        return false;
    }

    if (!isValidPredicate(forEacArgs, path, plugin, ARRAY_FILTER_FOREACH)) {
        return false;
    }

    let moduleName = 'arrayFilterForEachHelper';
    let alias = 'affeh';

    if (filterArgs.length === 2 && forEacArgs.length === 1) {
        moduleName += 'WithFilterThis';
        alias += 'wmt';
    } else if (filterArgs.length === 1 && forEacArgs.length === 2) {
        moduleName += 'WithForEachThis';
        alias += 'wfet';
    } else if (filterArgs.length === 2 && forEacArgs.length === 2) {
        moduleName += 'WithFilterAndForEachThis';
        alias += 'wmfet';
    }

    const importedName = generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(arrayObject);
    filterArgs.forEach((arg) => args.push(arg));
    forEacArgs.forEach((arg) => args.push(arg));

    const filterForEachExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(filterForEachExpr);

    return true;
}
