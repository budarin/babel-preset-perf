import * as t from '@babel/types';
import { NodePath } from '@babel/core';
import { EQUAL, SLICE } from '../utils/consts';

/**
 *
 * const [a, b = 1, ...c] = variable;
 *
 * replaces with
 *
 * const a = variable[0],
 *       b = variable[1] === undefined ? 1 : variable[1],
 *       c = variable(2);
 *
 */

export function transformArrayDestructuring(path: NodePath<t.ArrayPattern>): boolean {
    if (
        t.isVariableDeclarator(path.parent) &&
        path.node.elements.length > 0 &&
        path.node.elements.every((element) => {
            return (
                (element === null ||
                    t.isAssignmentPattern(element) ||
                    t.isIdentifier(element) ||
                    (t.isRestElement(element) && t.isIdentifier(element.argument))) &&
                !t.isRestElement(path.parentPath)
            );
        })
    ) {
        const arr = path.parent.init;

        if (arr === null || arr === undefined) {
            return false;
        }

        let arrayName: t.Identifier | null = null;
        const declarations = [] as t.VariableDeclarator[];
        const isArrayOrFunction = t.isCallExpression(arr) || t.isArrayExpression(arr);

        if (isArrayOrFunction) {
            arrayName = path.scope.generateUidIdentifier('a');
            declarations.push(t.variableDeclarator(arrayName, arr));
        }

        const arrObject = (isArrayOrFunction ? arrayName : arr) as t.Expression;

        path.node.elements.forEach((element, idx) => {
            if (element !== null) {
                switch (element.type) {
                    case 'Identifier': {
                        declarations.push(
                            t.variableDeclarator(element, t.memberExpression(arrObject, t.numericLiteral(idx), true)),
                        );

                        break;
                    }

                    case 'AssignmentPattern': {
                        declarations.push(
                            t.variableDeclarator(
                                element.left,
                                t.conditionalExpression(
                                    t.binaryExpression(
                                        EQUAL,
                                        t.memberExpression(arrObject, t.numericLiteral(idx), true),
                                        t.identifier('undefined'),
                                    ),
                                    element.right,
                                    t.memberExpression(arrObject, t.numericLiteral(idx), true),
                                ),
                            ),
                        );

                        break;
                    }

                    case 'RestElement': {
                        declarations.push(
                            t.variableDeclarator(
                                element.argument,
                                t.callExpression(t.memberExpression(arrObject, t.identifier(SLICE)), [
                                    t.numericLiteral(idx),
                                ]),
                            ),
                        );

                        break;
                    }

                    default:
                        break;
                }
            }
        });

        const varDecl = path.findParent((path) => t.isVariableDeclaration(path)) as NodePath<t.VariableDeclaration>;
        varDecl.node.declarations.splice(Number(path.parentPath.key), 1, ...declarations);

        return true;
    }

    return false;
}
