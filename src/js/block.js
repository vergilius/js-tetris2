import {BLOCK_SIZE} from './config';
import {createSprite} from './assets';

class Block {
  constructor(x, y, assetId) {
    this.setPosition(x, y);
    this.assetId = assetId;
    this.sprite = createSprite(this.assetId);
    this.updateSize();
  }
  
  getAssetId() {
    return this.assetId;
  }

  updateSize() {
    this.sprite.x = this._baseX * BLOCK_SIZE;
    this.sprite.y = this._baseY * BLOCK_SIZE;
    this.sprite.width = BLOCK_SIZE;
    this.sprite.height = BLOCK_SIZE;
  }

  getSprite() {
    return this.sprite;
  }

  setPosition(x, y) {
    this._baseX = x;
    this._baseY = y;
  }

  getX() {
    return this._baseX;
  }

  getY() {
    return this._baseY;
  }

  remove() {
    // well, this is troublesome (╯︵╰,)
    // this.sprite.parent.removeChild(this.sprite);

    this.sprite.visible = false;
  }

  moveDown() {
    this.setPosition(this.getX(), this.getY() + 1);
  }
}

export default Block;