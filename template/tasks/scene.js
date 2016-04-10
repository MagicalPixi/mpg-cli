/**
 * Created by zyg on 16/4/2.
 */
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

var sceneBuild = require('./lib/sceneBuild');

var packageJsonPath = path.resolve(__dirname,'../package.json');

var scenesDir = path.resolve(__dirname,'../src/scenes/');
if(!fs.existsSync(scenesDir)){
  fs.mkdirSync(scenesDir);
}

var saveSpritesDir = path.resolve(__dirname,'../src/sprites/');

module.exports = function (gulp) {

  var scenes = null;

  gulp.task('scene-before', function () {
    var packageJsonObj = JSON.parse(fs.readFileSync(packageJsonPath).toString());

    scenes = packageJsonObj.scenes;
  });

  gulp.task('scene',['scene-before'], function () {

    Object.keys(scenes).map(function (sceneName) {

      var sceneDir = path.join(scenesDir,sceneName);
      var sceneResources = scenes[sceneName];

      sceneBuild(sceneDir,sceneName,saveSpritesDir,sceneResources)
    });
  });
};