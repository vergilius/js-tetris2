import {BLOCK_COLOURS} from './config';

const IMG_PATH = 'dist/img';
const ASSETS = BLOCK_COLOURS.map(colour => ({
  name: `block_${colour}`,
  path: `${IMG_PATH}/block_${colour}.png`
}));

export const getAssets = () => ASSETS;
export const getAsset = name => ASSETS.filter(asset => asset.name === name)[0];
export const getAssetPath = name => {
  const asset = getAsset(name);

  if (asset) {
    return asset.path;
  }

  return null;
};

export const createSprite = name => name ? new PIXI.Sprite(PIXI.loader.resources[getAssetPath(name)].texture) : new PIXI.Sprite();