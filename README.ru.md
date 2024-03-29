# babel-preset-perf

`babel-preset-perf` - это babel пресет который трансформирует некоторые конструкции js в вашем коде с целью извлечения максимальной производительности.

Это позволяет разработчикам по-прежнему писать выразительный, легкочитаемый и легко понимаемый код, улучшая при этом его производительность после транспиляции.

## Мотивация

Анализируя flame graph одного из моих бойлерплейтов заметил, что в горячей зоне на пустом проекте находится код одной из широко используемых библиотеки.
Я обратился к разработчикам с просьбой переписать тот код на более производительный на что получил ответ: мы не станем переписывать код на не читаемый и не понимаемый, но более производительный в ущерб читаемости и поддерживаемости нашего кода.

Поразмыслив немного - я согласился с ними, и пришел к пониманию, что необходимо изучить Babel и написать на нем набор плагинов, которые бы улучшить производительность в `npm зависимостях`!

После многих часов, потраченных на изучение темы микробенчмаркинка, инструментов тестирования, Babel и методов оптимизации кода в js и был создан `babel-preset-perf`!

Более подробно о мотивации и процессе разработке написал в статье [Нужда до написания babel-preset-perf доведет !](https://medium.com/@vadim-budarin/нужда-до-написания-babel-preset-доведет-df8ef206776)

## Установка

При помощи npm

```shell
npm install --save-dev babel-preset-perf
```

или при помощи yarn

```shell
yarn add -D babel-preset-perf
```

## Конфигурирование Babel при помощи babel.config

Пример типичной конфигурации

```js
const config = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    ...
}

if (process.env['NODE_ENV'] === 'production') {
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

`babel-preset-perf` должен быть 1-м в списке для того, чтобы он смог обработать весь код который может быть транспилирован или вставлен в результирующий код предыдущими пресетами.

Таким образом вы сконфигурируете Babel для транспиляции, написанного вами, кода.

## Конфигурирование webpack для транспиляции npm пакетов

Для транспиляции кода из npm пакетов в webpack необходимо добавить правило в секцию `module.rules` в режиме `production`.

```js
const webpackConfig = { .... };

if (process.env.NODE_ENV === 'production') {
    webpackConfig.module.rules.push({
        test: /\.(cjs|mjs|js)$/,
        include: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                cacheIdentifier: 'server-npm' // <= укажите свое уникальное имя для кэша трансформаций для каждой среды свое
            }
        }
    })
}

