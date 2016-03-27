#!/usr/bin/env node
/**
 * Created by zyg on 16/3/21.
 */
var fs = require('fs');
var path = require('path');

var copy = require('./copy');

var argv = process.argv.slice(2);
//游戏名字
var gameName = argv[0];
//当前目录文件夹
var cwd = process.cwd();

copy(
  path.resolve(__dirname,'./template'),
  path.resolve(cwd,gameName)
);