/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BLOCK_COLOURS = exports.BLOCK_COLOURS = ['blue', 'cyan', 'green', 'orange', 'purple', 'red', 'yellow'];
var DIRECTION = exports.DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
  MIN: 0,
  MAX: 3
};

var BLOCK_SIZE = exports.BLOCK_SIZE = 25;
var COURT_WIDTH_IN_BLOCKS = exports.COURT_WIDTH_IN_BLOCKS = 12;
var COURT_HEIGHT_IN_BLOCKS = exports.COURT_HEIGHT_IN_BLOCKS = 20;
var COURT_WIDTH = exports.COURT_WIDTH = COURT_WIDTH_IN_BLOCKS * BLOCK_SIZE;
var COURT_HEIGHT = exports.COURT_HEIGHT = COURT_HEIGHT_IN_BLOCKS * BLOCK_SIZE;

var FIGURES = exports.FIGURES = [{ type: 'i', positions: [0x00F0, 0x4444, 0x00F0, 0x4444], asset: 'block_blue' }, { type: 'j', positions: [0x44C0, 0x8E00, 0x6440, 0x0E20], asset: 'block_cyan' }, { type: 'l', positions: [0x4460, 0x0E80, 0xC440, 0x2E00], asset: 'block_green' }, { type: 'o', positions: [0xCC00, 0xCC00, 0xCC00, 0xCC00], asset: 'block_orange' }, { type: 's', positions: [0x06C0, 0x4620, 0x06C0, 0x4620], asset: 'block_purple' }, { type: 't', positions: [0x0E40, 0x4C40, 0x4E00, 0x4640], asset: 'block_red' }, { type: 'z', positions: [0x0C60, 0x2640, 0x0C60, 0x2640], asset: 'block_yellow' }];

