import PIXI from './pixi';
import Tetris from './tetris';
import pubsub from './pubsub';
import {getAssets} from './assets';
import {getTime} from './time';

let _Tetris;
let previous = 0;

const KEY_MAP = {
  37: 'moveLeft',
  38: 'rotate',
  39: 'moveRight',
  40: 'moveDown'
};

const addChildRecursively = (scene, gameObject) => {
  if (gameObject.sprite) {
    scene.addChild(gameObject.sprite);
  } else if (typeof gameObject.getChildren === 'function') {
    gameObject.getChildren().forEach(gameObject => addChildRecursively(scene, gameObject));
  }
}

const setup = () => {
  const renderer = new PIXI.CanvasRenderer(300, 500);
  const scene = new PIXI.Container();

  window.sc = scene;

  const _Tetris = new Tetris(gameObject => {
    addChildRecursively(scene, gameObject);
  });

  window.addEventListener('keyup', function (event) {
    var eventName = KEY_MAP[event.keyCode];

    if (eventName) {
      console.log(pubsub, eventName);
      pubsub.trigger(eventName);
    }
  });

  document.querySelector('.js-container').appendChild(renderer.view);
  gameLoop(renderer, scene, _Tetris);
  setInterval(() => _Tetris.update(), 200);
};

const preloadAssets = () => {
  PIXI.loader
    .add(getAssets().map(asset => asset.path))
    .load(setup);
};


preloadAssets();

function gameLoop(renderer, scene, _Tetris) {
  // ah, actually I don't use delta time to animate anything :O
  const time = getTime(previous);
  const {delta} = time;
  previous = time.previous;

  requestAnimationFrame(() => gameLoop(renderer, scene, _Tetris));

  if (delta) {
    renderer.render(scene);
  }
}