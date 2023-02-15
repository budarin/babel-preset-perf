# babel-preset-perf

🇷🇺 [На русском языке](/README.ru.md)

`babel-preset-perf` - this is a babel preset that transforms some js constructs in your code in order to extract maximum performance.

This allows developers to still write expressive, easy-to-read and easy-to-understand code while improving its performance after transpilation.

## Motivation

Analyzing the flamegraph of one of my boilerplates, I noticed that in the hot zone on an empty project there is the code of one of the widely used libraries.
I turned to the developers with a request to rewrite that code to a more productive one, to which I received an answer: we will not rewrite the code into unreadable and incomprehensible, but more productive to the detriment of the readability and maintainability of our code.

After thinking a little, I agreed with them, and came to the understanding that it was necessary to study Babel and write a set of plugins on it that would fix performance problems in npm dependencies!

After many hours spent studying the topic of microbenchmarking, testing tools, Babel and code optimization methods in js, `babel-preset-perf` was created!

## Instllation

Using npm

```shell
npm install --save-dev babel-preset-perf
```

Using yarn

```shell
yarn add -D babel-preset-perf
```

## Configuring Babel using babel.config

Example of a typical configuration

```js
const config = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    ...
}

if (process.env.NODE_ENV === 'production') {
    config.presets.unshift([
        'babel-preset-perf',
        {
            target: 'node',
            unsafeTransformations: true
        }
    ])
}

return config;
```

`babel-present-perf` must be 1st in the list so that it can process all the code that can be translated or inserted into the resulting code by previous presets.

This way you will configure Babel to transpile the code you wrote.

## Configuring webpack to transpile npm packages

To transpile code from `npm` packages in `webpack`, you need to add a rule to the `module.rules` section in the `production` mode.

```js
const webpackConfig = { .... };

if (process.env.NODE_ENV === 'production') {
    webpackConfig.module.rules.push({
        test: /\.(cjs|mjs|js)$/,
        include: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                configFile: false,
                presets: [
                    [
                        'babel-preset-perf',
                        {
                            target: 'node',
                            unsafeTransformations: true
                        }
                    ]
                ],
                cacheDirectory: true,
                cacheIdentifier: 'server-npm' // <= specify a unique name for the transformation cache
            }
        }
    })
}

return webpackConfig;
```

After that, your config will transpile all modules imported by your application from npm.

## Options

The preset has the following parameters:

-   name
-   target
-   unsafeTransformations
-   verbose
-   useStatsServer

Example of using parameters to configure a preset

```js
{
    presets: [
        [
            'babel-preset-perf',
            {
                name: 'server',
                target: 'node',
                verbose: true,
                unsafeTransformations: true, // can and should be equal to true !
                useStatsServer: {
                    host: '127.0.0.1';
                    port: 3000;
                }
            }
        ]
    ]
}
```

### `name`: string, by default: `unamed_config`

