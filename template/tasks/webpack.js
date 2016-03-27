/**
 * Created by zyg on 15/8/22.
 */
var path = require('path');
var gutil = require('gulp-util');

var exec = require('child_process').exec;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('../webpack.config.js');

module.exports = function (gulp) {

  gulp.task('webpack', function (callback) {
    webpack(webpackConfig, function (err, stats) {
      if (err) throw new gutil.PluginError('webpack', err);
      gutil.log("[webpack]", stats.toString({
          // output options
        })
      );
    });
  });
  gulp.task('webpackDevServer', function(callback) {
    console.log('starting webpack-dev');
    // Start a webpack-dev-server
    exec('webpack-dev-server --hot --inline --display-error-details --port '+webpackConfig.webpackDevPort,function(){
      console.log.apply(console,arguments);
    });
  });
};