import { sep } from 'path';
import generate from '@babel/generator';
import { NodePath, PluginPass } from '@babel/core';

import { sendStatistic } from './sendStatistic';
import { PRESET_NAME, IGNORE_TRANSPILE_MODULES } from '../utils/consts';

const magicPath = `${sep}${PRESET_NAME}${sep}dist${sep}helpers${sep}`;

export function incStat(plugin: PluginPass, path: NodePath, transformation: string): void {
    if (transformation === IGNORE_TRANSPILE_MODULES && plugin.filename?.includes(magicPath)) {
        return;
    }

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
            code: pp?.getSource() || 'generated: ' + generate(path.node).code,
            line: loc?.start.line || 0,
            collumn: loc?.start.column || 0,
            transformation,
        };

        void sendStatistic(plugin, 'stats', stats);
    }
}
