import path = require('path');

import { PRESET_NAME } from './consts';

const __DEV__ = process.env['DEV_RUN'] === 'true';

export const helpersPath = __DEV__ ? `${path.resolve('./dist/helpers')}${path.sep}` : `${PRESET_NAME}/dist/helpers/`;
