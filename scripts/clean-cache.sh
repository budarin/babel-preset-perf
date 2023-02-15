#!/bin/sh

set -e

rm -rf ./dist;
rm -rf .eslintcache;
rm -rf ./dist;
rm -rf node_modules/.cache;

jest --clearCache;