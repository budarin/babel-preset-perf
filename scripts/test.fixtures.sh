#!/bin/sh

set -e

. ./scripts/build.sh;

export "DEV_RUN"="false";
jest ./tests/transformation-tests/fixtures.test.js  --passWithNoTests
