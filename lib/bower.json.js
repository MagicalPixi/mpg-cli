var bowerJsonGenerate = function (name) {
  var bowserJson = {
  "name": name,
  "description": "A magic pixi game",
  "main": "index.js",
  "authors": [
    "Magic pixi"
  ],
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "public/bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "pixi": "~3.0.9"
  },
  "license": "ISC",
  "moduleType": [],
  "homepage": "http://www.magicalpixi.com/"
  } 
  return bowserJson
}

module.exports = bowerJsonGenerate
