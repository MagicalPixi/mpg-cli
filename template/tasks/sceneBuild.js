/**
 * Created by zyg on 16/4/2.
 */
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

var packageJsonPath = path.resolve(__dirname,'../package.json');

var scenesDir = path.resolve(__dirname,'../src/scenes/');
if(!fs.existsSync(scenesDir)){
  fs.mkdirSync(scenesDir);
}

var sceneIndexFileName = 'index.js';
var addResourceFileName = 'addResource.js';

var addResourceFn = ejs.compile(fs.readFileSync(path.resolve(__dirname,'./sceneTemp/addResource.ejs')).toString());
var sceneFn = ejs.compile(fs.readFileSync(path.resolve(__dirname,'./sceneTemp/scene.ejs')).toString());

var saveSpritesDir = path.resolve(__dirname,'../src/sprites/');

function existJsonInDir(dirPath){
  return fs.readdirSync(dirPath).some(function (file) {
    return /\.json$/.test(file);
  });
}

module.exports = function (gulp) {

  var scenes = null;

  gulp.task('scene-before', function () {
    var packageJsonObj = JSON.parse(fs.readFileSync(packageJsonPath).toString());

    scenes = packageJsonObj.scenes;
  });

  gulp.task('scene',['scene-before'], function () {

    Object.keys(scenes).map(function (sceneName) {
      var sceneDir = path.join(scenesDir,sceneName);
      var indexFilePath = path.join(sceneDir,sceneIndexFileName);
      var addResourceFilePath = path.join(sceneDir,addResourceFileName);
      var sceneResources = scenes[sceneName];

      if(!fs.existsSync(sceneDir)){
        fs.mkdirSync(sceneDir)
      }

      if(!fs.existsSync(indexFilePath)){
        fs.writeFileSync(indexFilePath,sceneFn())
      }

      var png = [];
      var json = [];

      sceneResources.map(function (resourceName) {
        return path.join(saveSpritesDir,resourceName);
      }).map(function (resourceDir,i) {

        if(existJsonInDir(resourceDir)){
          json.push(sceneResources[i]);
        }else{
          png.push(sceneResources[i]);
        }
      });


      fs.writeFileSync(addResourceFilePath,addResourceFn({
        png,json
      }));
    });
  });
};