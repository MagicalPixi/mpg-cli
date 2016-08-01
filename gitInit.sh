#!/usr/bin/env bash
dir=$1
gameName=$2

cd $dir

git init

git remote add origin git@github.com:MagicalPixi/$gameName.git

echo "module.exports = { __DEBUG__:false };" > $dir/tasks/env.js

mv .npmignore .gitignore