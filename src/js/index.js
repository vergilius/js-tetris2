import PIXI from './pixi';

console.log('start', PIXI)

const BLOCK_COLOURS = ['blue', 'cyan', 'green', 'orange', 'purple', 'red', 'yellow'];
const IMG_PATH = 'dist/img';
const ASSETS = BLOCK_COLOURS.map(colour => ({
  name: `block_${colour}`,
  path: `${IMG_PATH}/block_${colour}.png`
}));

const getAsset = name => ASSETS.filter(asset => asset.name === name)[0];
const getAssetPath = name => {
  const asset = getAsset(name);

  if (asset) {
    return asset.path;
  }

  return null;
};

const setup = () => {
  const renderer = new PIXI.CanvasRenderer(512, 512);
  const scene = new PIXI.Container();

  console.log(getAsset('block_blue'))
  console.log(getAssetPath('block_blue'))
  const testSprite = new PIXI.Sprite(
    PIXI.loader.resources[getAssetPath('block_blue')].texture
  );

  scene.addChild(testSprite);

  renderer.autoResize = true;
  document.body.appendChild(renderer.view);

  renderer.render(scene);
};

const preloadAssets = () => {
  PIXI.loader
    .add(ASSETS.map(asset => asset.path))
    .load(setup);
};


preloadAssets();