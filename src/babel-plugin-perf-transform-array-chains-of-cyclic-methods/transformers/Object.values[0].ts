import * as t from '@babel/types';

import type { Arguments } from '../../utils/arrgumentsType';

import { NodePath, PluginPass } from '@babel/core';
import { generateImport } from '../../utils/generateImport';

/**
 * Object.values(obj)[0] -> objectValuesFirstItemHelper(obj)
 */

export function transformObjectValuesFirstItem(
    path: NodePath<t.MemberExpression>,
    objKeysArgs: Arguments,
    plugin: PluginPass,
): boolean {
    const obj = objKeysArgs[0] as t.Identifier | t.ObjectExpression;
    const helperName = generateImport(plugin, path, 'objectValuesFirstItemHelper', 'ovfih');

    path.replaceWith(t.callExpression(t.identifier(helperName), [obj]));

    return true;
}
