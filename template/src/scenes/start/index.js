var loader = require('../../loader');
var addResource = require('./addResource');

module.exports = function (render) {

  addResource(loader.add.bind(loader),function(){

    var stage = new PIXI.Container();

    var boom = require('../../sprites/boom/');

    stage.addChild(boom);

    render(stage);
  });
};