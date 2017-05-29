import {DIRECTION, BLOCK_SIZE} from './config';
import {createSprite} from './assets';
import Blocks from './blocks';

const directions = [DIRECTION.DOWN, DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.UP];

class Figure {
  constructor(x, y, blocks, direction, assetId) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.blocksVariants = blocks;
    this.blocks = {};

    this.prepareBlocks(assetId);

    this.sprite = this.createSprite();
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getBlockSprites() {
    const blocks = this.getBlocks();
    const sprites = [];

    blocks.getItems().forEach(block => {
      const sprite = createSprite();
      sprite.x = (this.getX() + block.getX()) * BLOCK_SIZE;
      sprite.y = (this.getY() + block.getY()) * BLOCK_SIZE;
      sprites.push(sprite);
    });

    return sprites;
  }

  createSprite() {
    const sprite = createSprite();
    sprite.addChild(this.getBlocks().getSprite());
    sprite.x = this.x * BLOCK_SIZE;
    sprite.y = this.y * BLOCK_SIZE;

    return sprite;
  }

  checkPosition(x, y, callback) {
    const blocks = this.getBlocks();

    blocks.getItems().forEach(block => {
      callback(this.x + x + block.getX(), this.y + y + block.getY());
    });
  }

  move(x, y) {
    this.x += x;
    this.y += y;

    this.sprite.x = this.x * BLOCK_SIZE;
    this.sprite.y = this.y * BLOCK_SIZE;
  }

  prepareBlocks(assetId) {
    const blocks = {};

    directions.forEach(direction => {
      blocks[direction] = new Blocks(this.blocksVariants[direction], assetId);
    });

    this.blocks = blocks;
  }

  rotate(newDirection) {
    this.direction = newDirection;

    // hello again, its me - PIXI - again
    // sprite rotation - is the way it should be implemented properly
    const parent = this.sprite.parent;
    parent.removeChild(this.sprite);

    this.sprite = this.createSprite();
    parent.addChild(this.sprite);
  }

  getBlocks() {
    return this.blocks[this.direction];
  }
}

export default Figure;