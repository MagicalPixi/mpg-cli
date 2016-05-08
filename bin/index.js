#! /usr/bin/env node

var version = '1.0.0'
var packageJson = require('../lib/package.json.js')
var shell = require('shelljs')
var program = require('commander')
var jsonfile = require('../lib/jsonfile.js')
var path = require('path')
var bowerJsonGenerate = require('../lib/bower.json.js')

/**
 *  
 * */

program.version(version).command('init <name>').action(function(name) {
  name = name || 'example'
  var cwd = process.cwd();
  shell.exec('mkdir ' + name,  function(code, stdout, stderr) {
    if (code === 0) {
      var file = path.resolve(cwd, './' + name + '/package.json')
      var bowserfile = path.resolve(cwd, './' + name + '/bower.json')
      jsonfile(file, packageJson, {spaces: 2})
      jsonfile(bowserfile, bowerJsonGenerate(name), {spaces: 2})
      var webpackTempDir = path.resolve(__dirname, '../lib/webpack.config.temp.js')
      var htmlTempDir = path.resolve(__dirname, '../lib/index.temp.html')
      var webpackTarDir = path.resolve(cwd, './' + name + '/webpack.config.js')
      var htmlTarDir = path.resolve(cwd, './' + name + '/index.html')
      shell.exec('cp ' + webpackTempDir + ' ' + webpackTarDir + ' && cp ' + htmlTempDir + ' ' + htmlTarDir)
    }
  })
})

program.version(version).command('publish').action(function() {
  
})

program.version(version).command('search <name>').action(function(name) {
  
})

program.version(version).command('install <name>').action(function(name) {

})

program.parse(process.argv);

