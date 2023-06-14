import { UI } from "./ui.js";
export var Graphics;
(function (Graphics) {
    Graphics.canvas = document.getElementById('canvas');
    Graphics.canvasContainer = document.getElementById('canvas-container');
    Graphics.ctx = Graphics.canvas.getContext('2d', { alpha: false, willReadFrequently: false });
    function clear() {
        Graphics.ctx.fillStyle = '#fff';
        Graphics.ctx.fillRect(0, 0, Graphics.canvas.clientWidth, Graphics.canvas.clientHeight);
    }
    Graphics.clear = clear;
    function updateSize() {
        const size = Math.min(document.body.clientWidth, document.body.clientHeight - UI.containerHeight);
        Graphics.canvasContainer.style.width = Graphics.canvas.style.height = `${size}px`;
        Graphics.canvas.width = Graphics.canvas.height = size;
    }
    Graphics.updateSize = updateSize;
    function getRect() {
        return {
            left: Graphics.canvas.offsetLeft + Graphics.canvas.clientLeft,
            top: Graphics.canvas.offsetTop + Graphics.canvas.clientTop,
            width: Graphics.canvas.width,
            height: Graphics.canvas.height
        };
    }
    Graphics.getRect = getRect;
})(Graphics || (Graphics = {}));
