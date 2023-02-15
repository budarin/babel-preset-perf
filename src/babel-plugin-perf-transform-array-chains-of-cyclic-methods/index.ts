import crypto = require('crypto');

import * as t from '@babel/types';
import { PluginState } from '../utils/pluginTypes';
import { declare } from '@babel/helper-plugin-utils';

import {
    NOT,
    MAP,
    JOIN,
    SLICE,
    EQUAL,
    EVERY,
    LOWER,
    FILTER,
    REDUCE,
    OBJECT,
    VALUES,
    LENGTH,
    ENTRIES,
    BOOLEAN,
    FOREACH,
    GREATER,
    NOT_EQUAL,
    ARRAY_MAP,
    ARRAY_JOIN,
    ARRAY_MAP_JOIN,
    ARRAY_FILTER_MAP,
    ARRAY_MAP_FILTER,
    ARRAY_MAP_REDUCE,
    ARRAY_SLICE_EVERY,
    ARRAY_FILTER_JOIN,
    ARRAY_MAP_FOREACH,
    ARRAY_FILTER_REDUCE,
    ARRAY_FILTER_LENGTH,
    ARRAY_FILTER_FOREACH,
    ARRAY_SLICE_MAP_JOIN,
    ARRAY_FILTER_MAP_JOIN,
    ARRAY_MAP_FILTER_JOIN,
    ARRAY_MAP_UNFOLD,
    ARRAY_JOIN_UNFOLD,
    ARRAY_FILTER_LENGTH_AS_BOOLEAN,
    OBJECT_ENTRIES_MAP,
    OBJECT_ENTRIES_REDUCE,
    OBJECT_ENTRIES_FOREACH,
    OBJECT_ENTRIES_FILTER_MAP_JOIN,
    OBJECT_VALUES_FIRST_ITEM,
    STRING_SLICE,
    pluginsConfig,
    ARRAY_MAP_JOIN_UNFOLD,
} from '../utils/consts';

import { incStat } from '../utils/incStat';
import { validateOptions } from '../utils/validateOptions';
import { checkPreviousMethod } from '../utils/checkPreviusMethod';
import { hasPluginNoTrasformComment } from '../utils/hasPluginNoTrasformComment';
import { isOneOfLogicalOpatorsWithOperand } from '../utils/isOneOfLogicalOpatorsWithOperand';

import { transformMap } from './transformers/Array.map';
import { transformJoin } from './transformers/Array.join';
import { getProgramVisitor } from '../utils/getProgramVisitor';
import { transformMapJoin } from './transformers/Array.map.join';
import { transformStringSlice } from './transformers/String.slice';
import { transformMapFilter } from './transformers/Array.map.filter';
import { transformMapReduce } from './transformers/Array.map.reduce';
import { transformFilterMap } from './transformers/Array.filter.map';
import { transformMapForEach } from './transformers/Array.map.forEach';
import { transformFilterJoin } from './transformers/Array.filter.join';
import { transformSliceEvery } from './transformers/Array.slice.every';
import { transformMapUnfoldArray } from './transformers/Array.map unfold';
import { transformFilterReduce } from './transformers/Array.filter.reduce';
import { transformFilterLength } from './transformers/Array.filter.length';
import { transformSliceMapJoin } from './transformers/Array.slice.map.join';
import { transformJoinUnfoldArray } from './transformers/Array.join unfold';
import { transformFilterForEach } from './transformers/Array.filter.forEach';
import { transformFilterMapJoin } from './transformers/Array.filter.map.join';
import { transformMapFilterJoin } from './transformers/Array.map.filter.join';
import { transformObjectEntriesMap } from './transformers/Object.entries.map';
import { transformObjectValuesFirstItem } from './transformers/Object.values[0]';
import { transformMapJoinUnfoldArray } from './transformers/Array.map.join unfold';
import { transformObjectEntriesReduce } from './transformers/Object.entries.reduce';
import { transformObjectEntriesForEach } from './transformers/Object.entries.forEach';
import { transformFilterLengthAsBoolean } from './transformers/Array.filter.length as boolean';
import { transformObjectEntriesFilterMapJoin } from './transformers/Object.entries.filter.map.join';

