#!/bin/sh

set -e

export "NODE_ENV"="production";

# yarn zx ./benchmark/node/index.mjs --host 127.0.0.1 --port 5000;
yarn zx ./benchmark/node/index.mjs;