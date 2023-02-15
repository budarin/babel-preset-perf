import path = require('path');
import fastify from 'fastify';
import chalk = require('chalk');
import fs = require('fs-extra');
import { FromSchema } from 'json-schema-to-ts';

import { defaultStatsServerHost, defaultFileName, defaultStatsServerPort } from './utils/consts';

const args = process.argv.slice(2);
const server = fastify({ logger: args.includes('--verbose') });

type CodeInfo = {
    code: string;
    line: number;
    collumn: number;
};

type TransformationCodeInfo = {
    transformation: string;
} & CodeInfo;

type WarningByTransformationInfo = {
    module: string;
    warning: string;
    action?: string;
} & CodeInfo;

type WarningByModuleInfo = {
    transformation: string;
    warning: string;
    action?: string;
} & CodeInfo;

type Stattistics = {
    [key: string]: {
        summary: {
            transformations: {
                total: number;
                modules: number;
                transformationTypes: number;
                byTransformations: {
                    [key: string]: number;
                };
            };
            warnings: {
                total: number;
                modules: number;
                transformationtypes: number;
                byTransformations: {
                    [key: string]: number;
                };
            };
        };

        transformations?: {
            byTransformation: {
                total: number;
                transformationTypes: number;
                transformations: {
                    [key: string]: {
                        total: number;
                        byModules: {
                            [key: string]: CodeInfo[];
                        };
                    };
                };
            };
            byModules: {
                total: number;
                modules: {
                    [key: string]: {
                        total: number;
                        byTransformations: TransformationCodeInfo[];
                    };
                };
            };
        };

        warnings?: {
            total: number;
            byTransformation: {
                [key: string]: WarningByTransformationInfo[];
            };
            byModules: {
                [key: string]: WarningByModuleInfo[];
            };
        };
    };
};

let stattistics = {} as Stattistics;

server.get('/', () => {
    return stattistics;
});

server.post('/stop', (req) => {
    setTimeout(() => {
        void req.server.close();
    });

    return 'Ok';
});

server.post('/reset', () => {
    stattistics = {} as Stattistics;
    return 'Ok';
});

const statsBodySchema = {
    type: 'object',
    properties: {
        config: {
            type: 'string',
        },
        module: {
            type: 'string',
        },
        code: {
            type: 'string',
        },
        line: {
            type: 'integer',
        },
        collumn: {
            type: 'integer',
        },
        transformation: {
            type: 'string',
        },
    },
} as const;

const statsOptions = {
    schema: {
        body: statsBodySchema,
    },
};

server.post<{
    Body: Required<FromSchema<typeof statsBodySchema>>;
}>('/stats', statsOptions, (request) => {
    const body = request.body;
    const { config, transformation, module, code, line, collumn } = body;

    const configName = config.slice(0, -37);

    if (!stattistics[configName]) {
        stattistics[configName] = {
            summary: {
                transformations: {
                    total: 0,
                    modules: 0,
                    transformationTypes: 0,
                    byTransformations: {},
                },
                warnings: {
                    total: 0,
                    modules: 0,
                    transformationtypes: 0,
                    byTransformations: {},
                },
            },
            transformations: {
                byTransformation: {
                    total: 0,
                    transformationTypes: 0,
                    transformations: {},
                },
                byModules: {
                    total: 0,
                    modules: {},
                },
            },
        };
    }

    stattistics[configName].summary.transformations.total++;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stats = stattistics[configName].transformations!;

    if (!stats.byTransformation.transformations[transformation]) {
        stats.byTransformation.transformations[transformation] = {
            total: 0,
            byModules: {},
        };
        stats.byTransformation.transformationTypes++;

        stattistics[configName].summary.transformations.transformationTypes++;
        stattistics[configName].summary.transformations.byTransformations[transformation] = 0;
    }
    stats.byTransformation.total++;

    const theTransformation = stats.byTransformation.transformations[transformation];
    if (!theTransformation.byModules[module]) {
        theTransformation.byModules[module] = [];
    }

    theTransformation.total++;
    theTransformation.byModules[module].push({ code, line, collumn });

    if (!stats.byModules.modules[module]) {
        stats.byModules.modules[module] = {
            total: 0,
            byTransformations: [],
        };
        stats.byModules.total++;

        stattistics[configName].summary.transformations.modules++;
    }

    const theModule = stats.byModules.modules[module];
    theModule.total++;

    stattistics[configName].summary.transformations.byTransformations[transformation]++;

    theModule.byTransformations.push({ code, line, collumn, transformation });

    return 'Ok';
});

