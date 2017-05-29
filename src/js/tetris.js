import {DIRECTION, BLOCK_SIZE, COURT_WIDTH, COURT_HEIGHT, FIGURES} from './config';
import {random} from './utils';
import pubsub from './pubsub';
import Figure from './figure';

class Tetris {
  constructor(onElementAdd) {
    this._onElementAdd = onElementAdd;
    this.currentPiece = null;
    this.running = false;
    this.blocks = {};

    this.listen();
    this.setCurrentPiece();
  }
  listen () {
    pubsub.on('rotate', () => this.rotateCurrent());
    pubsub.on('moveLeft', () => this.moveCurrent(DIRECTION.LEFT));
    pubsub.on('moveRight', () => this.moveCurrent(DIRECTION.RIGHT));
  }

  placeAvailableFor (current, x, y) {
    let result = true;

    current.checkPosition(x, y, function (x, y) {
      const width = x * BLOCK_SIZE;
      const height = y * BLOCK_SIZE;

      if (((width < 0) || (width >= COURT_WIDTH) ||
          (height >= COURT_HEIGHT)) ||
        !!this.getBlockFromPosition(x, y)) {

        result = false;
      }
    }.bind(this));

    return result;
  }

  placeFigure () {
    const current = this.getCurrent();

    current.getBlocks().getItems().forEach(block => this.placeBlock(current, block));
  }

  getCurrent () {
    return this.currentFigure;
  }

  setCurrentPiece () {
    const figure = FIGURES[random(0, FIGURES.length)];
    this.currentFigure = new Figure(0, -5, figure.positions, DIRECTION.DOWN, figure.asset);
    this._onElementAdd(this.currentFigure);
  }

  getBlockFromPosition (x, y) {
    if (this.blocks[x]) {
      return this.blocks[x][y];
    }

    return null;
  }

  placeBlock (figure, block) {
    const x = figure.getX() + block.getX();
    const y = figure.getY() + block.getY();

    if (!this.blocks[x]) {
      this.blocks[x] = {};
    }

    this.blocks[x][y] = block;
  }

  getCurrentBlocks () {
    const current = this.getCurrent();
    const blocks = [];

    // current.forEachBlock(function (x, y, type) {
    //   blocks.push(this.createBlock(x, y, type.color));
    // }.bind(this));

    return current.getBlocks().getItems();
  }

  getPlacedBlocks () {
    // const block;
    // const blocks = [];

    // for (const y = 0; y < COURT_HEIGHT; y++) {
    //   for (const x = 0; x < COURT_WIDTH; x++) {
    //     block = this.getBlockFromPosition(x, y);
    //     if (block) {
    //       blocks.push(this.createBlock(x, y, block.color));
    //     }
    //   }
    // }

    return this.blocks;
  }

  rotateCurrent () {
    const current = this.getCurrent();
    const prevRotation = current.direction;

    // todo: change to array picking
    current.rotate((current.direction === DIRECTION.MAX ? DIRECTION.MIN : current.direction + 1))

    // if (current) {
    //   if (!this.placeAvailableFor(current, current.x, current.y)) {
    //     current.rotate(prevRotation);
    //   }
    // }
  }

  moveCurrent (direction) {
    const current = this.getCurrent();
    let x = 0;
    let y = 1;

    switch (direction) {
      case DIRECTION.RIGHT:
        x = 1;
        break;
      case DIRECTION.LEFT:
        x = -1
        break;
    }

    if (this.placeAvailableFor(current, x, y)) {
      current.move(x, y);
      return true;
    }

    return false;
  }

  placeCurrent () {
    const current = this.getCurrent();
    current.place = true;
  }

  handleLines () {
    let x;
    let y;
    let complete;
    let n = 0;

    for (y = COURT_HEIGHT; y > 0; --y) {
      complete = true;

      for (x = 0; x < COURT_WIDTH; ++x) {
        if (!this.getBlockFromPosition(x, y)) {
          complete = false;
        }

      }

      if (complete) {
        this.removeLine(y);
        y = y + 1; // recheck same line
        n++;
      }
    }

    if (n > 0) {
      this.trigger('scored', n);

      // example scoring: 100*Math.pow(2, n-1)
      // 1: 100, 2: 200, 3: 400, 4: 800
    }
  }

  removeLine (top) {
    let x;
    let y;

    for (y = top; y >= 0; --y) {
      for (x = 0; x < COURT_WIDTH; ++x) {
        this.placeBlock(x, y, (y === 0) ?
          null : this.getBlockFromPosition(x, y - 1));
      }
    }
  }

  update (delta) {
    // this.rotateCurrent();
    if (!this.moveCurrent(DIRECTION.DOWN)) {
      console.error('yay stop right there man!')
      this.placeFigure();
      this.handleLines();
      this.setCurrentPiece();
    }
  }

  getAllBlocks () {
    const current = this.getCurrentBlocks();
    const blocks = this.getPlacedBlocks();

    if (current) {
      return current.concat(blocks);
    } else {
      return blocks;
    }

  }

}

export default Tetris;
