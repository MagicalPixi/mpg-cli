/**
 * Created by zyg on 16/2/1.
 */
var path = require('path');

var request = require('request');

var rename = require('gulp-rename');
var download = require('gulp-download');
var unzip = require('gulp-unzip');

var fs = require('fs');
var spawn = require('child_process').spawn;

var downloadMaterialNames = [
 'sheren',
];

var filesInZip = [
  'sprite.js',
  '*.json',
  '*.png'
];

var downloadUrls = downloadMaterialNames.map(function (name) {
  return 'http://localhost:1414/api/buildDownloadZip?name='+name;
});

var saveSprites = path.resolve(__dirname,'../src/sprites/');

module.exports = function (gulp) {
  //解压有bug
  //gulp.task('down', function () {
  //
  //  var i = 0;
  //
  //  download(downloadUrls)
  //    .pipe(rename(function (path) {
  //      path.extname = '.zip';
  //      return path;
  //    }))
  //    .pipe(unzip())
  //    .pipe(gulp.dest(function (args) {
  //
  //      var nameIndex = parseInt(i++/4);
  //
  //      return path.join(saveSprites,'/'+downloadMaterialNames[nameIndex] + '/');
  //    }));
  //});
  gulp.task('down-before', function () {
    var i = 0;

    return download(downloadUrls)
      .pipe(rename(function (path) {
        path.basename = downloadMaterialNames[i];
        path.extname = '.zip';
        return path;
      }))
      .pipe(gulp.dest(function(args){
        var nameIndex = parseInt(i++);

        return path.join(saveSprites,downloadMaterialNames[nameIndex]);
      }));
  });

  gulp.task('down',['down-before'], function () {
    downloadMaterialNames.map(function (name) {
      var cwd = path.join(saveSprites,name);

      var indexJs = path.join(cwd,'index.js');

      var args = [
        '-o',
        name+'.zip',
      ];

      if(fs.existsSync(indexJs)){
        args = args.concat(filesInZip);
      }

      return new Promise(function (resolve) {

        console.log(cwd,name);

        var unzip = spawn('unzip',args,{
          cwd:cwd
        });

        unzip.on('error', function (err) {
          console.log('err:',err);
        });
        unzip.stderr.on('data', function (data){
          console.log('data:',data.toString());
        });

        unzip.on('close', function (code) {
            console.log('close code',code);
            resolve();
          });
      });
    });
  });
};