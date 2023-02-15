#!/bin/sh

set -e

export "DEV_RUN"="true";

. ./scripts/build.sh;
babel ./tests/demo/index.js