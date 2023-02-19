declare interface PluginOptions {
    name: string;
    target: 'node' | 'custom'; // 'browser'
    transformationsList?: string[];
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
