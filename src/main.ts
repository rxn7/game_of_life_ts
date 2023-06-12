import { Graphics } from './graphics.js'
import { Grid } from './grid.js'
import { UI } from './ui.js'

export namespace Main {
	export let grid: Grid = new Grid(100, 100)

	function animationFrame(_timeStamp: DOMHighResTimeStamp): void {
		requestAnimationFrame(animationFrame)

		Graphics.clear()
		grid.render()
	}

	function updateSize(): void {
		Graphics.updateSize()
		grid.updateSize()
	}

	window.addEventListener('resize', updateSize)
	UI.init()
	grid.randomize()
	updateSize()
	requestAnimationFrame(animationFrame)
}
