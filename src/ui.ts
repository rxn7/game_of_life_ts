import { Main } from "./main.js"
import { State } from "./state.js"

export namespace UI {
	export const containerHeight: number = 100
	const container: HTMLDivElement = document.getElementById('ui-container') as HTMLDivElement
	const pauseButton: HTMLButtonElement = document.getElementById('pause-btn') as HTMLButtonElement
	const stepIntervalInput: HTMLInputElement = document.getElementById('step-interval-input') as HTMLInputElement

	export function init() {
		console.log('init')

		container.style.height = `${containerHeight}px`;

		Main.grid.stepInterval = stepIntervalInput.valueAsNumber

		stepIntervalInput.addEventListener('change', () => {
			Main.grid.stepInterval = stepIntervalInput.valueAsNumber
		})

		pauseButton.addEventListener('click', () => {
			console.log('test')
			State.paused = !State.paused
			pauseButton.textContent = State.paused ? "Unpause" : "Pause"
		})
	}
}
