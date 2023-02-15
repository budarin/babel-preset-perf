import { NodePath, PluginPass } from '@babel/core';

export function logIt(plugin: PluginPass, path: NodePath): void {
    const { log } = console;
    const statement = path.getStatementParent() || path;

    log(' ');
    log('Source  :', plugin.filename);
    log(
        'Code    :',
        statement.getSource(),
        statement.node.loc ? `[${statement.node.loc.start.line}:${statement.node.loc.start.column}]` : '',
    );
}
