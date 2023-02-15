#!/bin/sh

set -e

export "NODE_ENV"="production";

if [ ! -d ./dist/stats.json ]; then
    rm -rf ./dist/stats.json;
fi;

if [ ! -d ./dist ] && [ "$CI" != "true" ]; then
    sh ./scripts/clean-cache.sh;
fi;


yarn tsc;
cp -R ./src/helpers ./dist/;
cp -rf ./src/types.d.ts ./dist/;