Sets the name of a specific preset configuration. The name is used when collecting statistics of code transformations - see the description of the parameter [unsafeTransformations](#unsafeTransformations). Specifying the name is important when collecting statistics on transformations.

### `target`: 'node' | 'custom', by default: 'node'

At the moment (due to the lack of an opportunity for me to test browsers on the Android and iOS platforms), the preset is recommended to be used only for NodeJS, since all transformations have been tested and confirmed by the results of performance tests for the target platform - Linux.

<a href="https://budarin.github.io/babel-preset-perf/node-heat-map.html" target="_blank" rel="noopener noreferrer">The results</a> of benchmarks for NodeJS can be viewed in the project <a href="https://github.com/budarin/js-perf-tests" target="_blank" rel="noopener noreferrer">js-perf-tests</a>. There you can also see the results of benchmarks for browsers.

If you have the opportunity to test all the most used browsers on Android or iOS platforms - do not hesitate - make a pull-request with the results of tests for browsers. Thus, it will be possible to determine which transformations are applicable for browsers and thus it will be possible to add the `browsers` parameter to the option!

### `customTransformations`: string[], by default: []

If you specify `custom` as the target, you need to create a list of desired transformations yourself.
The preset exports several constants for this:

-   `transformationsList` - contains a list of absolutely all transformations in the preset
-   `arrayTransformations` - contains a list of all transformations for Array
-   `objectTransformations` - contains a list of all transformations for Object
-   `stringTransformations` - contains a list of all transformations for String
-   `arrayExpressionTransformations` - contains a list of transformations for expressions forming an Array (without transformations for chains of cyclic method calls)
-   `arrayChainsMethodsTransformations` - contains a list of transformations only for chains of cyclic method calls Array
-   `varTransformations` - contains a list of all transformations for Variable

see the [Transformations](#Transformations) section

### `unsafeTransformations`: boolean, by default: false

> Attention!

Although by default this parameter is set to `false`, I strongly recommend setting it to `true`.

This parameter in the preset marks only transformations for chains of cyclic method calls for arrays.

These performance optimizations are based on the fact that:

-   all arrays in the application are normal - without holes
-   chains of method calls, instead of executing each in its own cycle and creating a new array each time, use one cycle and the original array. This imposes a restriction on the use of transformations: predicates in which the 3rd parameter array is used cannot be implemented because we do not create new arrays but work with the original one

If you find that someone is creating an array with holes (sparse arrays), immediately write to him about the problem and tell him that creating sparse arrays is bad practice, and it's not good to do an anti-pattern anyway!

### `verbose`: boolean, by default: false

This parameter is responsible for displaying warnings to the console during transformations.

### `useStatsServer`: boolean | object, by default: false

While the preset is running, you can collect the statistics on the transformations performed in the modules.

To do this, you need to configure the parameters of the transformation statistics collection server by specifying the address or host name on which the statistics collection server is running and its port, for example:

```js
{
    host: '127.0.0.1';
    port: 3000;
}
```

Naturally, in order to collect statistics, you need to start the statistics server before the project is built.

To do this, run the command:

```shell
node ./node_modules/babel-preset-perf/dist/statsServer.js
```

and after building the project, stop the statistics collection server in one of the ways:

-   in the console, press Ctrl+C
-   by executing the `curl -X POST' command in the console http://127.0.0.1:3000/stop `

after stopping the statistics collection server, the results will be written to the file `./babel-plugin-perf.stats.json` (by default, the file name and path can be set when starting the statistics collection server in the parameter `--stats-filename`, you can also configure the host `--host` and the port `--port` on which the statistics collection server will be launched).

<a href="./babel-plugin-perf.stats.json" target="_blank" rel="noopener noreferrer">Example</a> of collected statistics during code transformation in the folder `./tests/demo'.

I recommend downloading the file to your device (or view the raw file in a browser with the JSONView extension installed) and looking at it carefully - there is a lot of useful and interesting information there.

## Transformations

Below is a list of transformations that are used in the preset and which I discovered in my product bundle.
Do not hesitate - offer your own.

The source code before and after the transformation can be viewed in the folder
`./tests/transformation-tests/__fixtures__/<transformation name>` in the files:

-   `code.js` - source code
-   `output.js ` is the result of the transformation of the source code

Further, for brevity, only general examples of code and transformations will be given

### Array

#### Array destructuring

Source code:

```js
const [a4, b4, ...rest1] = array;
```

The result of the transformation:

```js
var a4 = array[0],
    b4 = array[1],
    rest1 = array.slice(2);
```

Accessing array elements by index is much more productive than code with array destructuring by a couple thousand percent.

#### Array.join unfold, Array.map.join unfold, Array.map unfold

Source code:

```js
const a = [1, 2, 3, 4, 5].join();
```

The result of the transformation:

```js
var a = '1,2,3,4,5';
```

Often in the code there are literals and variables arranged in an array for ease of perception.
Further in the code, during initialization, they are converted to a string or to a new array by calling the methods: `.join()`, `.map().join()`, `.map()`;

At the stage of transpilation, such constructions can be immediately transformed into a string expression or into an array with elements over which the predicate function of their `map` method is executed.

This transformation gives an increase in performance by hundreds and thousands of percent, depending on the type and length of the array

### Array's chains of cyclic methods

The largest group of transformations that can greatly affect the performance of the code, because this code is most often involved in the chain of information processing by services and applications.

-   Array.filter.forEach
-   Array.filter.join
-   Array.filter.length
-   Array.filter.map.join
-   Array.filter.map
-   Array.filter.reduce
-   Array.join
-   Array.map.filter.join
-   Array.map.filter
-   Array.map.forEach
-   Array.map.join
-   Array.map
-   Array.map.reduce
-   Array.slice.every
-   Array.slice.map.join
-   Object.entries.filter.map.join
-   Object.entries.forEach
-   Object.entries.map
-   Object.entries.reduce

( this list of call chains is compiled as a result of the analysis of my product bundle using this [plugin](https://github.com/budarin/babel-plugin-stats-about-using-chain-methods) )

The transformation of calls chains of cyclic array methods consists in converting them into a call of one cycle according to the elements of the original array with the call of predicates of array methods participating in the chain.

for example:

```js
arr.map((x, i) => x + i).filter((x) => x > 5);
```

may be converted to the following code:

```js
function helper(array, mapPredicate, filterPredicate) {
    var i = -1;
    var result = [];
    var len = array.length;

    while (++i < len) {
        var item = mapPredicate(array[i], i);

        if (filterPredicate(item, i)) {
            result.push(item);
        }
    }

    return result;
}

helper(
    arr,
    (x, i) => x + i,
    (x) => x > 5,
);
```

since we use only one loop instead of 2 and use only the source array and the result one and do not create intermediate ones, we significantly increase code performance and save resources on garbage collection for temporary intermediate arrays.

#### Array.filter.length as boolean

Very often, developers check whether there is at least one element in the array that satisfies the condition

Source code:

```js
arr.filter((x) => x > 0).length ? 1 : 0;
```

The result of the transformation:

```js
arr.some((x) => x > 0) ? 1 : 0;
```

They do this incorrectly - instead of using the array method `some`, which gives an answer to the question: are there elements satisfying the predicate in `filter`, the developer waits for the formation of an array of all filtered elements and then makes sure that there are such elements available.

#### Object.values[0]

Often developers check an object for the presence of at least one property in it, or they really need only the 1st element of the values array.

Source code:

```js
Object.values(obj)[0];
```

The result of the transformation:

```js
function helper(obj) {
    for (var key in obj) {
        return obj[key];
    }
    return;
}

helper(obj);
```

It makes no sense to wait for the end of a natively implemented loop to get all `values` from an object

### Object

#### Object expression with spread

Source code:

```js
const x = { a: { ...obj, a: 1, c: 2, ...b, d: 3 }, e: { ...c }, f };
```

The result of the transformation:

```js
var x = {
    a: Object.assign(
        {},
        obj,
        {
            a: 1,
            c: 2,
        },
        b,
        {
            d: 3,
        },
    ),
    e: {
        ...c,
    },
    f,
};
```

It turns out that the good old `Object.assign()` is still much more productive than creating an object through an expression with `spread`. This transformation is more productive for expressions with more than one `spread` expression

### String

#### String.slice

Source code:

```js
'String'.slice(1, 5);
```

The result of the transformation:

```js
'String'.substring(1, 5);
```

It turned out that `substring` is much more productive than the `slice` method, especially with negative arguments

### Variable

#### Transform const and let with var

After passing all the checks and tests, the final code can be transformed by replacing all `const` and `let` with `var`.

This can add a few percent of performance when initializing code., given that `const` and `let` need to create a context for their work, and this is an additional time cost.

There are no negative consequences of such transformation, and a few percent increase in productivity without taking any action is just nice.

The idea of this transformation, as well as many other useful tips, was offered to me by [Victor Homyakov](https://github.com/victor-homyakov)

## Troubleshooting

A tragedy may happen - one of the packages in your dependencies produces arrays with holes/sparse arrays (hopefully not your code!?) - in this case, the trasformations may not produce the result that is expected (it all depends on the array's methods - they turn out to handle holes differently!

The question arises in detecting this negligent developer, his package and excluding him and his package from preset processing.
First you need to modify the rule for webpack so that you can get a list of modules imported from node_modules

```js
const webpackConfig = { .... };

if (process.env.NODE_ENV === 'production') {
    webpackConfig.module.rules.push({
        test: /\.(cjs|mjs|js)$/,
        include: (filePath) => {

            console.log('include', filePath);

            return /node_modules/.test(filePath);
        },
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                configFile: false,
                presets: [
                    [
                        'babel-preset-perf',
                        {
                            target: 'node',
                            unsafeTransformations: true
                        }
                    ]
                ],
                cacheDirectory: true,
                cacheIdentifier: 'server-npm'
            }
        }
    })
}

