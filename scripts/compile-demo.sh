#!/bin/sh

set -e

export "DEV_RUN"="true";

. ./scripts/build.sh;

{
  curl -X POST -H "Content-Type: application/json" --data '{}' http://127.0.0.1:3000/reset 2> /dev/null;
} || {
  echo;
}
  babel ./tests/demo --out-dir ./demo-compiled;