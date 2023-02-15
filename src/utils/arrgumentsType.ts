import * as t from '@babel/types';

export type Arguments = (t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression)[];
