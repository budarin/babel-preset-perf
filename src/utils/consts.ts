export const PRESET_NAME = 'babel-preset-perf';

export const IGNORE_MODULE_COMMENT = 'babel-preset-perf-ignore';
export const IGNORE_LINE_COMMENT = 'babel-preset-perf-disable-next-line';

export const BOOLEAN = 'Boolean';
export const NUMBER = 'Number';
export const PARSE_INT = 'parseInt';
export const PARSE_FLOAT = 'parseFloat';

export const MAP = 'map';
export const KEYS = 'keys';
export const JOIN = 'join';
export const FIND = 'find';
export const SOME = 'some';
export const EVERY = 'every';
export const SLICE = 'slice';
export const OBJECT = 'Object';
export const FILTER = 'filter';
export const LENGTH = 'length';
export const VALUES = 'values';
export const ASSIGN = 'assign';
export const REDUCE = 'reduce';
export const FOREACH = 'forEach';
export const ENTRIES = 'entries';
export const INDEX_OF = 'indexOf';
export const INCLUDES = 'includes';

export const LOWER = '<';
export const GREATER = '>';
export const EQUAL = '===';
export const NOT_EQUAL = '!==';
export const LOWER_OR_EQUAL = '<=';
export const GREATER_OR_EQUAL = '>=';

export const ONE = 1;
export const NOR = '~';
export const NOT = '!';
export const MINUS = '-';

export const IGNORE_TRANSPILE_MODULES = 'ignore transpile modules';

export const ARRAY_DESTRUCTURING_INTO_VARS = 'Array destructuring';
export const ARRAY_JOIN_UNFOLD = 'Array.join unfold';
export const ARRAY_MAP_UNFOLD = 'Array.map unfold';
export const ARRAY_MAP_JOIN_UNFOLD = 'Array.map.join unfold';

export const ARRAY_FILTER_FOREACH = 'Array.filter.forEach';
export const ARRAY_FILTER_JOIN = 'Array.filter.join';
export const ARRAY_FILTER_LENGTH = 'Array.filter.length';
export const ARRAY_FILTER_LENGTH_AS_BOOLEAN = 'Array.filter.length as boolean';
export const ARRAY_FILTER_MAP = 'Array.filter.map';
export const ARRAY_FILTER_MAP_JOIN = 'Array.filter.map.join';
export const ARRAY_FILTER_REDUCE = 'Array.filter.reduce';
export const ARRAY_JOIN = 'Array.join';
export const ARRAY_MAP = 'Array.map';
export const ARRAY_MAP_JOIN = 'Array.map.join';
export const ARRAY_MAP_FOREACH = 'Array.map.forEach';
export const ARRAY_MAP_FILTER = 'Array.map.filter';
export const ARRAY_MAP_FILTER_JOIN = 'Array.map.filter.join';
export const ARRAY_MAP_REDUCE = 'Array.map.reduce';
export const ARRAY_SLICE_EVERY = 'Array.slice.every';
export const ARRAY_SLICE_MAP_JOIN = 'Array.slice.map.join';

export const OBJECT_ENTRIES_FILTER_MAP_JOIN = 'Object.entries.filter.map.join';
export const OBJECT_ENTRIES_FOREACH = 'Object.entries.forEach';
export const OBJECT_ENTRIES_REDUCE = 'Object.entries.reduce';
export const OBJECT_ENTRIES_MAP = 'Object.entries.map';
export const OBJECT_VALUES_FIRST_ITEM = 'Object.values[0]';

export const OBJECT_EXPRESSION_WITH_SPREAD = 'Object expression with spread';
export const STRING_SLICE = 'String.slice';
export const TRANSFORM_LET_CONST_WITH_VAR = 'Variable transform const and let with var';

export const indexOfOperators = [LOWER, GREATER, EQUAL, NOT_EQUAL, LOWER_OR_EQUAL, GREATER_OR_EQUAL];

export const wholeListOfTransformations = [
    ARRAY_DESTRUCTURING_INTO_VARS,
    ARRAY_MAP_JOIN_UNFOLD,
    ARRAY_JOIN_UNFOLD,
    ARRAY_MAP_UNFOLD,
    ARRAY_FILTER_FOREACH,
    ARRAY_FILTER_JOIN,
    ARRAY_FILTER_LENGTH,
    ARRAY_FILTER_LENGTH_AS_BOOLEAN,
    ARRAY_FILTER_MAP,
    ARRAY_FILTER_MAP_JOIN,
    ARRAY_FILTER_REDUCE,
    ARRAY_JOIN,
    ARRAY_MAP,
    ARRAY_MAP_FILTER,
    ARRAY_MAP_FILTER_JOIN,
    ARRAY_MAP_FOREACH,
    ARRAY_MAP_JOIN,
    ARRAY_MAP_REDUCE,
    ARRAY_SLICE_EVERY,
    ARRAY_SLICE_MAP_JOIN,
    OBJECT_ENTRIES_FILTER_MAP_JOIN,
    OBJECT_ENTRIES_FOREACH,
    OBJECT_ENTRIES_MAP,
    OBJECT_ENTRIES_REDUCE,
    OBJECT_VALUES_FIRST_ITEM,
    OBJECT_EXPRESSION_WITH_SPREAD,
    STRING_SLICE,
    TRANSFORM_LET_CONST_WITH_VAR,
];