return webpackConfig;
```

После этого ваш конфиг будет транспилировать все импортируемые вашим приложением модули из npm пакетов

## Параметры

Пресет имеет следующие параметры:

-   name
-   target
-   transformationsList
-   unsafeTransformations
-   verbose
-   useStatsServer

Пример использования параметров для настройки пресета

```js
{
    presets: [
        [
            'babel-preset-perf',
            {
                name: 'server',
                target: 'node',
                verbose: true,
                unsafeTransformations: true, // <= может и должно быть true !
                useStatsServer: {
                    host: '127.0.0.1',
                    port: 3000,
                },
            },
        ],
    ];
}
```

Вместо строки в массив `presets` конфигурации Babel мы добавляем элемент в виде массива: с именем пресета и его параметрами

### name: string, по-умолчанию: `unamed_config`

Задает имя конкретной конфигурации пресета. Имя используется при сборе статистики трансформаций кода - смотри описание параметра [useStatsServer](#usestatsserver-boolean--object-by-default-false). Указание имени важно при сборе статистики по трансформациям.

### target: 'node' | 'custom', по-умолчанию: 'node'

На текущий момент (в силу отсутствия у меня возможности протестировать браузеры на платформе Android и IOS) пресет рекомендуется использовать только для NodeJS, так как все трансформации проверены и подтверждены результатами тестов производительности для целевой платформы - Linux.

<a href="https://budarin.github.io/babel-preset-perf/node-heat-map.html" target="_blank" rel="noopener noreferrer">Результаты</a> бенчмарков для NodeJS можно посмотреть в проекте <a href="https://github.com/budarin/js-perf-tests" target="_blank" rel="noopener noreferrer">js-perf-tests</a>. Там же там можно посмотреть и результаты бенчмарков для браузеров.

Если у вас есть возможность протестировать все наиболее используемые браузеры на платформах Android или iOS - не стесняйтесь - делайте pull-request с результатами тестов для браузеров. Таким образом можно будет определиться какие трансформации применимы для браузеров и таким образом можно будет добавить в опцию парамет `browsers`!

### transformationsList: string[], по-умолчанию: []

Если в качестве цели вы укажете `custom` - вам необходимо самостоятельно сформировать список желаемых трансформаций.
Пресет экспортирует несколько констант для этого:

-   `fullTransformationsList` - содержит список абсолютно всех трансформаций в пресете
-   `arrayTransformations` - содержит список всех трансформаций для Array
-   `arrayExpressionTransformations` - содержит список трансформаций для выражений c Array
-   `arrayChainsMethodsTransformations` - содержит список трансформаций только для цепочек вызовов циклических методов Array
-   `objectTransformations` - содержит список всех трансформаций для Object
-   `stringTransformations` - содержит список всех трансформаций для String
-   `varTransformations` - содержит список всех трансформаций для Variable

смотри секцию [Трансформации](#Трансформации)

### unsafeTransformations: boolean, по-умолчанию: false

> Внимание!

Хоть по-умолчанию этот параметр и устанавливается в `false` настоятельно рекомендую устанавливать его в `true`.

Данным параметром в пресете помечены исключительно трансформации для цепочек вызовов циклических методов для массивов.

Эти оптимизации производительности основаны на том что:

-   все массивы в приложении нормальные - без дырок
-   цепоки вызовов методов вместо исполнения каждого в своем цикле и создании каждый раз нового массива - используют один цикл и исходный массив. Это накладывает ограничение на применение трансформаций: предикаты в которых используется 3-й параметр массив, не могут быть реализованы т.к. мы не создаем новых массивов а работаем с исходным

Если вы обнаружите, что кто-то создает массивы с дырками - сразу пишите ему issue и говорите, что делать дырявые массивы - это bad practice и antipattern и айяйяй как не хорошо !

### verbose: boolean, по-умолчанию: false

Параметр отвечает за вывод в консоль предупреждений во время трансформаций.

### useStatsServer: boolean | object, по-умолчанию: false

Во время работы пресета можно собирать статистику по производимым трансформациям в модулях.

Для этого необходимо настроить параметры сервера сбора статистики трансформаций, указав адрес или имя хоста, на котором запущен сервер сбора статистики и его порт, к примеру:

```js
useStatsServer: {
    host: '127.0.0.1',
    port: 3000
}
```

Бабель кэширует все трансформации и при повторном вызове не производит их, поэтому перед сбором статистики необходимо очистить кэш.
Кэш располагается в папке `/node_modules/.cache`. Если вы не знаете какие папки внутри принадлежат бабелю - можете смело удалить папку `.cache`.

Естественно, что для сбора статистики до начала сборки проекта нужно запустить сервер статистики.
Для этого нужно выполнить команду:

```shell
node ./node_modules/babel-preset-perf/dist/statsServer.js
```

а после сборки проекта остановить сервер сбора статистики одним из способов:

-   в консоли нажать Ctrl+C
-   выполнив в консоли команду `curl -X POST http://127.0.0.1:3000/stop`

после остановки сервера сбора статистики результаты будут записаны в файл `./babel-plugin-perf.stats.json` (имя файла можно задать при запуске сервера сбора статистики в параметре `--stats-filename`, так же можно настроить хост `--host` и порт `--port` на котором будет запущен сервер сбора статистики).

<a href="./babel-plugin-perf.stats.json" target="_blank" rel="noopener noreferrer">Пример</a> собранной статистики при трансформации кода в папке `./tests/demo`.

Рекомендую загрузить файл к себе на устройство (или посмотреть raw файл в бракзере с устаглвленным JSONView расширение) и внимательно его посмотреть - там очень много полезной и интересной информации.

## Магические комментарии

### // babel-preset-perf-ignore

