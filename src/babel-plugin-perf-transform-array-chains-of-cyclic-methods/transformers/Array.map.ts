import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { generateImport } from '../../utils/generateImport';
import { ARRAY_MAP } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformMap(
    path: NodePath<t.CallExpression>,
    array: t.Expression,
    mapArgs: Arguments,
    plugin: PluginPass,
): boolean {
    if (!isValidPredicate(mapArgs, path, plugin, ARRAY_MAP)) {
        return false;
    }
    const moduleName = 'arrayMapHelper';
    const alias = 'amh';

    const importedName =
        mapArgs.length > 1
            ? generateImport(plugin, path, `${moduleName}WithMapThis`, `${alias}wmt`)
            : generateImport(plugin, path, moduleName, alias);

    const args = [];

    args.push(array);
    mapArgs.forEach((arg) => args.push(arg));

    const mapExpr = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(mapExpr);

    return true;
}
