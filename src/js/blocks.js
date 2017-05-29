import Block from './block';
import {createSprite} from './assets';

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

export default Blocks;