Установленный в начале модуля - предотвращает транспиляцию всего модуля.

### // babel-preset-perf-disable-next-line

Предотвращает транспиляцию следующего за ним выражения.

## Трансформации

Ниже перечислен список трансформаций, которые применяются в пресете и которые были обнаружены мною в моем продуктовом бандле.
Не стесняйтесь - предлагайте свои.

-   Array destructuring
-   Array.join unfold
-   Array.map unfold
-   Array.map.join unfold
-   Array.filter.forEach
-   Array.filter.join
-   Array.filter.length
-   Array.filter.length as boolean
-   Array.filter.map
-   Array.filter.map.join
-   Array.filter.reduce
-   Array.join
-   Array.map
-   Array.map.join
-   Array.map.forEach
-   Array.map.filter
-   Array.map.filter.join
-   Array.map.reduce
-   Array.slice.every
-   Array.slice.map.join
-   Object.entries.filter.map.join
-   Object.entries.forEach
-   Object.entries.reduce
-   Object.entries.map
-   Object.values[0]
-   Object expression with spread
-   String.slice
-   Variable transform const and let with var

Исходный код до трансформации и после можно посмотреть в папке
`./tests/transformation-tests/__fixtures__/<transformation name>` в файлах:

-   `code.js` - исходный код
-   `output.js` - результат трансформации исходного кода

Далее ,для краткости, будут приведены лишь общие примеры кода и трансформаций

### Array

#### Array destructuring

Исходный код:

```js
const [a4, b4, ...rest1] = array;
```

Результат трансформации:

```js
var a4 = array[0],
    b4 = array[1],
    rest1 = array.slice(2);
```

Доступ к элементам массива по индексу гораздо производительнее чем код с деструктурированием массива на пару тысяч процентов

#### Array.join unfold, Array.map.join unfold, Array.map unfold

Исходный код:

```js
const a = [1, 2, 3, 4, 5].join();
```

Результат трансформации:

```js
var a = '1,2,3,4,5';
```

Зачастую в коде присутствуют литералами и переменными оформлеными в массив для удобства восприятия.
Далее в коде в ходе инициализации они преобразуются в строку или в новый массив путем вызова методов: `.join()`, `.map().join()`, `.map()`;

На этапе транспиляции можно такие конструкции сразу пребразовывать в строковое выражение либо в массив с элементами над которыми выполняется функция-предикат их методв `map`.

Данная трансформация дает прирост производительности на сотни и тысячи процентов зависимости от типа и длины массива

### Array's chains of cyclic methods

Самая большая группа трансформаций, которая сильно может влиять на производительность кода, т.к. данный код наиболее часто участвует в цепочке обработки информации сервисами и приложениями.

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

