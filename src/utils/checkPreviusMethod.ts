import * as t from '@babel/types';

export function checkPreviousMethod(expr: t.CallExpression, methodName: string): boolean {
    if (t.isMemberExpression(expr.callee) && t.isIdentifier(expr.callee.property, { name: methodName })) {
        return true;
    }

    return false;
}
