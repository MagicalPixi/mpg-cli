#!/usr/bin/env bash
dir=$1;
gameName=$2;

cd $gameName

git init

git remote -add origin git@github.com:MagicalPixi/$gameName.git