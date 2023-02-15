import * as t from '@babel/types';
import { Scope } from '@babel/traverse';
import { NodePath, PluginPass } from '@babel/core';

import { getFilePath } from './getFilePath';
import { PluginState } from './pluginTypes';

function isDefined(url: string, scope: Scope): string | undefined {
    const requiredIdentificatorname = Object.keys(scope.bindings).find((key) => {
        const binding = scope.bindings[key];
        return (
            (binding.kind === 'const' || binding.kind === 'var' || binding.kind === 'let') &&
            t.isVariableDeclarator(binding.path.node) &&
            t.isCallExpression(binding.path.node.init) &&
            t.isStringLiteral(binding.path.node.init.arguments[0]) &&
            binding.path.node.init.arguments[0].value === url
        );
    });

    return requiredIdentificatorname || (scope.parent && isDefined(url, scope.parent));
}

export function generateImport(plugin: PluginPass, path: NodePath<t.Node>, defaultName: string, alias: string): string {
    const url = getFilePath(defaultName);
    const importedAs = (plugin as PluginState).file.imports[defaultName];

    if (importedAs) {
        return importedAs;
    }

    let importedName = defaultName;

    const foundBindingName = isDefined(url, path.scope);

    if (foundBindingName) {
        importedName = foundBindingName;
    } else {
        const program = plugin.file.path;
        const aliasdName = plugin.file.scope.generateUidIdentifier(alias).name;

        const requiredNode = t.variableDeclaration('const', [
            t.variableDeclarator(
                t.objectPattern([t.objectProperty(t.identifier(importedName), t.identifier(aliasdName))]),
                t.callExpression(t.identifier('require'), [t.stringLiteral(url)]),
            ),
        ]);

        importedName = aliasdName;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        program.unshiftContainer('body', requiredNode);

        (plugin as PluginState).file.imports[defaultName] = importedName;
    }

    return importedName;
}
