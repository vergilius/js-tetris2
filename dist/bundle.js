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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// thanks pixi (for being douchebag)
exports.default = window.PIXI;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pixi = __webpack_require__(0);

var _pixi2 = _interopRequireDefault(_pixi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('start', _pixi2.default);

var BLOCK_COLOURS = ['blue', 'cyan', 'green', 'orange', 'purple', 'red', 'yellow'];
var IMG_PATH = 'dist/img';
var ASSETS = BLOCK_COLOURS.map(function (colour) {
  return {
    name: 'block_' + colour,
    path: IMG_PATH + '/block_' + colour + '.png'
  };
});

var getAsset = function getAsset(name) {
  return ASSETS.filter(function (asset) {
    return asset.name === name;
  })[0];
};
var getAssetPath = function getAssetPath(name) {
  var asset = getAsset(name);

  if (asset) {
    return asset.path;
  }

  return null;
};

var setup = function setup() {
  var renderer = new _pixi2.default.CanvasRenderer(512, 512);
  var scene = new _pixi2.default.Container();

  console.log(getAsset('block_blue'));
  console.log(getAssetPath('block_blue'));
  var testSprite = new _pixi2.default.Sprite(_pixi2.default.loader.resources[getAssetPath('block_blue')].texture);

  scene.addChild(testSprite);

  renderer.autoResize = true;
  document.body.appendChild(renderer.view);

  renderer.render(scene);
};

var preloadAssets = function preloadAssets() {
  _pixi2.default.loader.add(ASSETS.map(function (asset) {
    return asset.path;
  })).load(setup);
};

preloadAssets();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map