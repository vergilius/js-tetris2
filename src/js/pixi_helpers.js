import {getAssets} from './assets';
// import {getTime} from './time';

export const preloadAssets = callback => {
  PIXI.loader
    .add(getAssets().map(asset => asset.path))
    .load(callback);
};

// let previous = 0;
export const gameLoop = (renderer, scene, _Tetris) => {
  // ah, actually I don't use delta time to animate anything :O
  // const time = getTime(previous);
  // const {delta} = time;
  // previous = time.previous;

  requestAnimationFrame(() => gameLoop(renderer, scene, _Tetris));

  // if (delta) {
    renderer.render(scene);
  // }
}

export const addChildRecursively = (scene, gameObject) => {
  if (gameObject.sprite) {
    scene.addChild(gameObject.sprite);
  } else if (typeof gameObject.getChildren === 'function') {
    gameObject.getChildren().forEach(gameObject => addChildRecursively(scene, gameObject));
  }
}