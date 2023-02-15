#!/bin/sh

set -e

yarn upgrade-interactive --latest;
yarn upgrade;
yarn postinstall;
