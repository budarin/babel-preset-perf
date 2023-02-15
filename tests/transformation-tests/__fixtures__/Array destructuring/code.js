const array = [1, 2, 3, 4, 5];
const [] = array;
const [a1, b1] = array;
const [a2, , b2] = array;
let [a3 = aDefault, b3] = array;
const [a4, b4, ...rest1] = array;
let [a5, , b5, ...rest2] = array;

const [a7, b7, ...[c7, d7]] = array;

const [a, b] = getValue();
const [a11, b11] = [1, 2, 3];
const [a22, b22] = array;

const [allProps, properties] = schemaProperties('properties'),
    [allOptProps, optProperties] = schemaProperties('optionalProperties');
