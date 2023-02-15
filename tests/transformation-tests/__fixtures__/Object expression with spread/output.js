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