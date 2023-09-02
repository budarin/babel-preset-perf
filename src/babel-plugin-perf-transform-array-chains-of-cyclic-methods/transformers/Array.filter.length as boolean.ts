import * as t from '@babel/types';
import { NodePath, PluginPass } from '@babel/core';

import { isValidPredicate } from '../../utils/isValidPredicate';
import { ARRAY_FILTER_LENGTH_AS_BOOLEAN, NOT, SOME } from '../../utils/consts';

import type { Arguments } from '../../utils/arrgumentsType';

export function transformFilterLengthAsBoolean(
    plugin: PluginPass,
    path: NodePath<t.Node>,
    array: t.Expression,
    filterArgs: Arguments,
    isNegative = false,
): boolean {
    if (!isValidPredicate(filterArgs, path, plugin, ARRAY_FILTER_LENGTH_AS_BOOLEAN)) {
        return false;
    }

    const someExpr = t.callExpression(t.memberExpression(array, t.identifier(SOME)), filterArgs);
    const filterAsBoolean = isNegative ? t.unaryExpression(NOT, someExpr) : someExpr;

    path.replaceWith(filterAsBoolean);

    return true;
}
