#!/bin/sh

set -e

export "DEV_RUN"="true";

. ./scripts/build.sh;
yarn babel ./tests/demo/index.js