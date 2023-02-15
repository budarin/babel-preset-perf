#!/bin/sh

set -e

. ./scripts/clean-cache.sh;

export "NODE_ENV"="production";

. ./scripts/build.sh;
. ./scripts/test.sh;

cp -rf ./assets/helpersPath.js ./dist/utils/;
cp -rf ./assets/getProgramVisitor.js ./dist/utils/;
cp -rf ./src/types.d.ts ./dist/;