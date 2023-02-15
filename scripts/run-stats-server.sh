#!/bin/sh

set -e

. ./scripts/build.sh;

echo;

node ./dist/statsServer.js