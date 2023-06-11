import { Graphics } from './graphics.js'
import { Grid } from './grid.js';

let grid: Grid = new Grid(100, 50);

function init(): void {
	grid.randomize()
	updateSize()
	requestAnimationFrame(animationFrame)
}

function animationFrame(_timeStamp: DOMHighResTimeStamp): void {
	requestAnimationFrame(animationFrame)

	Graphics.clear()
	grid.render()
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
