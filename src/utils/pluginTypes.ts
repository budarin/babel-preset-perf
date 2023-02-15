import { PluginPass, BabelFile } from '@babel/core';

interface PluginFile extends BabelFile {
    stats: Record<string, number>;
    imports: Record<string, string>;
}

export interface PluginState extends PluginPass {
    file: PluginFile;
}
