/**
 * Created by zyg on 16/2/1.
 */
var path = require('path');

var rename = require('gulp-rename');
var download = require('gulp-download');
var unzip = require('gulp-unzip');

var fs = require('fs');
var spawn = require('child_process').spawn;

var packageJsonPath = path.resolve(__dirname,'../package.json');

var server = 'http://localhost:1414/';//http://www.magicalpixi.com/
//资源名字
var downloadMaterialNames = [];
//var downloadMaterialNames = [
// 'sheren',
//];

//资源下载链接
var downloadUrls = [];

var filesInZip = [
  'sprite.js',
  '*.json',
  '*.png'
];

var saveSpritesDir = path.resolve(__dirname,'../src/sprites/');

if(!fs.existsSync(saveSpritesDir)){
  fs.mkdirSync(saveSpritesDir);
}

module.exports = function (gulp) {

  gulp.task('down-before', function () {
    var packageJsonObj = JSON.parse(fs.readFileSync(packageJsonPath).toString());

    var resources = packageJsonObj.resources || [];
    var scenes = packageJsonObj.scenes || {};

    var sceneResources = Object.keys(scenes).map(function (sceneName) {
      return scenes[sceneName]
    }).reduce(function (resources,nextResources) {
      return resources.concat(nextResources);
    });

    downloadMaterialNames = [...new Set(resources.concat(sceneResources))]

    downloadUrls = downloadMaterialNames.map(function (name) {
      return `${server}api/buildDownloadZip?name=${name}`;
    });
  });

  //下载，
  gulp.task('down-ing',['down-before'],function () {
    var i = 0;

    return download(downloadUrls)
      .pipe(rename(function (path) {
        path.basename = downloadMaterialNames[i];
        path.extname = '.zip';
        return path;
      }))
      .pipe(gulp.dest(function(args){
        var nameIndex = parseInt(i++);

        return path.join(saveSpritesDir,downloadMaterialNames[nameIndex]);
      }));
  });


  //解压
  gulp.task('down',['down-ing'], function () {
    downloadMaterialNames.map(function (name) {
      var cwd = path.join(saveSpritesDir,name);

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