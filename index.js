#!/usr/local/bin/node node
/**
 * Created by zyg on 16/3/21.
 */
var fs = require('fs');
var path = require('path');

var copy = require('./copy');

var execFile = require('child_process').execFile;

var argv = process.argv.slice(2);
//游戏名字
var gameName = argv[0];
//当前目录文件夹
var cwd = process.cwd();

var gameDir = path.resolve(cwd,gameName);
//git init shell
var gitInitSh = path.resolve(__dirname,'gitInit.sh');

copy(
  path.resolve(__dirname,'./template'),
  gameDir
);

const child = execFile(gitInitSh, [gameDir,gameName], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});