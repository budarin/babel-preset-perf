import chalk = require('chalk');
import * as t from '@babel/types';
import { NodePath, PluginPass, Visitor } from '@babel/core';

import { sendStatistic } from './sendStatistic';

import { PRESET_NAME } from './consts';
import type { Arguments } from './arrgumentsType';

const wellKnownPredicates = ['String', 'Boolean', 'Number'];

type WarningMessage = {
    warning: string;
    module: string;
    code: string;
    line: number;
    collumn: number;
    transformation: string;
    action: string;
};

function sendWarningToStatsServer(plugin: PluginPass, warning: WarningMessage): void {
    const { useStatsServer } = plugin.opts as PluginOptions;

    if (useStatsServer) {
        void sendStatistic(plugin, 'warning', warning);
    }
}

const checkReferencedParam: Visitor<{ param: string; data: Record<string, boolean> }> = {
    Function(path): void {
        this.data[this.param] = path.scope.bindings[this.param].referenced;
    },
};

function setPathDataParamsCount(path: NodePath<t.Node>, paramsCount: number): void {
    if (path.data) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        path.data.paramsCount = paramsCount;
    } else {
        path.data = { paramsCount };
    }
}

function checkParams(
    path: NodePath<t.Node>,
    bindingPath: NodePath<t.Node>,
    params: Arguments,
    plugin: PluginPass,
    validParamsCount: number,
    isVerbose: boolean,
    transformationType: string,
): boolean {
    setPathDataParamsCount(path, params.length);

    if (params.length > validParamsCount) {
        const extraParmName = (params[validParamsCount] as t.Identifier).name;

        const data = {} as Record<string, boolean>;

        bindingPath.traverse(checkReferencedParam, {
            param: extraParmName,
            data,
        });

        if (data[extraParmName] === false) {
            setPathDataParamsCount(path, validParamsCount);
            return true;
        }

        const warning = `predicate has more than ${validParamsCount} params! ( ${params
            .map((param) => (param as t.Identifier).name)
            .join(', ')} )`;
        const action = 'the statement will not be transformed';

        const warningMessage = {
            warning,
            module: plugin.filename as string,
            transformation: transformationType,
            code: bindingPath.getSource(),
            line: bindingPath.node.loc?.start.line || 0,
            collumn: bindingPath.node.loc?.start.column || 0,
            action,
        };
        void sendWarningToStatsServer(plugin, warningMessage);

        if (isVerbose) {
            const code =
                bindingPath.getSource() +
                (bindingPath.node.loc
                    ? `  [${bindingPath.node.loc.start.line}:${bindingPath.node.loc.start.column}]`
                    : '');

            console.warn(chalk.yellow(`${PRESET_NAME} warning:`));
            console.warn('Transformation :', transformationType);
            console.warn('Warning        :', warning);
            console.warn('Module         :', plugin.filename);
            console.warn('Code           :', code);
            console.warn('action         :', action);
            console.log('');
        }

        return false;
    }

    return true;
}

export function isValidPredicate(
    args: Arguments,
    path: NodePath<t.Node>,
    plugin: PluginPass,
    transformationType: string,
    validParamsCount = 2,
): boolean {
    const verbose = (plugin.opts as PluginOptions)['verbose'];
    const isVerbose = Boolean(verbose === undefined ? true : verbose);

    const thisArg = args[1];
    if (thisArg) {
        if (t.isFunction(thisArg)) {
            const action = 'the statement will not be transformed';
            const warningMessage = {
                warning: 'method has non object second parameter',
                module: plugin.filename as string,
                transformation: transformationType,
                code: path.getSource(),
                line: path.node.loc?.start.line || 0,
                collumn: path.node.loc?.start.column || 0,
                action,
            };
            void sendWarningToStatsServer(plugin, warningMessage);

            if (isVerbose) {
                const code =
                    path.getSource() +
                    (path.node.loc ? `  [${path.node.loc.start.line}:${path.node.loc.start.column}]` : '');

                console.warn(chalk.yellow(`${PRESET_NAME} warning:`));
                console.warn('Transformation :', transformationType);
                console.warn('Warning        : method has non object second parameter');
                console.warn('Module         :', plugin.filename);
                console.warn('Code           :', code);
                console.warn('action         :', action);
                console.log('');
            }

            return false;
        }

    }

    let predicate = args[0] as t.Expression | t.SpreadElement | t.JSXNamespacedName | t.ArgumentPlaceholder | undefined;

    if (t.isIdentifier(predicate)) {
        const predicateName = predicate.name;

        if (wellKnownPredicates.includes(predicateName)) {
            setPathDataParamsCount(path, 1);
            return true;
        }

        let binding = path.scope.bindings[predicateName];
        let parentPath: NodePath<t.Node> | null = path.parentPath;

        predicate = undefined;
        while (!binding && parentPath) {
            binding = parentPath.scope.bindings[predicateName];

            if (binding) {
                break;
            }

            parentPath = parentPath.parentPath;
        }

        if (binding) {
            if (t.isFunctionDeclaration(binding.path.node)) {
                return checkParams(
                    path,
                    binding.path,
                    binding.path.node.params as Arguments,
                    plugin,
                    validParamsCount,
                    isVerbose,
                    transformationType,
                );
            }

            if (t.isVariableDeclarator(binding.path.node) && t.isArrowFunctionExpression(binding.path.node.init)) {
                return checkParams(
                    path,
                    binding.path,
                    binding.path.node.init.params as Arguments,
                    plugin,
                    validParamsCount,
                    isVerbose,
                    transformationType,
                );
            }
        }

        if (!predicate) {
            const warning = `predicate has unknown params! ( ${predicateName} )`;
            const action = 'the statement will not be transformed';

            const warningMessage = {
                warning,
                module: plugin.filename as string,
                transformation: transformationType,
                code: path.getSource(),
                line: path.node.loc?.start.line || 0,
                collumn: path.node.loc?.start.column || 0,
                action,
            };
            void sendWarningToStatsServer(plugin, warningMessage);

            if (isVerbose) {
                const code =
                    path.getSource() +
                    (path.node.loc ? `  [${path.node.loc.start.line}:${path.node.loc.start.column}]` : '');

                console.warn(chalk.yellow(`${PRESET_NAME} warning:`));
                console.warn('Transformation :', transformationType);
                console.warn(`Warning        :`, warning);
                console.warn('Module         :', plugin.filename);
                console.warn('Code           :', code);
                console.warn('action         :', action);
                console.log('');
            }

            return false;
        }
    }

    if (t.isFunction(predicate)) {
        return checkParams(
            path,
            path,
            predicate.params as Arguments,
            plugin,
            validParamsCount,
            isVerbose,
            transformationType,
        );
    }

    return true;
}
