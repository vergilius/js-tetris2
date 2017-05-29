import {DIRECTION, BLOCK_SIZE} from './config';
import {createSprite} from './assets';

const directions = [DIRECTION.DOWN, DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.UP];

class Block {
  constructor(x, y, assetId) {
    this._baseX = x;
    this._baseY = y;

    this.sprite = createSprite(assetId);
    this.sprite.x = x * BLOCK_SIZE;
    this.sprite.y = y * BLOCK_SIZE;
    this.sprite.width = BLOCK_SIZE;
    this.sprite.height = BLOCK_SIZE;
  }

  getSprite() {
    return this.sprite;
  }

  getX() {
    return this._baseX;
  }

  getY() {
    return this._baseY;
  }
}

class Blocks {
  constructor(items, assetId) {
    this.items = this.build(items, assetId);

    this.sprite = createSprite();
    this.items.forEach(block => this.sprite.addChild(block.getSprite()));
  }

  build(items, assetId) {
    const blocks = [];
    let bit;
    let row = 0;
    let col = 0;

    // WATCH OUUUT! it's bitwise operator - RIGHT SHIFT
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Right_shift
    for (bit = 0x8000; bit > 0; bit = bit >> 1) {
      // WATCH OUUUT! it's bitwise operator - AND
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND
      if (items & bit) {
        blocks.push(new Block(col, row, assetId))
      }

      if (++col === 4) {
        col = 0;
        ++row;
      }
    }

    return blocks;
  }

  getSprite() {
    return this.sprite;
  }

  getItems() {
    return this.items;
  }
}

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