export const arrayExpressionTransformations = [
    ARRAY_DESTRUCTURING_INTO_VARS,
    ARRAY_MAP_JOIN_UNFOLD,
    ARRAY_JOIN_UNFOLD,
    ARRAY_MAP_UNFOLD,
];
export const arrayChainsMethodsTransformations = [
    ARRAY_FILTER_FOREACH,
    ARRAY_FILTER_JOIN,
    ARRAY_FILTER_LENGTH,
    ARRAY_FILTER_LENGTH_AS_BOOLEAN,
    ARRAY_FILTER_MAP,
    ARRAY_FILTER_MAP_JOIN,
    ARRAY_FILTER_REDUCE,
    ARRAY_JOIN,
    ARRAY_MAP,
    ARRAY_MAP_FILTER,
    ARRAY_MAP_FILTER_JOIN,
    ARRAY_MAP_FOREACH,
    ARRAY_MAP_JOIN,
    ARRAY_MAP_REDUCE,
    ARRAY_SLICE_EVERY,
    ARRAY_SLICE_MAP_JOIN,
    OBJECT_ENTRIES_FILTER_MAP_JOIN,
    OBJECT_ENTRIES_FOREACH,
    OBJECT_ENTRIES_MAP,
    OBJECT_ENTRIES_REDUCE,
    OBJECT_VALUES_FIRST_ITEM,
];

export const arrayTransformations = [...arrayExpressionTransformations, ...arrayChainsMethodsTransformations];
export const objectTransformations = [OBJECT_EXPRESSION_WITH_SPREAD];
export const stringTransformations = [STRING_SLICE];
export const varTransformations = [TRANSFORM_LET_CONST_WITH_VAR];

export const nodeTargetAllTransformationsList = wholeListOfTransformations;
export const nodeTargetSafeTransformationsList = [
    ...arrayExpressionTransformations,
    ...objectTransformations,
    ...stringTransformations,
    ...varTransformations,
];

export const fullTransformationsList = {
    // array
    ARRAY_DESTRUCTURING_INTO_VARS,
    ARRAY_MAP_JOIN_UNFOLD,
    ARRAY_JOIN_UNFOLD,
    ARRAY_MAP_UNFOLD,
    // array chains
    ARRAY_FILTER_FOREACH,
    ARRAY_FILTER_JOIN,
    ARRAY_FILTER_LENGTH,
    ARRAY_FILTER_LENGTH_AS_BOOLEAN,
    ARRAY_FILTER_MAP,
    ARRAY_FILTER_MAP_JOIN,
    ARRAY_FILTER_REDUCE,
    ARRAY_JOIN,
    ARRAY_MAP,
    ARRAY_MAP_FILTER,
    ARRAY_MAP_FILTER_JOIN,
    ARRAY_MAP_FOREACH,
    ARRAY_MAP_JOIN,
    ARRAY_MAP_REDUCE,
    ARRAY_SLICE_EVERY,
    ARRAY_SLICE_MAP_JOIN,
    OBJECT_ENTRIES_FILTER_MAP_JOIN,
    OBJECT_ENTRIES_FOREACH,
    OBJECT_ENTRIES_MAP,
    OBJECT_ENTRIES_REDUCE,
    OBJECT_VALUES_FIRST_ITEM,
    // object
    OBJECT_EXPRESSION_WITH_SPREAD,
    // string
    STRING_SLICE,
    // var
    TRANSFORM_LET_CONST_WITH_VAR,
};

export const defaultStatsServerHost = '127.0.0.1';
export const defaultStatsServerPort = 3000;
export const defaultFileName = './babel-plugin-perf.stats.json';

export const pluginsConfig = {
    [ARRAY_DESTRUCTURING_INTO_VARS]: false,
    [ARRAY_MAP_JOIN_UNFOLD]: false,
    [ARRAY_JOIN_UNFOLD]: false,
    [ARRAY_MAP_UNFOLD]: false,
    // array
    [ARRAY_FILTER_FOREACH]: false,
    [ARRAY_FILTER_JOIN]: false,
    [ARRAY_FILTER_LENGTH]: false,
    [ARRAY_FILTER_LENGTH_AS_BOOLEAN]: false,
    [ARRAY_FILTER_MAP]: false,
    [ARRAY_FILTER_MAP_JOIN]: false,
    [ARRAY_FILTER_REDUCE]: false,
    [ARRAY_JOIN]: false,
    [ARRAY_MAP]: false,
    [ARRAY_MAP_FILTER]: false,
    [ARRAY_MAP_FILTER_JOIN]: false,
    [ARRAY_MAP_FOREACH]: false,
    [ARRAY_MAP_JOIN]: false,
    [ARRAY_MAP_REDUCE]: false,
    [ARRAY_SLICE_EVERY]: false,
    [ARRAY_SLICE_MAP_JOIN]: false,
    [OBJECT_ENTRIES_FILTER_MAP_JOIN]: false,
    [OBJECT_ENTRIES_FOREACH]: false,
    [OBJECT_ENTRIES_MAP]: false,
    [OBJECT_ENTRIES_REDUCE]: false,
    [OBJECT_VALUES_FIRST_ITEM]: false,
    // object
    [OBJECT_EXPRESSION_WITH_SPREAD]: false,
    // string
    [STRING_SLICE]: false,
    // var
    [TRANSFORM_LET_CONST_WITH_VAR]: false,
};
