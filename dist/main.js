import { Graphics } from './graphics.js';
import { Grid } from './grid.js';
import { UI } from './ui.js';
export var Main;
(function (Main) {
    Main.grid = new Grid(100, 100);
    function animationFrame(_timeStamp) {
        requestAnimationFrame(animationFrame);
        Graphics.clear();
        Main.grid.render();
    }
    function updateSize() {
        Graphics.updateSize();
        Main.grid.updateSize();
    }
    window.addEventListener('resize', updateSize);
    UI.init();
    Main.grid.randomize();
    updateSize();
    requestAnimationFrame(animationFrame);
})(Main || (Main = {}));
