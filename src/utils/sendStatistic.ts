/// <reference lib="dom" />

import { PluginPass } from '@babel/core';
import { defaultStatsServerHost, defaultStatsServerPort } from './consts';

let statsErrorCount = 0;

export function sendStatistic(plugin: PluginPass, endpoint: string, message: object): void {
    const { useStatsServer } = plugin.opts as PluginOptions;

    if (useStatsServer) {
        const config = (plugin.opts as PluginOptions).name;

        let host = defaultStatsServerHost;
        let port = defaultStatsServerPort;

        if (typeof useStatsServer === 'object') {
            host = useStatsServer.host;
            port = useStatsServer.port;
        }

        if (statsErrorCount === 3) {
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;
        const timer = setTimeout(() => {
            controller.abort();
        }, 30000);

        void fetch(`http://${host}:${port}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ config, ...message }),
            signal,
        })
            .catch((error) => {
                if (statsErrorCount > 2) {
                    return;
                }

                console.log('Error while connecting to the stats server:', error);
                statsErrorCount++;

                if (statsErrorCount === 3) {
                    const opts = plugin.opts as PluginOptions;
                    console.error(opts.name, ':', 'Stats server is not responding - stop sending stats to the server!');
                    opts.useStatsServer = undefined;

                    return;
                }
            })
            .finally(() => {
                clearTimeout(timer);
            });
    }
}
