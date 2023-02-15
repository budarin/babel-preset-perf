#!/bin/sh

set -e

git fetch -p && for branch in `git branch -vv --no-color | grep ': gone]' | awk '{print $1}'`; do git branch -D $branch; done;
git pull --tags origin "$(git branch | grep -E '^\* ' | sed 's/^\* //g')"