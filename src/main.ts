import { Graphics } from './graphics.js'
import { Grid } from './grid.js';

let oldTimeStamp: DOMHighResTimeStamp = 0
let grid: Grid = new Grid(100, 50);

function init(): void {
	updateSize()
	requestAnimationFrame(animationFrame)
}

function animationFrame(timeStamp: DOMHighResTimeStamp): void {
	requestAnimationFrame(animationFrame)
	update(timeStamp)

	Graphics.clear()
	grid.render()
}

function update(timeStamp: DOMHighResTimeStamp): void {
	const timeDelta = oldTimeStamp == 0 ? 0 : (timeStamp - oldTimeStamp) / 1000
	oldTimeStamp = timeStamp
}

function updateSize(): void {
	const width: number = Math.trunc(window.visualViewport?.width || window.innerWidth)
	const height: number = Math.trunc(window.visualViewport?.height || window.innerHeight)

	if (width === 0 || height === 0) return

	console.log(`New canvas size: ${width}x${height}`)

	Graphics.canvas.width = width
	Graphics.canvas.height = height

	grid.resize();
}

document.addEventListener('DOMContentLoaded', init)
window.addEventListener('resize', updateSize)
