import { NodePath, PluginPass } from '@babel/core';

import { sendStatistic } from './sendStatistic';

export function incStat(plugin: PluginPass, path: NodePath, transformation: string): void {
    const { useStatsServer } = plugin.opts as PluginOptions;

    if (useStatsServer) {
        let pp = path;

        try {
            pp = path.getStatementParent() || path;
        } catch (error) {
            //
        }

        const loc = path.node.loc || pp?.node.loc;

        const stats = {
            config: (plugin.opts as PluginOptions).name,
            module: plugin.filename || 'unknown',
            code: pp?.getSource() || 'Inserted helper declatartion',
            line: loc?.start.line || 0,
            collumn: loc?.start.column || 0,
            transformation,
        };

        void sendStatistic(plugin, 'stats', stats);
    }
}
