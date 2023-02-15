import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { generateImport } from '../../utils/generateImport';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformJoin(path: NodePath<t.CallExpression>, joinArgs: Arguments, plugin: PluginPass): boolean {
    if (joinArgs.length > 1) {
        return false;
    }

    const separator = joinArgs[0];
    if (t.isSpreadElement(separator)) {
        return false;
    }

    const importedName = generateImport(plugin, path, 'arrayJoinHelper', 'ajh');

    const args = [];

    args.push((path.node.callee as t.MemberExpression).object);
    joinArgs.forEach((arg) => args.push(arg));

    const joinMap = t.callExpression(t.identifier(importedName), args);

    path.replaceWith(joinMap);

    return true;
}
