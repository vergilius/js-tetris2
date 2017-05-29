import PIXI from './pixi';
import Tetris from './tetris';
import pubsub from './pubsub';

import {KEY_MAP} from './config';
import {preloadAssets, gameLoop, addChildRecursively} from './pixi_helpers';

const start = () => {
  const renderer = new PIXI.CanvasRenderer(300, 500);
  const scene = new PIXI.Container();

  const _Tetris = new Tetris({
    onElementAdd: gameObject => addChildRecursively(scene, gameObject),
    onElementRemove: (gameObject, replaceWith) => {
      if (gameObject.sprite) {
        scene.removeChild(gameObject.sprite);
      }

      if (replaceWith) {
        addChildRecursively(scene, replaceWith);
      }
    }
  });

  window.addEventListener('keyup', event => {
    const eventName = KEY_MAP[event.keyCode];

    if (eventName) {
      pubsub.trigger(eventName);
    }
  });

  document.querySelector('.js-container').appendChild(renderer.view);
  gameLoop(renderer, scene, _Tetris);
  // it would actually make more sense to throttle rendering too -.-'
  setInterval(() => _Tetris.update(), 500);
};

// kick off
(() => {
  preloadAssets(start);
})()