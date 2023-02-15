import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_FILTER_LENGTH } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformFilterLength(
    path: NodePath<t.MemberExpression>,
    arrayObject: t.Expression,
    filterArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(filterArgs, path, plugin, ARRAY_FILTER_LENGTH)) {
        return false;
    }

    const moduleName = 'arrayFilterLengthHelper';
    const alias = 'aflh';

    const importedName =
        filterArgs.length > 1
            ? generateImport(plugin, path, `${moduleName}WithFilterThis`, `${alias}wft`)
            : generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(arrayObject);
    filterArgs.forEach((arg) => args.push(arg));

    const filterJoinExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(filterJoinExpr);

    return true;
}
