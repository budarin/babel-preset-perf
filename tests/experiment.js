const fs = require('fs');
const path = require('path');

async function ls(path) {
    const dir = await fs.promises.opendir(path);

    const testFolderName = path.split('/').slice(3);
    const filesArr = [];

    for await (const file of dir) {
        const fileName = file.name;
        // console.log(fileName);
        filesArr.push(fileName);
    }

    console.log('');
    console.log(`// ${testFolderName}`);
    // console.log(`<!-- ${testFolderName} -->`);

    filesArr.sort().forEach((fileName) => {
        // const imp = `<script src="../tests/${testFolderName}/${fileName}.js"></script>`;
        const imp = `import '../tests/${testFolderName}/${fileName}';`;
        console.log(imp);
    });
}

// void ls('./benchmark/tests/Array');
// void ls('./benchmark/tests/Object');
// void ls('./benchmark/tests/Numbers');
// void ls('./benchmark/tests/String');

// rename files -------------------------------------------------------

async function rename(dirPath) {
    const dir = await fs.promises.opendir(dirPath);

    for await (const file of dir) {
        const fname = file.name;
        // console.log(fname);

        if (fname.endsWith('.js')) {
            // console.log(path.join(dirPath, fname));
            await fs.promises.rename(path.join(dirPath, fname), path.join(dirPath, fname.replace('.js', '.ts')));
        }
    }
}

// void rename('./tests/helpers-tests');

// --------------------------------------------

// var os = require('os');

// console.log(os.type()); // "Windows_NT"
// console.log(os.release()); // "10.0.14393"
// console.log(os.platform()); // "win32"
// console.log(os.version()); // "win32"
// console.log(process.version);
// console.log(process);

function objectEntriesMapHelperWithMapThis(obj, mapPredicate, mapThis) {
    var i = -1;
    var keys = Object.keys(obj);
    var len = keys.length;
    var result = Array(len);

    while (++i < len) {
        var key = keys[i];
        result[i] = mapPredicate.call(mapThis, [key, obj[key]], i);
    }

    return result;
}

const obj = { one: 1, two: 2 };
const o = { i: 1 };

const r1 = objectEntriesMapHelperWithMapThis(
    obj,
    function ([key, val], i) {
        return key.length + String(val).length + this.i;
    },
    o,
);

const r2 = Object.entries(obj).map(function ([key, val], i) {
    return key.length + String(val).length + this.i;
}, o);

console.log(r1);
console.log(r2);
