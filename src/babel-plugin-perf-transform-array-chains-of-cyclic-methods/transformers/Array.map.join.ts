import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_SLICE_MAP_JOIN } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformMapJoin(
    path: NodePath<t.CallExpression>,
    arrayObject: t.Expression,
    mapArgs: Arguments,
    joinArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(mapArgs, path, plugin, ARRAY_SLICE_MAP_JOIN)) {
        return false;
    }

    const moduleName = 'arrayMapJoinHelper';
    const alias = 'amjh';

    const importedName =
        mapArgs.length > 1
            ? generateImport(plugin, path, `${moduleName}WithMapThis`, `${alias}wmt`)
            : generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(arrayObject);
    mapArgs.forEach((arg) => args.push(arg));
    joinArgs.forEach((arg) => args.push(arg));

    const mapJoinExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(mapJoinExpr);

    return true;
}
