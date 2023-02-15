Object.entries(obj).reduce((acc, [key, val], i) => acc + key.length + String(val).length + i, 0);
Object.entries({ a: 1, b: 2 }).reduce((acc, [key, val], i) => acc + key.length + String(val).length + i, 0);
