import PIXI from './pixi';

console.log('start', PIXI)


const renderer = PIXI.CanvasRenderer(512, 512);
const stage = new PIXI.Container();

renderer.autoResize = true;
document.body.appendChild(renderer.view);


renderer.render(stage);