import {
    PRESET_NAME,
    pluginsConfig,
    wholeListOfTransformations,
    nodeTargetAllTransformationsList,
    nodeTargetSafeTransformationsList,
} from './consts';

export function validateOptions(options: PluginOptions): PluginOptions {
    const { target, name, verbose, unsafeTransformations, useStatsServer } = options;

    if ('customTransformations' in options) {
        throw new Error(`${PRESET_NAME}: customTransformations is deprecated, please use transformationsList instead!`);
    }

    if (target === undefined) {
        options['target'] = 'node';
    }

    if (name === undefined) {
        options['name'] = 'unamed_config' + '_' + crypto.randomUUID();
    }

    if (verbose === undefined) {
        options['verbose'] = false;
    }

    if (useStatsServer === undefined) {
        options['useStatsServer'] = false;
    }

    if (unsafeTransformations === undefined) {
        options['unsafeTransformations'] = false;
    }

    if (typeof options['verbose'] !== 'boolean') {
        throw new Error(`${PRESET_NAME}: options.verbose must be Boolean type!`);
    }

    if (
        typeof options['useStatsServer'] === 'object' &&
        (!options['useStatsServer']['host'] || typeof options['useStatsServer']['host'] !== 'string')
    ) {
        throw new Error(`${PRESET_NAME}: options.useStatsServer must have host option of string type!`);
    }

    if (
        typeof options['useStatsServer'] === 'object' &&
        (!options['useStatsServer']['port'] || typeof options['useStatsServer']['port'] !== 'number')
    ) {
        throw new Error(`${PRESET_NAME}: options.useStatsServer must have port option of number type!`);
    }

    if (!['node', 'custom'].includes(options['target'])) {
        throw new Error(`${PRESET_NAME} options.target must be a string of one of the: 'node' | 'custom' !`);
    }

    if (options['target'] === 'custom') {
        if (!options['transformationsList'] || !Array.isArray(options['transformationsList'])) {
            throw new Error(`${PRESET_NAME}: options.transformations must be array of transformation names!`);
        }

        if (
            options['transformationsList'].length > 0 &&
            !options['transformationsList'].every((x) => {
                return wholeListOfTransformations.includes(x);
            })
        ) {
            throw new Error(`${PRESET_NAME}: options.transformations must be array of transformation names!`);
        }

        options['transformationsList'].forEach((transformationName) => {
            pluginsConfig[transformationName as keyof typeof pluginsConfig] = true;
        });
    }

    type ConfigKey = keyof typeof pluginsConfig;

    if (options['target'] === 'node') {
        const listOfPlugings = options['unsafeTransformations']
            ? nodeTargetAllTransformationsList
            : nodeTargetSafeTransformationsList;

        listOfPlugings.forEach((transformationName) => {
            if (pluginsConfig[transformationName as ConfigKey] !== undefined) {
                pluginsConfig[transformationName as ConfigKey] = true;
            }
        });
    }

    return options;
}
