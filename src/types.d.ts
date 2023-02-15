declare interface PluginOptions {
    name: string;
    target: 'node' | 'custom'; // 'browser'
    customTransformations?: string[];
    unsafeTransformations: boolean;
    verbose?: boolean;
    useStatsServer?:
        | {
              host: string;
              port: number;
          }
        | boolean
        | undefined;
}
