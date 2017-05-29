import {DIRECTION, BLOCK_SIZE, COURT_WIDTH, COURT_HEIGHT, COURT_WIDTH_IN_BLOCKS, COURT_HEIGHT_IN_BLOCKS, FIGURES} from './config';
import {random} from './utils';
import pubsub from './pubsub';
import Figure from './figure';
import Block from './block';

class Tetris {
  constructor({
    onElementAdd,
    onElementRemove
  }) {
    this._onElementAdd = onElementAdd;
    this._onElementRemove = onElementRemove;
    this.blocks = {};
    this.frozenUntilPlaced = false;

    this.listen();
    this.setCurrentFigure();
  }
  listen () {
    pubsub.on('rotate', () => this.rotateCurrent());
    pubsub.on('moveLeft', () => this.moveCurrent(DIRECTION.LEFT));
    pubsub.on('moveRight', () => this.moveCurrent(DIRECTION.RIGHT));
    pubsub.on('moveDown', () => this.moveUntilPlaced());
  }

  placeAvailableFor (current, nextX, nextY) {
    let result = true;

    current.checkPosition(nextX, nextY, (x, y) => {
      const width = x * BLOCK_SIZE;
      const height = y * BLOCK_SIZE;

      if (((width < 0) || (width >= COURT_WIDTH) ||
          (height >= COURT_HEIGHT)) || !!this.getBlockFromPosition(x, y)) {
        result = false;
      }
    });

    return result;
  }
  
  moveUntilPlaced() {
    this.frozenUntilPlaced = true;

    setTimeout(() => {
      this.moveCurrent(DIRECTION.DOWN);

      if (this.frozenUntilPlaced) {
        this.moveUntilPlaced();
      }
    }, 50);
  }

  placeFigure () {
    const current = this.getCurrentFigure();

    current.getBlocks().getItems().forEach(block => this.placeBlock(current, block));
    this._onElementRemove(current);
  }

  getCurrentFigure () {
    return this.currentFigure;
  }

  setCurrentFigure () {
    const figure = FIGURES[random(0, FIGURES.length)];
    this.currentFigure = new Figure(5, -5, figure.positions, DIRECTION.DOWN, figure.asset);
    this._onElementAdd(this.currentFigure);
  }

  getBlockFromPosition (x, y) {
    if (this.blocks[x]) {
      return this.blocks[x][y];
    }

    return null;
  }

  moveBlock (x, y, blockFromAbove) {
    if (!this.blocks[x]) {
      this.blocks[x] = {};
    }

    // oh well, this doesn't work in some cases -.-
    if (this.blocks[x][y] && blockFromAbove) {
      this.blocks[x][y].moveDown();
      this.blocks[x][y] = blockFromAbove;
    } else if (this.blocks[x][y]) {
      this.blocks[x][y].remove();
      this.blocks[x][y] = null;
    }
  }

  placeBlock (figure, block) {
    const x = figure.getX() + block.getX();
    const y = figure.getY() + block.getY();

    if (!this.blocks[x]) {
      this.blocks[x] = {};
    }

    const newBlock = new Block(x, y, block.getAssetId());
    this.blocks[x][y] = newBlock;

    this._onElementAdd(newBlock);
  }

  rotateCurrent () {
    const current = this.getCurrentFigure();
    const prevRotation = current.direction;

    // todo: change to array picking
    current.rotate((current.direction === DIRECTION.MAX ? DIRECTION.MIN : current.direction + 1));
  }

  moveCurrent (direction) {
    const current = this.getCurrentFigure();
    let x = 0;
    let y = 1;

    if (direction === DIRECTION.RIGHT) {
      x = 1;
    } else if (direction === DIRECTION.LEFT) {
      x = -1;
    }

    if (this.placeAvailableFor(current, x, y)) {
      current.move(x, y);
      return true;
    }

    return false;
  }

  placeCurrent () {
    const current = this.getCurrentFigure();
    current.place = true;
  }

  handleLines () {
    let shouldRemove;

    for (let y = COURT_HEIGHT_IN_BLOCKS; y > 0; --y) {
      shouldRemove = true;

      for (let x = 0; x < COURT_WIDTH_IN_BLOCKS; ++x) {
        if (!this.getBlockFromPosition(x, y)) {
          shouldRemove = false;
        }
      }

      if (shouldRemove) {
        this.removeLine(y);
        // recheck the same line
        y = y + 1;
      }
    }
  }

  removeLine (fromTop) {
    for (let y = fromTop; y >= 0; --y) {
      for (let x = 0; x < COURT_WIDTH; ++x) {
        this.moveBlock(x, y, (y === 0) ? null : this.getBlockFromPosition(x, y - 1));
      }
    }
  }

  finished() {
    const current = this.getCurrentFigure()
    return current.getY() < -5;
  }

  update (delta) {
    if (!this.moveCurrent(DIRECTION.DOWN) && !this.finished()) {
      this.frozenUntilPlaced = false;
      this.placeFigure();
      this.handleLines();
      this.setCurrentFigure();

    }
  }
}

export default Tetris;