var KEY_MAP = exports.KEY_MAP = {
  37: 'moveLeft',
  38: 'rotate',
  39: 'moveRight',
  40: 'moveDown'
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// thanks pixi (for being douchebag)
exports.default = window.PIXI;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _utils = __webpack_require__(4);

var _pubsub = __webpack_require__(13);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _figure = __webpack_require__(6);

var _figure2 = _interopRequireDefault(_figure);

var _block = __webpack_require__(5);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tetris = function () {
  function Tetris(_ref) {
    var onElementAdd = _ref.onElementAdd,
        onElementRemove = _ref.onElementRemove;

    _classCallCheck(this, Tetris);

    this._onElementAdd = onElementAdd;
    this._onElementRemove = onElementRemove;
    this.blocks = {};
    this.frozenUntilPlaced = false;

    this.listen();
    this.setCurrentFigure();
  }

  _createClass(Tetris, [{
    key: 'listen',
    value: function listen() {
      var _this = this;

      _pubsub2.default.on('rotate', function () {
        return _this.rotateCurrent();
      });
      _pubsub2.default.on('moveLeft', function () {
        return _this.moveCurrent(_config.DIRECTION.LEFT);
      });
      _pubsub2.default.on('moveRight', function () {
        return _this.moveCurrent(_config.DIRECTION.RIGHT);
      });
      _pubsub2.default.on('moveDown', function () {
        return _this.moveUntilPlaced();
      });
    }
  }, {
    key: 'placeAvailableFor',
    value: function placeAvailableFor(current, nextX, nextY) {
      var _this2 = this;

      var result = true;

      current.checkPosition(nextX, nextY, function (x, y) {
        var width = x * _config.BLOCK_SIZE;
        var height = y * _config.BLOCK_SIZE;

        if (width < 0 || width >= _config.COURT_WIDTH || height >= _config.COURT_HEIGHT || !!_this2.getBlockFromPosition(x, y)) {
          result = false;
        }
      });

      return result;
    }
  }, {
    key: 'moveUntilPlaced',
    value: function moveUntilPlaced() {
      var _this3 = this;

      this.frozenUntilPlaced = true;

      setTimeout(function () {
        _this3.moveCurrent(_config.DIRECTION.DOWN);

        if (_this3.frozenUntilPlaced) {
          _this3.moveUntilPlaced();
        }
      }, 50);
    }
  }, {
    key: 'placeFigure',
    value: function placeFigure() {
      var _this4 = this;

      var current = this.getCurrentFigure();

      current.getBlocks().getItems().forEach(function (block) {
        return _this4.placeBlock(current, block);
      });
      this._onElementRemove(current);
    }
  }, {
    key: 'getCurrentFigure',
    value: function getCurrentFigure() {
      return this.currentFigure;
    }
  }, {
    key: 'setCurrentFigure',
    value: function setCurrentFigure() {
      var figure = _config.FIGURES[(0, _utils.random)(0, _config.FIGURES.length)];
      this.currentFigure = new _figure2.default(5, -5, figure.positions, _config.DIRECTION.DOWN, figure.asset);
      this._onElementAdd(this.currentFigure);
    }
  }, {
    key: 'getBlockFromPosition',
    value: function getBlockFromPosition(x, y) {
      if (this.blocks[x]) {
        return this.blocks[x][y];
      }

      return null;
    }
  }, {
    key: 'moveBlock',
    value: function moveBlock(x, y, blockFromAbove) {
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
  }, {
    key: 'placeBlock',
    value: function placeBlock(figure, block) {
      var x = figure.getX() + block.getX();
      var y = figure.getY() + block.getY();

      if (!this.blocks[x]) {
        this.blocks[x] = {};
      }

      var newBlock = new _block2.default(x, y, block.getAssetId());
      this.blocks[x][y] = newBlock;

      this._onElementAdd(newBlock);
    }
  }, {
    key: 'rotateCurrent',
    value: function rotateCurrent() {
      var current = this.getCurrentFigure();
      var prevRotation = current.direction;

      // todo: change to array picking
      current.rotate(current.direction === _config.DIRECTION.MAX ? _config.DIRECTION.MIN : current.direction + 1);
    }
  }, {
    key: 'moveCurrent',
    value: function moveCurrent(direction) {
      var current = this.getCurrentFigure();
      var x = 0;
      var y = 1;

      if (direction === _config.DIRECTION.RIGHT) {
        x = 1;
      } else if (direction === _config.DIRECTION.LEFT) {
        x = -1;
      }

      if (this.placeAvailableFor(current, x, y)) {
        current.move(x, y);
        return true;
      }

      return false;
    }
  }, {
    key: 'placeCurrent',
    value: function placeCurrent() {
      var current = this.getCurrentFigure();
      current.place = true;
    }
  }, {
    key: 'handleLines',
    value: function handleLines() {
      var shouldRemove = void 0;

      for (var y = _config.COURT_HEIGHT_IN_BLOCKS; y > 0; --y) {
        shouldRemove = true;

        for (var x = 0; x < _config.COURT_WIDTH_IN_BLOCKS; ++x) {
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
  }, {
    key: 'removeLine',
    value: function removeLine(fromTop) {
      for (var y = fromTop; y >= 0; --y) {
        for (var x = 0; x < _config.COURT_WIDTH; ++x) {
          this.moveBlock(x, y, y === 0 ? null : this.getBlockFromPosition(x, y - 1));
        }
      }
    }
  }, {
    key: 'finished',
    value: function finished() {
      var current = this.getCurrentFigure();
      return current.getY() < -5;
    }
  }, {
    key: 'update',
    value: function update(delta) {
      if (!this.moveCurrent(_config.DIRECTION.DOWN) && !this.finished()) {
        this.frozenUntilPlaced = false;
        this.placeFigure();
        this.handleLines();
        this.setCurrentFigure();
      }
    }
  }]);

  return Tetris;
}();

exports.default = Tetris;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pixi = __webpack_require__(1);

var _pixi2 = _interopRequireDefault(_pixi);

var _tetris = __webpack_require__(2);

var _tetris2 = _interopRequireDefault(_tetris);

var _pubsub = __webpack_require__(13);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _config = __webpack_require__(0);

var _pixi_helpers = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = function start() {
  var renderer = new _pixi2.default.CanvasRenderer(300, 500);
  var scene = new _pixi2.default.Container();

  var _Tetris = new _tetris2.default({
    onElementAdd: function onElementAdd(gameObject) {
      return (0, _pixi_helpers.addChildRecursively)(scene, gameObject);
    },
    onElementRemove: function onElementRemove(gameObject, replaceWith) {
      if (gameObject.sprite) {
        scene.removeChild(gameObject.sprite);
      }

      if (replaceWith) {
        (0, _pixi_helpers.addChildRecursively)(scene, replaceWith);
      }
    }
  });

  window.addEventListener('keyup', function (event) {
    var eventName = _config.KEY_MAP[event.keyCode];

    if (eventName) {
      _pubsub2.default.trigger(eventName);
    }
  });

  document.querySelector('.js-container').appendChild(renderer.view);
  (0, _pixi_helpers.gameLoop)(renderer, scene, _Tetris);
  // it would actually make more sense to throttle rendering too -.-'
  setInterval(function () {
    return _Tetris.update();
  }, 500);
};

// kick off
(function () {
  (0, _pixi_helpers.preloadAssets)(start);
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var random = exports.random = function random(min, max) {
  return Math.floor(min + Math.random() * max);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _assets = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = function () {
  function Block(x, y, assetId) {
    _classCallCheck(this, Block);

    this.setPosition(x, y);
    this.assetId = assetId;
    this.sprite = (0, _assets.createSprite)(this.assetId);
    this.updateSize();
  }

  _createClass(Block, [{
    key: 'getAssetId',
    value: function getAssetId() {
      return this.assetId;
    }
  }, {
    key: 'updateSize',
    value: function updateSize() {
      this.sprite.x = this._baseX * _config.BLOCK_SIZE;
      this.sprite.y = this._baseY * _config.BLOCK_SIZE;
      this.sprite.width = _config.BLOCK_SIZE;
      this.sprite.height = _config.BLOCK_SIZE;
    }
  }, {
    key: 'getSprite',
    value: function getSprite() {
      return this.sprite;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(x, y) {
      this._baseX = x;
      this._baseY = y;
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this._baseX;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this._baseY;
    }
  }, {
    key: 'remove',
    value: function remove() {
      // well, this is troublesome (╯︵╰,)
      // this.sprite.parent.removeChild(this.sprite);

      this.sprite.visible = false;
    }
  }, {
    key: 'moveDown',
    value: function moveDown() {
      this.setPosition(this.getX(), this.getY() + 1);
    }
  }]);

  return Block;
}();

exports.default = Block;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _assets = __webpack_require__(7);

var _blocks = __webpack_require__(14);

var _blocks2 = _interopRequireDefault(_blocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var directions = [_config.DIRECTION.DOWN, _config.DIRECTION.LEFT, _config.DIRECTION.RIGHT, _config.DIRECTION.UP];

var Figure = function () {
  function Figure(x, y, blocks, direction, assetId) {
    _classCallCheck(this, Figure);

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.blocksVariants = blocks;
    this.blocks = {};

    this.prepareBlocks(assetId);

    this.sprite = this.createSprite();
  }

  _createClass(Figure, [{
    key: 'getX',
    value: function getX() {
      return this.x;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }
  }, {
    key: 'getBlockSprites',
    value: function getBlockSprites() {
      var _this = this;

      var blocks = this.getBlocks();
      var sprites = [];

      blocks.getItems().forEach(function (block) {
        var sprite = (0, _assets.createSprite)();
        sprite.x = (_this.getX() + block.getX()) * _config.BLOCK_SIZE;
        sprite.y = (_this.getY() + block.getY()) * _config.BLOCK_SIZE;
        sprites.push(sprite);
      });

      return sprites;
    }
  }, {
    key: 'createSprite',
    value: function createSprite() {
      var sprite = (0, _assets.createSprite)();
      sprite.addChild(this.getBlocks().getSprite());
      sprite.x = this.x * _config.BLOCK_SIZE;
      sprite.y = this.y * _config.BLOCK_SIZE;

      return sprite;
    }
  }, {
    key: 'checkPosition',
    value: function checkPosition(x, y, callback) {
      var _this2 = this;

      var blocks = this.getBlocks();

      blocks.getItems().forEach(function (block) {
        callback(_this2.x + x + block.getX(), _this2.y + y + block.getY());
      });
    }
  }, {
    key: 'move',
    value: function move(x, y) {
      this.x += x;
      this.y += y;

      this.sprite.x = this.x * _config.BLOCK_SIZE;
      this.sprite.y = this.y * _config.BLOCK_SIZE;
    }
  }, {
    key: 'prepareBlocks',
    value: function prepareBlocks(assetId) {
      var _this3 = this;

      var blocks = {};

      directions.forEach(function (direction) {
        blocks[direction] = new _blocks2.default(_this3.blocksVariants[direction], assetId);
      });

      this.blocks = blocks;
    }
  }, {
    key: 'rotate',
    value: function rotate(newDirection) {
      this.direction = newDirection;

      // hello again, its me - PIXI - again
      // sprite rotation - is the way it should be implemented properly
      var parent = this.sprite.parent;
      parent.removeChild(this.sprite);

      this.sprite = this.createSprite();
      parent.addChild(this.sprite);
    }
  }, {
    key: 'getBlocks',
    value: function getBlocks() {
      return this.blocks[this.direction];
    }
  }]);

  return Figure;
}();

exports.default = Figure;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSprite = exports.getAssetPath = exports.getAsset = exports.getAssets = undefined;

var _config = __webpack_require__(0);

var IMG_PATH = 'dist/img';
var ASSETS = _config.BLOCK_COLOURS.map(function (colour) {
  return {
    name: 'block_' + colour,
    path: IMG_PATH + '/block_' + colour + '.png'
  };
});

var getAssets = exports.getAssets = function getAssets() {
  return ASSETS;
};
var getAsset = exports.getAsset = function getAsset(name) {
  return ASSETS.filter(function (asset) {
    return asset.name === name;
  })[0];
};
var getAssetPath = exports.getAssetPath = function getAssetPath(name) {
  var asset = getAsset(name);

  if (asset) {
    return asset.path;
  }

  return null;
};

var createSprite = exports.createSprite = function createSprite(name) {
  return name ? new PIXI.Sprite(PIXI.loader.resources[getAssetPath(name)].texture) : new PIXI.Sprite();
};

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(9)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(10);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var events = {};

function _on(event, callback) {
  var listeners = events[event];

  if (!listeners) {
    listeners = [];
    events[event] = listeners;
  }

  listeners.push({
    callback: callback
  });
}

function off(event) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (callback) {
    var listeners = events[event];

    events[event] = listeners.filter(function (listener) {
      return listener.callback !== callback;
    });
  } else {
    events[event] = null;
  }
}

function _trigger(event) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var listeners = events[event] || [];

  listeners.forEach(function (listener) {
    return listener.callback.apply(listener, args);
  });
}

exports.default = {
  on: function on(event, callback) {
    return _on(event, callback);
  },
  off: off,
  trigger: function trigger(event) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return setImmediate(function () {
      return _trigger.apply(undefined, [event].concat(args));
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11).setImmediate))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(5);

var _block2 = _interopRequireDefault(_block);

var _assets = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blocks = function () {
  function Blocks(items, assetId) {
    var _this = this;

    _classCallCheck(this, Blocks);

    this.items = this.build(items, assetId);

    this.sprite = (0, _assets.createSprite)();
    this.items.forEach(function (block) {
      return _this.sprite.addChild(block.getSprite());
    });
  }

  _createClass(Blocks, [{
    key: 'build',
    value: function build(items, assetId) {
      var blocks = [];
      var bit = void 0;
      var row = 0;
      var col = 0;

      // WATCH OUUUT! it's bitwise operator - RIGHT SHIFT
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Right_shift
      for (bit = 0x8000; bit > 0; bit = bit >> 1) {
        // WATCH OUUUT! it's bitwise operator - AND
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_AND
        if (items & bit) {
          blocks.push(new _block2.default(col, row, assetId));
        }

        if (++col === 4) {
          col = 0;
          ++row;
        }
      }

      return blocks;
    }
  }, {
    key: 'getSprite',
    value: function getSprite() {
      return this.sprite;
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      return this.items;
    }
  }]);

  return Blocks;
}();

exports.default = Blocks;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addChildRecursively = exports.gameLoop = exports.preloadAssets = undefined;

var _assets = __webpack_require__(7);

// import {getTime} from './time';

var preloadAssets = exports.preloadAssets = function preloadAssets(callback) {
  PIXI.loader.add((0, _assets.getAssets)().map(function (asset) {
    return asset.path;
  })).load(callback);
};

// let previous = 0;
var gameLoop = exports.gameLoop = function gameLoop(renderer, scene, _Tetris) {
  // ah, actually I don't use delta time to animate anything :O
  // const time = getTime(previous);
  // const {delta} = time;
  // previous = time.previous;

  requestAnimationFrame(function () {
    return gameLoop(renderer, scene, _Tetris);
  });

  // if (delta) {
  renderer.render(scene);
  // }
};

var addChildRecursively = exports.addChildRecursively = function addChildRecursively(scene, gameObject) {
  if (gameObject.sprite) {
    scene.addChild(gameObject.sprite);
  } else if (typeof gameObject.getChildren === 'function') {
    gameObject.getChildren().forEach(function (gameObject) {
      return addChildRecursively(scene, gameObject);
    });
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map