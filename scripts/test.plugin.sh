#!/bin/sh

set -e

. ./scripts/build.sh;

export "NODE_ENV"="test";
export "DEV_RUN"="true";

jest ./tests/helpers-tests/ ./tests/complete-tests;