return webpackConfig;
```

To begin with, we can make a list of packages used by our application by selecting only package names from the full path of modules, and then using the `half division rule`, you can consistently refine the list of allowed packages

```js
const allowedPackages = [.....]

....

{
    test: /\.(cjs|mjs|js)$/,
    include: (filePath) => {
        return /node_modules/.test(filePath) && allowedPackages.includes(filePath);
    },
    use: {
        loader: 'babel-loader',
        options: {
            babelrc: false,
            configFile: false,
            presets: [
                [
                    'babel-preset-perf',
                    {
                        target: 'node',
                        unsafeTransformations: true
                    }
                ]
            ],
            cacheDirectory: true,
            cacheIdentifier: 'server-npm'
        }
    }
}
```

find the problematic ones and after going through all the modules of the problematic packages, find the really defective ones and add them to the list `exclude` for the loader

```js
{
    test: /\.(cjs|mjs|js)$/,
    include: /node_modules/,
    exclude: [pathToDefectedModule1, pathToDefectedModule2, .....],
    use: {
        loader: 'babel-loader',
        options: {
            babelrc: false,
            configFile: false,
            presets: [
                [
                    'babel-preset-perf',
                    {
                        target: 'node',
                        unsafeTransformations: true
                    }
                ]
            ],
            cacheDirectory: true,
            cacheIdentifier: 'server-npm'
        }
    }
}
```

After finding such "defective" packages, it is advisable to write them an issue that it is bad to do this, as well as inform me so that I can keep a list of such "bad" packages 😊.

## Do you have any ideas for transformations?

Feel free to suggest new types of transformations to speed up the code.
The transformations that are in the preset are just what I found in my product bundle. There may be other js constructs in your bundle that can be transformed into more productive ones.

Perhaps this [plugin](https://github.com/budarin/babel-plugin-stats-about-using-chain-methods) will help you

Let's make babel-preset-perf great again together!😊

## License

[MIT](./LICENSE)
