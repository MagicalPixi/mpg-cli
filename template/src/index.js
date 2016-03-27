var pixiLib = require('pixi-lib');

var renderer = new PIXI.autoDetectRenderer(640, 1004, {
    transparent: true
  }
);

document.body.appendChild(renderer.view);

var rafI = 0;
var render = function (currentStage) {

  cancelAnimationFrame(rafI);

  function animate() {

    if (currentStage.render) {
      currentStage.render();
    }

    currentStage.children.forEach(function (child) {
      if (child.render) {
        child.render();
      }
    });

    renderer.render(currentStage);

    rafI = requestAnimationFrame(animate);
  }

  animate();
};

var scenesLoader = require.context('./scenes/');

scenesLoader.keys().map(function (key, i) {
  window['scene' + i] = function () {
    scenesLoader(key)(renderer)
  }
});