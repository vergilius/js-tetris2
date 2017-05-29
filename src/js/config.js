export const BLOCK_COLOURS = ['blue', 'cyan', 'green', 'orange', 'purple', 'red', 'yellow'];
export const DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
  MIN: 0,
  MAX: 3
};

export const BLOCK_SIZE = 25;
export const COURT_WIDTH_IN_BLOCKS = 12;
export const COURT_HEIGHT_IN_BLOCKS = 20;
export const COURT_WIDTH = COURT_WIDTH_IN_BLOCKS * BLOCK_SIZE;
export const COURT_HEIGHT = COURT_HEIGHT_IN_BLOCKS * BLOCK_SIZE;

export const FIGURES = [
  { type: 'i', positions: [0x00F0, 0x4444, 0x00F0, 0x4444], asset: 'block_blue' },
  { type: 'j', positions: [0x44C0, 0x8E00, 0x6440, 0x0E20], asset: 'block_cyan' },
  { type: 'l', positions: [0x4460, 0x0E80, 0xC440, 0x2E00], asset: 'block_green' },
  { type: 'o', positions: [0xCC00, 0xCC00, 0xCC00, 0xCC00], asset: 'block_orange' },
  { type: 's', positions: [0x06C0, 0x4620, 0x06C0, 0x4620], asset: 'block_purple' },
  { type: 't', positions: [0x0E40, 0x4C40, 0x4E00, 0x4640], asset: 'block_red' },
  { type: 'z', positions: [0x0C60, 0x2640, 0x0C60, 0x2640], asset: 'block_yellow' }
];

export const KEY_MAP = {
  37: 'moveLeft',
  38: 'rotate',
  39: 'moveRight',
  40: 'moveDown'
};