const warningBodySchema = {
    type: 'object',
    properties: {
        config: {
            type: 'string',
        },
        warning: {
            type: 'string',
        },
        module: {
            type: 'string',
        },
        code: {
            type: 'string',
        },
        line: {
            type: 'integer',
        },
        collumn: {
            type: 'integer',
        },
        action: {
            type: 'string',
        },
        transformation: {
            type: 'string',
        },
    },
} as const;

const warningOptions = {
    schema: {
        body: warningBodySchema,
    },
};

server.post<{
    Body: Required<FromSchema<typeof warningBodySchema>>;
}>('/warning', warningOptions, (request) => {
    const body = request.body;
    const { config, transformation, module, code, line, collumn, action, warning } = body;
    const configName = config.slice(0, -37);

    if (!stattistics[configName]) {
        stattistics[configName] = {
            summary: {
                transformations: {
                    total: 0,
                    modules: 0,
                    transformationTypes: 0,
                    byTransformations: {},
                },
                warnings: {
                    total: 0,
                    modules: 0,
                    transformationtypes: 0,
                    byTransformations: {},
                },
            },
            warnings: {
                total: 0,
                byTransformation: {},
                byModules: {},
            },
        };
    }

    stattistics[configName].summary.warnings.total++;

    if (!stattistics[configName]['warnings']) {
        stattistics[configName]['warnings'] = {
            total: 0,
            byTransformation: {},
            byModules: {},
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stats = stattistics[configName].warnings!;

    stats.total++;

    if (!stats.byTransformation[transformation]) {
        stats.byTransformation[transformation] = [];
        stattistics[configName].summary.warnings.byTransformations[transformation] = 0;
    }

    if (!stats.byModules[module]) {
        stats.byModules[module] = [];
        stattistics[configName].summary.warnings.modules++;
    }

    stats.byTransformation[transformation].push({ module, code, line, collumn, warning, action });
    stats.byModules[module].push({ transformation, code, line, collumn, warning, action });

    stattistics[configName].summary.warnings.modules = Object.keys(stats.byModules).length;
    stattistics[configName].summary.warnings.transformationtypes = Object.keys(stats.byTransformation).length;
    stattistics[configName].summary.warnings.byTransformations[transformation] = stats.byModules[module].length;

    return 'Ok';
});

const start = async (): Promise<void> => {
    let host = defaultStatsServerHost;
    let port = defaultStatsServerPort;

    const hostPos = args.indexOf('--host');
    if (hostPos > -1) {
        host = args[hostPos + 1];
    }

    const portPos = args.indexOf('--port');
    if (portPos > -1) {
        port = Number(args[portPos + 1]);
    }

    try {
        await server.listen({
            host,
            port,
        });

        console.log(chalk.blueBright(`Stats server is started at http://${host}:${port}/`));
    } catch (err) {
        server.log.error(err);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
};

function gracefullyClose(): void {
    void server.close();

    if (Object.keys(stattistics).length === 0) {
        return;
    }

    let filePath = path.resolve(defaultFileName);
    const pos = args.indexOf('--stats-filename');

    if (pos >= 0) {
        filePath = path.resolve(args[pos + 1]);
    }

    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, JSON.stringify(stattistics, null, 4), {
        encoding: 'utf-8',
    });
}

process.on('SIGTERM', () => {
    gracefullyClose();
});

// Handle Ctrl+C
process.on('SIGINT', () => {
    gracefullyClose();
});

void start();
