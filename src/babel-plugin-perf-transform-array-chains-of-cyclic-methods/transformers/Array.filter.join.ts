import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_FILTER_JOIN } from '../../utils/consts';
import type { Arguments } from '../../utils/arrgumentsType';

export function transformFilterJoin(
    path: NodePath<t.CallExpression>,
    arrayObject: t.Expression,
    filterArgs: Arguments,
    joinArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(filterArgs, path, plugin, ARRAY_FILTER_JOIN)) {
        return false;
    }

    const moduleName = 'arrayFilterJoinHelper';
    const alias = 'afjh';

    const importedName =
        filterArgs.length > 1
            ? generateImport(plugin, path, `${moduleName}WithFilterThis`, `${alias}wft`)
            : generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(arrayObject);
    filterArgs.forEach((arg) => args.push(arg));
    joinArgs.forEach((arg) => args.push(arg));

    const filterJoinExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(filterJoinExpr);

    return true;
}