( список цепочек вызовов составлен в результате анализа моего продуктового бандла при помощи данного [плпгина](https://github.com/budarin/babel-plugin-stats-about-using-chain-methods) )

Трансформация вызовов цепочек циклических методов массива заключается в преобразовании их в вызов одного цикла по элеиментам исходного массива с вызовом предикатов методов массива, участвующих в цепочке.

К примеру:

```js
arr.map((x, i) => x + i).filter((x) => x > 5);
```

преобразуется к следующему коду

```js
function helper(array, mapPredicate, filterPredicate) {
    var i = 0;
    var result = [];
    var len = array.length;

    for (; i < len; i++) {
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

так как мы используем лишь один цикл вместо 2х и используем лишь исходный массив и не создаем промежуточные - мы значительно увеличиваем производительность кода и экономим ресурсы на сборку мусора для временных промежуточных массивов.

#### Array.filter.length as boolean

Очень часто разработчики проверяю, а есть ли хотя бы один элемент в массиве удовлетворяющий условию

Исходный код:

```js
arr.filter((x) => x > 0).length ? 1 : 0;
```

Результат трансформации:

```js
arr.some((x) => x > 0) ? 1 : 0;
```

Делают они это не верно - вместо использование метода массива `some`, который дает ответ на вотпрос: существуют ли элементы удовлетворяющие предикату в `filter`, разработчик ждет формирования массива из всех отфильтрованных элементов и затем удостоверяется в том, что есть в наличии такие эелементы.

#### Object.values[0]

Часто разработчики проверяют объект на наличие хотя бы одного свойства у него, либо им действительно необходим лишь 1й элемент массива values.

Исходный код:

```js
Object.values(obj)[0];
```

Результат трансформации:

```js
function helper(obj) {
    for (var key in obj) {
        return obj[key];
    }
    return;
}

helper(obj);
```

Нет смысла ждать окончания нативно реализованного цикла для получения всех `values` из объекта

### Object

#### Object expression with spread

Исходный код:

```js
const x = { a: { ...obj, a: 1, c: 2, ...b, d: 3 }, e: { ...c }, f };
```

Результат трансформации:

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

Оказывается, что старый добрый `Object.assign()` по-прежнему гораздо производительней чем создание объекта через выражение со `spread`. Данная трансформация более производительна для выражений, в которых более одного `spread` выражения

### String

#### String.slice

Исходный код:

```js
'String'.slice(1, 5);
```

Результат трансформации:

```js
'String'.substring(1, 5);
```

Оказалось, что `substring` гораздо производительнее метода `slice` особенно с отрицательными аргументами

### Variable

#### Transform const and let with var

После прохождения всех проверок и тестов финальный код можно трансформировать путем замены всех `const` и `let` на `var`.

Это может добавить несколько процентов производительности при инициализации кода, учитывая то, что `const` и `let` необходимо создать для своей работы контекст, а это - дополнительные затраты времени.

Отрицательных последствий у такой трансформации нет, а несколько процентов к производительности не предпринимая никаких действий - просто приятно.

Идею с данной трансформацией, а так же множество других полезных советов предложил мне [Виктор Хомяков](https://github.com/victor-homyakov)

## Поиск и устранение проблем

Может случиться трагедия - один из пакетов в ваших зависимостях плодит массивы с дырками (надеюсь не ваш код!?) - в таком случае трасформации могут выдавать не тот результат который ожидается (все зависит от методов массива - они оказывается по-разному обрабатывают дырки)!

Методика поиска заключается в следующем:

-   собрать список используемых модулей из npm
-   фильтруя этот список при помощи `include` найти те, которые дают не верный результат
-   затем фильтруя список трансформаций - найти какие трансформации для каждого из этих модулей приводят к сбоям
-   изучить код модуля чтобы понять в чем проблема

Для начала нужно модифицировать правило для webpack так чтобы можно было бы получить список импортируемых из node_modules модулей

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

Используя [правило половинного деления](https://mybiblioteka.su/9-108554.html), можно последовательно уточняя список разрешенных пакетов, найти те модули, которые приводят к дефектам

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

Далее используя [правило половинного деления](https://mybiblioteka.su/9-108554.html) для трансформаций, найти для каждого "дефектного модуля", те трансформации из-за которых он выдает не корректные результаты

```js
const { fullTransformationsList } = require('babel-preset-perf');

const {
    ARRAY_DESTRUCTURING_INTO_VARS,
    ARRAY_FILTER_FOREACH,
    ARRAY_FILTER_JOIN,
    ...
} = fullTransformationsList;

...

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
                        target: 'custom',
                        transformationsList: [
                            ARRAY_DESTRUCTURING_INTO_VARS,
                            ARRAY_FILTER_FOREACH,
                            ARRAY_FILTER_JOIN,
                            ...
                        ],
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

После нахождение таких "дефектных" пакетов желательно написать им issue, что так делать плохо, а так же информировать меня, чтобы я мог вести список таких "плохих" пакетов.

## У вас есть идеи для трансформаций?

Не стесняйтесь - предлагайте новые виды трансформаций для ускорения кода.
Те трансформации, что есть в пресете - это лишь то что я нашел в своем продуктовом бандле. В вашем бандле возможно есть другие конструкции js, которые можно трансформировать в более производительные.

Возможно вам поможет данный [плагин](https://github.com/budarin/babel-plugin-stats-about-using-chain-methods)

Let's make babel-preset-perf great again together!😊

## License

[MIT](./LICENSE)
