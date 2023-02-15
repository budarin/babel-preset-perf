import * as t from '@babel/types';
import { NodePath } from '@babel/core';

import { ASSIGN, OBJECT } from '../utils/consts';

/**
 *
 * from: {...obj, a: 1 }
 * to:   Object.assign({}, obj, { a: 1 } )
 *
 */
export function transformObjectExpressionWithSpread(path: NodePath<t.ObjectExpression>): boolean {
    if (path.node.properties.find((item) => t.isSpreadElement(item))) {
        const props = [];
        const objProps = [] as t.ObjectProperty[];

        props.push(t.objectExpression([]));
        let startCollectProps = false;

        const spreadElements = path.node.properties.filter((item) => t.isSpreadElement(item)).length;

        if (spreadElements < 2) {
            return false;
        }

        path.node.properties.forEach((item, idx, arr) => {
            if (t.isSpreadElement(item)) {
                if (startCollectProps) {
                    startCollectProps = false;
                    props.push(t.objectExpression([...objProps]));
                    objProps.length = 0;
                }

                props.push(item.argument);
            }

            if (t.isObjectProperty(item)) {
                if (startCollectProps === false) {
                    startCollectProps = true;
                }

                objProps.push(item);
            }

            if (idx === arr.length - 1 && startCollectProps) {
                props.push(t.objectExpression(objProps));
            }
        });

        path.replaceWith(t.callExpression(t.memberExpression(t.identifier(OBJECT), t.identifier(ASSIGN)), props));

        return true;
    }

    return false;
}