export default declare((api, options: PluginOptions) => {
    api.assertVersion(7);

    validateOptions(options);

    if (!options.name) {
        options.name = 'unamed_config';
    }
    options.name = `${options.name}_${crypto.randomUUID()}`;

    return {
        name: 'babel-plugin-perf-transform-array-chains-of-cyclic-methods',

        pre: function (): void {
            (this as PluginState).file.imports = {};
        },

        post: function (): void {},

        /* eslint-disable */
        manipulateOptions: (_, parserOpts) => {
            parserOpts.plugins.push('jsx');
        },
        /* eslint-enable */

        visitor: {
            Program: {
                ...getProgramVisitor(),
                ...{
                    exit(path): void {
                        path.data = {};
                    },
                },
            },

            MemberExpression: {
                enter(path): void {
                    if (t.isIdentifier(path.node.property, { name: LENGTH }) && t.isCallExpression(path.node.object)) {
                        const level1Expr = path.node.object;

                        if (t.isMemberExpression(level1Expr.callee) && t.isIdentifier(level1Expr.callee.property)) {
                            switch (level1Expr.callee.property.name) {
                                case FILTER: {
                                    if (pluginsConfig['Array.filter.length as boolean']) {
                                        if (
                                            path.parentPath &&
                                            t.isUnaryExpression(path.parent) &&
                                            path.parent.operator === NOT &&
                                            path.parent.prefix === true &&
                                            path.parentPath.parentPath &&
                                            t.isUnaryExpression(path.parentPath.parent) &&
                                            path.parentPath.parent.operator === NOT &&
                                            path.parentPath.parent.prefix === true &&
                                            transformFilterLengthAsBoolean(
                                                this,
                                                path.parentPath.parentPath,
                                                level1Expr.callee.object,
                                                level1Expr.arguments,
                                            )
                                        ) {
                                            incStat(this, path, ARRAY_FILTER_LENGTH_AS_BOOLEAN);
                                            return;
                                        }

                                        if (
                                            path.parentPath &&
                                            t.isCallExpression(path.parent) &&
                                            t.isIdentifier(path.parent.callee, { name: BOOLEAN }) &&
                                            transformFilterLengthAsBoolean(
                                                this,
                                                path.parentPath,
                                                level1Expr.callee.object,
                                                level1Expr.arguments,
                                            )
                                        ) {
                                            incStat(this, path, ARRAY_FILTER_LENGTH_AS_BOOLEAN);
                                            return;
                                        }

                                        if (
                                            path.parentPath &&
                                            t.isBinaryExpression(path.parent) &&
                                            isOneOfLogicalOpatorsWithOperand(path.parentPath, [EQUAL], 0) &&
                                            transformFilterLengthAsBoolean(
                                                this,
                                                path.parentPath,
                                                level1Expr.callee.object,
                                                level1Expr.arguments,
                                                true,
                                            )
                                        ) {
                                            incStat(this, path, ARRAY_FILTER_LENGTH_AS_BOOLEAN);
                                            return;
                                        }

                                        if (
                                            path.parentPath &&
                                            t.isBinaryExpression(path.parent) &&
                                            isOneOfLogicalOpatorsWithOperand(
                                                path.parentPath,
                                                [GREATER, LOWER, NOT_EQUAL],
                                                0,
                                            ) &&
                                            transformFilterLengthAsBoolean(
                                                this,
                                                path.parentPath,
                                                level1Expr.callee.object,
                                                level1Expr.arguments,
                                            )
                                        ) {
                                            incStat(this, path, ARRAY_FILTER_LENGTH_AS_BOOLEAN);
                                            return;
                                        }

                                        if (
                                            (t.isConditionalExpression(path.parent) ||
                                                t.isIfStatement(path.parent) ||
                                                t.isLogicalExpression(path.parent) ||
                                                (t.isUnaryExpression(path.parent) &&
                                                    path.parent.operator === NOT &&
                                                    path.parent.prefix === true)) &&
                                            transformFilterLengthAsBoolean(
                                                this,
                                                path,
                                                level1Expr.callee.object,
                                                level1Expr.arguments,
                                            )
                                        ) {
                                            incStat(this, path, ARRAY_FILTER_LENGTH_AS_BOOLEAN);
                                            return;
                                        }
                                    }

                                    if (
                                        pluginsConfig['Array.filter.length'] &&
                                        transformFilterLength(
                                            path,
                                            level1Expr.callee.object,
                                            level1Expr.arguments,
                                            this,
                                        )
                                    ) {
                                        incStat(this, path, ARRAY_FILTER_LENGTH);
                                        return;
                                    }

                                    break;
                                }

                                default:
                                    break;
                            }
                        }
                    }

                    if (
                        path.node.computed === true &&
                        t.isNumericLiteral(path.node.property, { value: 0 }) &&
                        t.isCallExpression(path.node.object) &&
                        t.isMemberExpression(path.node.object.callee) &&
                        t.isIdentifier(path.node.object.callee.object, { name: OBJECT }) &&
                        t.isIdentifier(path.node.object.callee.property)
                    ) {
                        switch (path.node.object.callee.property.name) {
                            case VALUES: {
                                if (
                                    pluginsConfig['Object.values[0]'] &&
                                    transformObjectValuesFirstItem(path, path.node.object.arguments, this)
                                ) {
                                    incStat(this, path, OBJECT_VALUES_FIRST_ITEM);
                                    return;
                                }

                                break;
                            }

                            default:
                                break;
                        }
                    }
                },
            },

            CallExpression: {
                enter(path): void {
                    if (hasPluginNoTrasformComment(path)) {
                        path.skip();
                        return;
                    }

                    if (t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.property)) {
                        const level1Expr = path.node.callee.object;

                        switch (path.node.callee.property.name) {
                            case JOIN: {
                                if (
                                    t.isCallExpression(level1Expr) &&
                                    t.isMemberExpression(level1Expr.callee) &&
                                    t.isIdentifier(level1Expr.callee.property)
                                ) {
                                    const level2Expr = level1Expr.callee.object;

                                    switch (level1Expr.callee.property.name) {
                                        case FILTER: {
                                            if (
                                                t.isCallExpression(level2Expr) &&
                                                t.isMemberExpression(level2Expr.callee) &&
                                                t.isIdentifier(level2Expr.callee.property)
                                            ) {
                                                const level3Expr = level2Expr.callee.object;

                                                switch (level2Expr.callee.property.name) {
                                                    case MAP: {
                                                        if (
                                                            pluginsConfig['Array.map.filter.join'] &&
                                                            transformMapFilterJoin(
                                                                path,
                                                                level3Expr,
                                                                level2Expr.arguments,
                                                                level1Expr.arguments,
                                                                path.node.arguments,
                                                                this,
                                                            )
                                                        ) {
                                                            incStat(this, path, ARRAY_MAP_FILTER_JOIN);
                                                            return;
                                                        }

                                                        break;
                                                    }

                                                    default:
                                                        break;
                                                }
                                            }

                                            if (
                                                pluginsConfig['Array.filter.join'] &&
                                                transformFilterJoin(
                                                    path,
                                                    level2Expr,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, ARRAY_FILTER_JOIN);
                                                return;
                                            }

                                            break;
                                        }

                                        case MAP: {
                                            if (
                                                t.isCallExpression(level2Expr) &&
                                                t.isMemberExpression(level2Expr.callee) &&
                                                t.isIdentifier(level2Expr.callee.property)
                                            ) {
                                                const level3Expr = level2Expr.callee.object;

                                                switch (level2Expr.callee.property.name) {
                                                    case FILTER: {
                                                        if (
                                                            pluginsConfig['Object.entries.filter.map.join'] &&
                                                            t.isCallExpression(level3Expr) &&
                                                            t.isMemberExpression(level3Expr.callee) &&
                                                            t.isIdentifier(level3Expr.callee.object, {
                                                                name: OBJECT,
                                                            }) &&
                                                            transformObjectEntriesFilterMapJoin(
                                                                path,
                                                                level3Expr.arguments,
                                                                level2Expr.arguments,
                                                                level1Expr.arguments,
                                                                path.node.arguments,
                                                                this,
                                                            )
                                                        ) {
                                                            incStat(this, path, OBJECT_ENTRIES_FILTER_MAP_JOIN);
                                                            return;
                                                        }

                                                        if (
                                                            pluginsConfig['Array.filter.map.join'] &&
                                                            transformFilterMapJoin(
                                                                path,
                                                                level3Expr,
                                                                level2Expr.arguments,
                                                                level1Expr.arguments,
                                                                path.node.arguments,
                                                                this,
                                                            )
                                                        ) {
                                                            incStat(this, path, ARRAY_FILTER_MAP_JOIN);
                                                            return;
                                                        }

                                                        break;
                                                    }

                                                    case SLICE: {
                                                        if (
                                                            pluginsConfig['Array.slice.map.join'] &&
                                                            transformSliceMapJoin(
                                                                path,
                                                                level3Expr,
                                                                level2Expr.arguments,
                                                                level1Expr.arguments,
                                                                path.node.arguments,
                                                                this,
                                                            )
                                                        ) {
                                                            incStat(this, path, ARRAY_SLICE_MAP_JOIN);
                                                            return;
                                                        }
                                                        break;
                                                    }

                                                    default:
                                                        break;
                                                }
                                            }

                                            if (
                                                pluginsConfig['Array.map.join unfold'] &&
                                                t.isArrayExpression(level2Expr) &&
                                                level2Expr.elements.every((el) => t.isSpreadElement(el) === false) &&
                                                transformMapJoinUnfoldArray(
                                                    path,
                                                    level2Expr.elements as (t.Expression | null)[],
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, ARRAY_MAP_JOIN_UNFOLD);
                                                return;
                                            }

                                            if (
                                                pluginsConfig['Array.map.join'] &&
                                                transformMapJoin(
                                                    path,
                                                    level2Expr,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, ARRAY_MAP_JOIN);
                                                return;
                                            }

                                            break;
                                        }

                                        default:
                                            break;
                                    }
                                }

                                if (
                                    pluginsConfig['Array.join unfold'] &&
                                    t.isArrayExpression(path.node.callee.object) &&
                                    path.node.callee.object.elements.every((el) => t.isSpreadElement(el) === false) &&
                                    transformJoinUnfoldArray(
                                        path,
                                        path.node.callee.object.elements as (t.Expression | null)[],
                                        path.node.arguments,
                                    )
                                ) {
                                    incStat(this, path, ARRAY_JOIN_UNFOLD);
                                    return;
                                }

                                if (pluginsConfig['Array.join'] && transformJoin(path, path.node.arguments, this)) {
                                    incStat(this, path, ARRAY_JOIN);
                                    return;
                                }

                                break;
                            }

                            case FILTER: {
                                if (
                                    t.isCallExpression(level1Expr) &&
                                    t.isMemberExpression(level1Expr.callee) &&
                                    t.isIdentifier(level1Expr.callee.property)
                                ) {
                                    const level2Expr = level1Expr.callee.object;

                                    switch (level1Expr.callee.property.name) {
                                        case MAP: {
                                            if (
                                                pluginsConfig['Array.map.filter'] &&
                                                transformMapFilter(
                                                    path,
                                                    level2Expr,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, ARRAY_MAP_FILTER);
                                                return;
                                            }

                                            break;
                                        }

                                        default:
                                            break;
                                    }
                                }

                                break;
                            }

                            case REDUCE: {
                                if (
                                    t.isCallExpression(level1Expr) &&
                                    t.isMemberExpression(level1Expr.callee) &&
                                    t.isIdentifier(level1Expr.callee.property)
                                ) {
                                    const level2Expr = level1Expr.callee.object;

                                    switch (level1Expr.callee.property.name) {
                                        case FILTER: {
                                            if (
                                                pluginsConfig['Array.filter.reduce'] &&
                                                transformFilterReduce(
                                                    path,
                                                    level2Expr,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, ARRAY_FILTER_REDUCE);
                                                return;
                                            }

                                            break;
                                        }

                                        case MAP: {
                                            if (
                                                pluginsConfig['Array.map.reduce'] &&
                                                transformMapReduce(
                                                    path,
                                                    level2Expr,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, ARRAY_MAP_REDUCE);
                                                return;
                                            }

                                            break;
                                        }

                                        case ENTRIES: {
                                            if (
                                                pluginsConfig['Object.entries.reduce'] &&
                                                t.isIdentifier(level2Expr, { name: OBJECT }) &&
                                                transformObjectEntriesReduce(
                                                    path,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, OBJECT_ENTRIES_REDUCE);
                                                return;
                                            }
                                            break;
                                        }

                                        default:
                                            break;
                                    }
                                }

                                break;
                            }

                            case FOREACH: {
                                if (
                                    t.isCallExpression(level1Expr) &&
                                    t.isMemberExpression(level1Expr.callee) &&
                                    t.isIdentifier(level1Expr.callee.property)
                                ) {
                                    const level2Expr = level1Expr.callee.object;

                                    switch (level1Expr.callee.property.name) {
                                        case FILTER: {
                                            if (
                                                pluginsConfig['Array.filter.forEach'] &&
                                                transformFilterForEach(
                                                    path,
                                                    level2Expr,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, ARRAY_FILTER_FOREACH);
                                                return;
                                            }

                                            break;
                                        }
                                        case MAP: {
                                            if (
                                                pluginsConfig['Array.map.forEach'] &&
                                                transformMapForEach(
                                                    path,
                                                    level2Expr,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, ARRAY_MAP_FOREACH);
                                                return;
                                            }

                                            break;
                                        }

                                        case ENTRIES: {
                                            if (
                                                pluginsConfig['Object.entries.forEach'] &&
                                                t.isIdentifier(level2Expr, { name: OBJECT }) &&
                                                transformObjectEntriesForEach(
                                                    path,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, OBJECT_ENTRIES_FOREACH);
                                                return;
                                            }

                                            break;
                                        }

                                        default:
                                            break;
                                    }
                                }

                                break;
                            }

                            case MAP: {
                                if (
                                    t.isCallExpression(level1Expr) &&
                                    t.isMemberExpression(level1Expr.callee) &&
                                    t.isIdentifier(level1Expr.callee.property)
                                ) {
                                    const level2Expr = level1Expr.callee.object;

                                    switch (level1Expr.callee.property.name) {
                                        case FILTER: {
                                            if (
                                                pluginsConfig['Array.filter.map'] &&
                                                transformFilterMap(
                                                    path,
                                                    level2Expr,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, ARRAY_FILTER_MAP);
                                                return;
                                            }

                                            break;
                                        }

                                        case ENTRIES: {
                                            if (
                                                pluginsConfig['Object.entries.map'] &&
                                                t.isIdentifier(level2Expr, { name: OBJECT }) &&
                                                transformObjectEntriesMap(
                                                    path,
                                                    level1Expr.arguments,
                                                    path.node.arguments,
                                                    this,
                                                )
                                            ) {
                                                incStat(this, path, OBJECT_ENTRIES_MAP);
                                                return;
                                            }

                                            break;
                                        }

                                        default:
                                            break;
                                    }
                                }

                                if (
                                    pluginsConfig['Array.map unfold'] &&
                                    t.isArrayExpression(level1Expr) &&
                                    level1Expr.elements.some((el) => t.isSpreadElement(el)) === false &&
                                    transformMapUnfoldArray(
                                        path,
                                        level1Expr.elements as (t.Expression | null)[],
                                        path.node.arguments,
                                        this,
                                    )
                                ) {
                                    incStat(this, path, ARRAY_MAP_UNFOLD);
                                    return;
                                }

                                if (
                                    pluginsConfig['Array.map'] &&
                                    transformMap(path, level1Expr, path.node.arguments, this)
                                ) {
                                    incStat(this, path, ARRAY_MAP);
                                    return;
                                }

                                break;
                            }

                            case EVERY: {
                                if (t.isCallExpression(level1Expr) && t.isMemberExpression(level1Expr.callee)) {
                                    const level2Expr = level1Expr.callee.object;

                                    if (
                                        pluginsConfig['Array.slice.every'] &&
                                        checkPreviousMethod(level1Expr, SLICE) &&
                                        transformSliceEvery(
                                            path,
                                            level2Expr,
                                            level1Expr.arguments,
                                            path.node.arguments,
                                            this,
                                        )
                                    ) {
                                        incStat(this, path, ARRAY_SLICE_EVERY);
                                        return;
                                    }
                                }

                                break;
                            }

                            case SLICE: {
                                if (
                                    pluginsConfig['String.slice'] &&
                                    transformStringSlice(path, level1Expr, path.node.arguments, this)
                                ) {
                                    incStat(this, path, STRING_SLICE);
                                    return;
                                }

                                break;
                            }

                            default:
                                break;
                        }
                    }
                },
            },
        },
    };
});
